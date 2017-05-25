import React from 'react';
import Constants from '../constants';

export default class File extends React.Component {
  constructor (props) {
    super(props); ;
  }

  showFileDetails () {
    let event = new CustomEvent(Constants.Events.showFileDetails, {detail: this.props.content});
    document.dispatchEvent(event);
  }

  render () {
    return (
      <div className="file-item" onClick={this.showFileDetails.bind(this)}>
        <span>{this.props.content.name}</span>
      </div>
    );
  }
}
