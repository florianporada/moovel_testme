const request = new XMLHttpRequest();

request.open('GET', '/api/github/users/');
request.addEventListener('load', (event) => {
  if (request.status >= 200 && request.status < 300) {
    console.log(event);
    document.getElementById('code').innerHTML = request.responseText;
  } else {
    console.warn(request.statusText, request.responseText);
  }
});
request.send();
