const request = require('request');

const config = require('../../config');

const getUserInfo = function getUserInfo(user) {
  return new Promise((resolve, reject) => {
    if (!user.login) {
      reject(new Error('no username provided'));
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

module.exports = {
  getUserInfo,
};
