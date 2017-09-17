const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const www = require('./routes/www');

const app = express();
const port = process.env.PORT || 8080;

const Webservice = function Webservice() {
  winston.log('info', 'webservice initialized');
};

// start webservice on function
Webservice.prototype.start = function start() {
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', www);
  app.use('/api', api);

  app.listen(port, () => {
    winston.log('info', `webstuff listening on ${port}`);
  });
};

module.exports = Webservice;
