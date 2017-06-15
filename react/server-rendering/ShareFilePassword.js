let isNode = typeof module !== 'undefined' && module.exports;
let React = isNode ? require('react') : window.React;
let ReactDOM = isNode ? require('react') : window.ReactDOM;


import React from 'react';

import Constants from './constants';

class ShareFilePassword extends React.Component {
  requestAuthentication () {
    let inputBox = document.getElementById('loginPassword');
    console.log(inputBox);
    console.log(inputBox.value);
    fetch(`${Constants.BASE_URL}/share/file/${window.__APP_INITIAL_STATE.filename}?p=${window.__APP_INITIAL_STATE.BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({password: inputBox.value})
    })
      .then(r => r.json())
      .then(result => {
        if (result.success === false) {
          inputBox.blur();
          inputBox.classList.add('error-input');
        }
      });
  }

  componentDidMount () {
    document.getElementById('loginPassword').addEventListener('focus', function () {
      this.classList.remove('error-input');
    });
  }

  render () {
    return (
      <div className='passwordDialog'>
        <center><h4 htmlFor="password">Enter Password to continue</h4></center>
        <input type="password" placeholder="password" id="loginPassword" />
        <br />
        <button id="loginButton" onClick={this.requestAuthentication.bind(this)}>Open</button>
      </div>
    )
  }
};

if (isNode) {
  export default ShareFilePassword;
} else {
  ReactDOM.render(<ShareFilePassword name="John" />, document.getElementById('react-root'))
}