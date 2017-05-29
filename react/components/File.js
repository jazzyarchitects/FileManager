import React from 'react';
import Constants from '../constants';

export default class File extends React.Component {
  constructor (props) {
    super(props); ;
  }

  showFileDetails (id) {
    let allitems = document.querySelectorAll('.item');
    for (let item of allitems) {
      item.classList.remove('item-active');
    }
    document.querySelector('#file-item-' + id).classList.add('item-active');
    let event = new CustomEvent(Constants.Events.showFileDetails, {detail: this.props.content});
    document.dispatchEvent(event);
  }

  render () {
    return (
      <div className="file-item item" onClick={this.showFileDetails.bind(this, this.props.id)} id={`file-item-${this.props.id}`}>
        <span>{this.props.content.name}</span>
      </div>
    );
  }
}
