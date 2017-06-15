import Constants from './constants';
export default function fetchFromServer (url, method = "GET", data = {}) {
  return new Promise(resolve => {
    let body = JSON.stringify(data);
    if (method === "GET" || method === "DELETE") {
      body = undefined;
    }
    fetch(url, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    })
      .then(r => {
        let result = false;
        result = Constants.checkResponse(r);
        if (result) {
          return r.json();
        }
      })
      .then(resolve);
  });
}
