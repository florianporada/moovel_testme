import { logger } from 'react-native-logger'

import setting from '../config/settings';

const ApiService = {
  getMoovelMembers: function() {
    return fetch(`${setting.API_ENDPOINT}github/users/moovel`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        logger.log('error', error);
        return error;
      });
    },
  getJavaDevelopers: function(limit = 10) {
    return fetch(`${setting.API_ENDPOINT}github/users/java?limit=${limit}`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        logger.log('error', error);
        return error;
      });
    },
}

export default ApiService;
