const express = require('express');
const winston = require('winston');
const request = require('request');

const router = express.Router();

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
      { '/github/users/': 'GET. gives you back members from moovel org' },
    ],
  });
});

// get users from github api
router.get('/github/users/', (req, res) => {
  const options = {
    url: 'https://api.github.com/orgs/moovel/members',
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

module.exports = router;
