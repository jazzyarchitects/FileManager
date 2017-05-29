import React from 'react';
import Constants from '../constants';

export default class File extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.view = document.querySelector(`#file-item-${this.props.id}`);
    this.view.addEventListener('contextmenu', (e) => {
      Constants.resetActiveElement();
      this.view.classList.add('item-active');
      let event = new CustomEvent(Constants.Events.setCurrentContextMenuParent, {detail: {content: this.props.content, id: this.props.id, view: this.view}});
      document.dispatchEvent(event);

      let fileDetailsEvent = new CustomEvent(Constants.Events.showFileDetails, {detail: this.props.content});
      document.dispatchEvent(fileDetailsEvent);
    });
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
