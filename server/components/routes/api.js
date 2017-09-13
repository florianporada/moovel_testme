const express = require('express');
const winston = require('winston');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  winston.log('Time: ', Date.now());
  next();
});

// get users from github api
router.get('/github/users/', (req, res) => {
  res.send({ users: ['here', 'could', 'be', 'a', 'user'] });
});

module.exports = router;
