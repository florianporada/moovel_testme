// check if res body contains the message
const isExceeded = function isExceeded(res) {
  return res.message && res.message.includes('API rate limit exceeded');
};

// sorts usernames alphabetical. { login. 'foo' } must be provided
const compareUsernames = function compareUsernames(a, b) {
  const nameA = a.login.toUpperCase(); // ignore upper and lowercase
  const nameB = b.login.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};


module.exports = {
  compareUsernames,
  isExceeded,
};
