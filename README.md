# the task from moovel.

in order to know if my code is good enough, moovel dev team gave me the task to get data from __GitHub__ via a (__nodejs__) backend and publishes it to an frontend which will be implemented via __react native__.

hi *moovel*.

By using `npm install && npm start` the backend service will be started.

Alternatively you can use `docker build .` to create a docker container and run it.

Rename `config.sample.js` to `config.js` and fill in your credentials from GitHub. Otherwise you are limited to 60 api calls.

With `http://localhost:8080/api/` you can get an overview over the api endpoints.
The developed API makes by default 10 calls to the GitHub API to fetch the details for each user individually.
The standard GitHub API call (e.g. `https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000`) doesn't give you properties like `created_at`, `email` or `blog`.

Therefore I implemented a function that calls the `https://api.github.com/users/` for every user and sends it combined to the client.

`http://localhost:8080/` provides a very basic frontend to test the API in the browser.
