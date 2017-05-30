import React from 'react';
import Constants from '../constants';

export default class PasswordDialog extends React.Component {
  tryAuthentication () {
    fetch(`${Constants.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({password: document.getElementById('loginPassword').value})
    })
    .then(r => r.json())
    .then(result => {
      console.log(result);
      if (result.success) {
        let d = new Date();
        d.setTime(d.getTime() + (20 * 60 * 1000));
        document.cookie = "userSessionStatus=loggedIn;expires=" + d.toUTCString(); +";path=/";
        window.location.reload();
      }
    });
  }

  render () {
    return (
      <div className='passwordDialog'>
        <center><h4 htmlFor="password">Enter Password to continue</h4></center>
        <input type="password" placeholder="password" id="loginPassword" />
        <br />
        <button id="loginButton" onClick={this.tryAuthentication}>Login</button>
      </div>
    )
  }
}
