const express = require('express');
const winston = require('winston');
const path = require('path');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  winston.log('Time: ', Date.now());
  next();
});

// get react files
router.get('/', express.static(path.join(__dirname, '..', '..', '/public')));

module.exports = router;
