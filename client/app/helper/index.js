import dateformat from 'dateformat';
import numberAbbreviate from 'number-abbreviate'
import { Alert } from 'react-native';

const Helper = {
  // format date to 'yyyy-mm-dd'
  formatDate: function(date) {
    return dateformat(date, 'yyyy-mm-dd');
  },

  // format number to make it shorter 1000 >> 1k
  formatNumber: function(value) {
    return numberAbbreviate(value, 0);
  },

  // check if property is empthy
  isEmpty: function(value) {
    if (value === null) {
      return true;
    }

    if (value === undefined) {
      return true;
    }

    if (value.length <= 0) {
      return true;
    }

    return false;
  },

  // alert for missing information like mail address, blog etc....
  infoAlert: function() {
    Alert.alert(
      'Info',
      'no information available',
      [{ text: 'OK' }],
      { cancelable: false }
    )
  }
}

export default Helper;
