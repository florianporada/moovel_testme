const winston = require('winston');
const Webservice = require('./components/webservice');

// create instance of the webservice
const webservice = new Webservice();

// start the webservice
webservice.start();

winston.log('info', 'hello moovel.');
