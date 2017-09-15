const express = require('express');
const winston = require('winston');
const request = require('request');

const router = express.Router();
const config = require('../../config');
const { getUserInfo } = require('../helper');

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
  const options = {
    url: `${config.GITHUB_API}/rate_limit`,
    headers: {
      'User-Agent': 'request',
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      winston.log('error', 'error while getting github users', err);
    }

    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

// get moovel memebers from github api
router.get('/github/users/moovel/', (req, res) => {
  const options = {
    url: `${config.GITHUB_API}/orgs/moovel/members`,
    headers: {
      'User-Agent': 'request',
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      winston.log('error', 'error while getting github users', err);
    }

    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

// get java coders from github api
router.get('/github/users/java/', (req, res) => {
  const limit = (req.query.limit) ? req.query.limit : 10;
  const options = {
    url: `${config.GITHUB_API}/search/users?q=language%3Ajavascript&type=Users&sort=login&order=asc`,
    headers: {
      'User-Agent': 'request',
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      winston.log('error', 'error while getting github users', err);
    }

    const parsedBody = JSON.parse(body);
    const items = parsedBody.items.slice(0, limit);
    const promiseArray = [];

    for (let i = 0; i < items.length; i += 1) {
      promiseArray.push(getUserInfo(items[i]));
    }

    winston.log('info', promiseArray);

    Promise.all(promiseArray).then((responseArray) => {
      res.set('Content-Type', 'application/json');
      res.send(responseArray);
    });
  });
});

module.exports = router;
