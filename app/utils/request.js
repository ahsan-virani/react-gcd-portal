import 'whatwg-fetch';

function parseJSON(response) {
  console.log('parseJSON response: ', response);
  return response.json();
}

function checkStatus(response) {
  console.log('response: ', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  console.log('request: ', url, options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
