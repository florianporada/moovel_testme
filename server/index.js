const winston = require('winston');
const Webservice = require('./components/webservice');

const webservice = new Webservice();

webservice.start();

winston.log('info', 'hello moovel.');
