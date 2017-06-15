import React from 'react';
import Constants from '../constants';

export default class PasswordDialog extends React.Component {
  componentDidMount () {
    document.getElementById('loginPassword').addEventListener('focus', function () {
      this.classList.remove('error-input');
    });
  }

  tryAuthentication (e) {
    e.preventDefault();
    let inputBox = document.getElementById('loginPassword');
    fetch(`${Constants.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({password: inputBox.value})
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          let d = new Date();
          d.setTime(d.getTime() + (20 * 60 * 1000));
          document.cookie = "userSessionStatus=loggedIn;expires=" + d.toUTCString(); +";path=/";
          window.location.reload();
        } else {
          inputBox.blur();
          inputBox.classList.add('error-input');
        }
      });
  }

  render () {
    return (
      <div className='passwordDialog'>
        <form>
          <center><h4 htmlFor="password">Enter Password to continue</h4></center>
          <input type="password" placeholder="password" id="loginPassword" />
          <br />
          <input type="submit" id="loginButton" onClick={this.tryAuthentication} value="Login" />
        </form>
      </div>
    )
  }
}
