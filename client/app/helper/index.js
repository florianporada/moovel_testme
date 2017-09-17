import dateformat from 'dateformat';
import numberAbbreviate from 'number-abbreviate'
import { Alert } from 'react-native';

const Helper = {
  formatDate: function(date) {
    return dateformat(date, "yyyy-mm-dd");
  },
  formatNumber: function(value) {
    return numberAbbreviate(value, 0);
  },
  isEmpty: function(value) {
    if (value === null) {
      return true;
    }

    if (value === undefined) {
      return true;
    }

    return false;
  },
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
