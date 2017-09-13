const express = require('express');
const winston = require('winston');
const path = require('path');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  winston.log('info', '%s %s %s', req.method, req.url, req.path);
  next();
});

// get client files
router.use(express.static(path.join(__dirname, '..', '..', '..', '/public')));

module.exports = router;
