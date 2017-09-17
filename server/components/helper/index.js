const request = require('request');

const config = require('../../config');

// check if res body contains the message
const isExceeded = function isExceeded(res) {
  return res.message && res.message.includes('API rate limit exceeded');
};

// get detailed information about the user because github API doesn't provide all infos at once.
const getUserInfo = function getUserInfo(user) {
  return new Promise((resolve, reject) => {
    if (!user.login) {
      reject(new Error('no username provided. { login: "foo" } is missing'));
    }

    // TODO: add authentication for more api calls
    const options = {
      url: `${config.GITHUB_API}/users/${user.login}`,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(new Error('error while getting user details', err));
      }

      const parsedBody = JSON.parse(body);

      // check if rate limit is exceeded and handle error if so
      if (isExceeded(parsedBody)) {
        reject(new Error('rate limit exceeded'));
      }

      resolve(parsedBody);
    });
  });
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
  getUserInfo,
  compareUsernames,
};
