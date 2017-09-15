const request = require('request');

const config = require('../../config');

const getUserInfo = function getUserInfo(user) {
  return new Promise((resolve, reject) => {
    if (!user.login) {
      reject(new Error('no username provided. { login: "foo"} is missing'));
    }

    const options = {
      url: `${config.GITHUB_API}/users/${user.login}`,
      headers: {
        'User-Agent': 'request',
      },
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(new Error('error while getting user details', err));
      }

      const parsedBody = JSON.parse(body);

      resolve(parsedBody);
    });
  });
};

const isExceeded = function isExceeded(message) {
  return message.contains('API rate limit exceeded');
};

module.exports = {
  getUserInfo,
  isExceeded,
};
