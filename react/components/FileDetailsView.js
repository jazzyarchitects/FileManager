import React from 'react';

import Constants from '../constants';

export default class FileDetailsView extends React.Component {
  openFile () {
    let win = window.open(`${Constants.BASE_URL}/file/raw/${this.props.content.name}?path=${this.props.content.path}`)
    win.focus();
  }

  render () {
    return (
      <div className='file-details-container'>
        <button className='open-file-button detail' onClick={this.openFile.bind(this)}>Open File</button>
      </div>
    )
  }
}
