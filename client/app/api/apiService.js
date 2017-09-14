import { logger } from 'react-native-logger'

import setting from '../config/settings';

const ApiService = {
  getUsers: function() {
    return fetch(`${setting.API_ENDPOINT}github/users`)
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
