import React from 'react';

import Encrypter from '../../compiled/modules/utils/crypto';
import FetchFromServer from '../FetchFromServer';
import Constants from '../constants';

export default class ShareModal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    this.setState(this.props);
    let passwordField = document.getElementById("sharePassword");
    passwordField.addEventListener('focus', () => {
      passwordField.classList.remove('error-input');
    });
    document.querySelector('.modal-backdrop').addEventListener('click', (e) => {
      this.closePopup();
    });
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.closePopup();
      }
    })
  }

  checkboxChangeHandler (e) {
    document.getElementById("sharePassword").disabled = e.target.checked;
  }

  generateURL () {
    let passwordField = document.getElementById("sharePassword");
    if (passwordField.disabled) {
      this.generateShareURL("no-password");
    } else {
      if (passwordField.value) { this.generateShareURL(passwordField.value); } else { passwordField.classList.add('error-input'); }
    }
  }

  generateShareURL (password) {
    console.log("Generating for password:" + password);
    let toSharePath = this.props.content.path;
    password = password || Constants.getRandomString();
    FetchFromServer(`${Constants.BASE_URL}/share/url`, "POST", {
      data: Buffer.from(JSON.stringify({
        filePath: toSharePath,
        password: password
      })).toString('base64')
    })
      .then(result => {
        this.setState({password: password, url: `${Constants.BASE_URL}/share/file/${this.props.content.name}?p=` + result.link})
      });
  }

  copyToClipboard (string) {
    let newElement = document.createElement('input');
    document.body.appendChild(newElement);
    newElement.type = 'text';
    newElement.value = this.state.url;
    newElement.select();
    document.execCommand('copy');
    document.body.removeChild(newElement);
  }

  closePopup () {
    let event = new Event(Constants.Events.closePopup);
    document.dispatchEvent(event);
  }

  render () {
    let url = "Generated URL";
    if (this.state && this.state.url) {
      url = this.state.url;
    }

    return (
      <div className='modal share-modal'>
        <div className='modal-backdrop'></div>
        <div className='modal-body'>
          <div className="modal-heading">
            Share file
          </div>
          <hr />
          <div className="modal-content">
            <span className="modal-content-filename">{this.props.content.name}</span>
            <div className="modal-content-form">
              <label htmlFor="password">Password lock the access</label>
              <span>
                <input type="password" name="password" id="sharePassword" placeholder="Password to access the file" disabled></input>
                <input type="checkbox" id="checkbox-disable-password" onChange={this.checkboxChangeHandler} defaultChecked></input><label htmlFor="checkbox-disable-password" >Disable password</label>
                <div className="btn generate-button" onClick={this.generateURL.bind(this)}>Generate URL</div>
              </span>
            </div>
            <div className="url-display">{url}</div>
            <div className="password-display"><b>Password:</b> {this.state.password}</div>
            <div className="btns">
              <div className="done-button btn" onClick={this.closePopup}>Done</div>
              <div className="copy-button btn" onClick={this.copyToClipboard.bind(this)}>Copy link</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
