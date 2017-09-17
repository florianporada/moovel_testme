const request = new XMLHttpRequest();

const callApi = function callApi(endpoint) {
  request.open('GET', endpoint);
  request.addEventListener('load', (event) => {
    if (request.status >= 200 && request.status < 300) {
      console.log(event);
      document.getElementById('code').innerHTML = request.responseText;
    } else {
      console.warn(request.statusText, request.responseText);
    }
  });
  request.send();
}

window.onload = function () {
  document.getElementById('b1').onclick = function onclick() { callApi('/api'); };
  document.getElementById('b2').onclick = function onclick() { callApi('/api/github/rate_limit'); };
  document.getElementById('b3').onclick = function onclick() { callApi('/api/github/users/java'); };
  document.getElementById('b4').onclick = function onclick() { callApi('/api/github/users/moovel'); };
};
