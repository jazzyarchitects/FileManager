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
      <div className="directory-item" onClick={this.showFileDetails.bind(this)}>
        {this.props.content.name}
      </div>
    );
  }
}
