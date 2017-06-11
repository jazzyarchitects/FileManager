import React from 'react';

import Constants from './constants';

export default class ShareFilePassword extends React.Component {
  requestAuthentication () {
    let inputBox = document.getElementById('loginPassword');
    fetch(`${Constants.BASE_URL}/share/file/${this.props.filename}?p=${this.props.BASE_URL}`, {
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
    console.log(this.props);
  }

  render () {
    return (
      <div className='passwordDialog'>
        <form>
          <center><h4 htmlFor="password">Enter Password to continue</h4></center>
          <input type="password" placeholder="password" id="loginPassword" />
          <br />
          <input type="submit" id="loginButton" onClick={this.requestAuthentication.bind(this)} value="Open" />
        </form>
      </div>
    )
  }
};
