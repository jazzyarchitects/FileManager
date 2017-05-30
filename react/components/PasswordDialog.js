import React from 'react';

export default class PasswordDialog extends React.Component {
  render () {
    return (
      <div className='passwordDialog'>
        <center><h4 htmlFor="password">Enter Password to continue</h4></center>
        <input type="password" placeholder="password" id="loginPassword" />
        <br />
        <button id="loginButton">Login</button>
      </div>
    )
  }
}
