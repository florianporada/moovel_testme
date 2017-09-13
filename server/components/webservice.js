const winston = require('winston');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
// const www = require('./routes/www');

const app = express();
const port = process.env.PORT || 8080;

const Webservice = function Webservice() {
  winston.log('info', 'api initialized');
};

Webservice.prototype.start = function start() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/api', api);
  app.use('/', express.static(path.join(__dirname, '..', '..', '/public')));

  app.listen(port, () => {
    winston.log('info', `webstuff listening on ${port}`);
  });
};

module.exports = Webservice;
