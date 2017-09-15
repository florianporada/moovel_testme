import dateformat from 'dateformat';

const Helper = {
  formatDate: function(date) {
    return dateformat(date, "yyyy-mm-dd");
  }
}

export default Helper;
