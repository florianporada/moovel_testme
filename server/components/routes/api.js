const express = require('express');
const winston = require('winston');
const request = require('request');
const base64 = require('base-64');
const utf8 = require('utf8');


const router = express.Router();
const config = require('../../config');
const { getUserInfo, compareUsernames } = require('../helper');

const reqOptions = {
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
};

// check credentials and add them for authorization to the header
if (config.GITHUB_USERNAME) {
  const encoded = base64.encode(utf8.encode(`${config.GITHUB_USERNAME}:${config.GITHUB_PASSWORD}`));
  reqOptions.headers.Authorization = `Basic ${encoded}`;
}

// middleware that is specific to this router
router.use((req, res, next) => {
  winston.log('info', '%s %s %s', req.method, req.url, req.path);
  next();
});

// entrypoint for the api
router.get('/', (req, res) => {
  res.send({
    welcome: 'welcome to the wonderland',
    usage: [
      { '/': 'entrypoint' },
      { '/github/users/moovel/': 'GET. gives you back members from moovel org' },
      { '/github/users/java/': 'GET. gives you back java coders ordered by username. You can limit the amount with eg. "?limit=10"' },
    ],
  });
});

// get rate limit infos from github api
router.get('/github/rate_limit/', (req, res) => {
  reqOptions.url = `${config.GITHUB_API}/rate_limit`;

  request(reqOptions, (err, response, body) => {
    if (err) {
      winston.log('error', 'Error while fetching rate limits', err);
      res.status(500).send('Error while fetching rate limits');

      return;
    }

    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

// get moovel memebers from github api
router.get('/github/users/moovel/', (req, res) => {
  reqOptions.url = `${config.GITHUB_API}/orgs/moovel/members`;

  request(reqOptions, (err0, response, body) => {
    if (err0) {
      winston.log('error', 'Error while fetching moovel members', err0);
      res.status(500).send({ error: 'Error while fetching moovel members' });

      return;
    }

    // contruct object to match the getUserInfo functions criteria
    // either response is the desired array or a object with an error message
    // if it isn't an array create one.
    let parsedBody = JSON.parse(body);
    if (!Array.isArray(parsedBody)) {
      parsedBody = { items: [parsedBody] };
    } else {
      parsedBody = { items: parsedBody };
    }

    const promiseArray = [];

    // iterating through response to get user details from every user
    for (let i = 0; i < parsedBody.items.length; i += 1) {
      promiseArray.push(getUserInfo(parsedBody.items[i]));
    }

    // combining all promises and wait for resolve/reject before sending the response
    Promise.all(promiseArray).then((responseArray) => {
      // sort by login name
      responseArray.sort(compareUsernames);
      res.set('Content-Type', 'application/json');
      res.send(responseArray);
    }, (err1) => {
      winston.log('error', 'Error while fetching the user details', err1);
      res.status(500).send({ error: `Error while fetching the user details. ${err1}` });
    });
  });
});

// get java coders from github api
router.get('/github/users/java/', (req, res) => {
  const limit = (req.query.limit) ? req.query.limit : 10;
  reqOptions.url = `${config.GITHUB_API}/search/users?q=language%3Ajavascript&type=Users&sort=login&order=asc`;

  request(reqOptions, (err0, response, body) => {
    if (err0) {
      winston.log('error', 'Error while fetching the java developers', err0);
      res.status(500).send({ error: 'Error while fetching the java developers' });

      return;
    }

    // TODO: remove duplicate code block. see api endpoint gihtub/users/moovel.

    // contruct object to match the getUserInfo functions criteria
    const parsedBody = JSON.parse(body);
    const items = parsedBody.items.slice(0, limit);
    const promiseArray = [];

    // iterating through response to get user details from every user
    for (let i = 0; i < items.length; i += 1) {
      promiseArray.push(getUserInfo(items[i]));
    }

    // combining all promises and wait for resolve/reject before sending the response
    Promise.all(promiseArray).then((responseArray) => {
      // sort by login name
      responseArray.sort(compareUsernames);
      res.set('Content-Type', 'application/json');
      res.send(responseArray);
    }, (err1) => {
      winston.log('error', 'Error while fetching the user details', err1);
      res.status(500).send({ error: `Error while fetching the user details. ${err1}` });
    });
  });
});

module.exports = router;
