import { logger } from 'react-native-logger'

import setting from '../config/settings';

const _errorHandler = function _errorHandler(response) {
  if (response.status >= 200 && response.status < 300) {
    logger.log(response);
    return response.json();
  } else {
    throw Error('statuscode is bad')
  }
};

const ApiService = {
  getMoovelMembers: function() {
    return fetch(`${setting.API_ENDPOINT}github/users/moovel`)
      .then((response) => response.json())
      .then((responseJson) => {
        logger.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        logger.log('error while fetching moovel members', error);
        return error;
      });
  },
  getJavaDevelopers: function(limit = 10) {
    return fetch(`${setting.API_ENDPOINT}github/users/java?limit=${limit}`)
      .then(_errorHandler)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        logger.log('error while fetching java developers', error);
        return error;
      });
  },
};

export default ApiService;
