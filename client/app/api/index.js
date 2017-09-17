import { logger } from 'react-native-logger'

import setting from '../config/settings';

// check if the status code is ok. send error as response if not
const _errorHandler = function _errorHandler(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return JSON.parse(response._bodyText);
  }
};

const ApiService = {
  // get members of the moovel org from own github api
  getMoovelMembers: function() {
    return fetch(`${setting.API_ENDPOINT}github/users/moovel`)
    .then(_errorHandler)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        logger.log('error while fetching moovel members', error);
        return error;
      });
  },
  // get java developers from own github api. default limit 10 hits
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
  // get single profile directly from the official github api. default user is florianporada
  getSingleProfile: function(user = 'florianporada') {
    return fetch(`https://api.github.com/users/${user}`)
      .then(_errorHandler)
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        logger.log('error while fetching single profile (direct github api call)', error);
        return error;
      });
  }
};

export default ApiService;
