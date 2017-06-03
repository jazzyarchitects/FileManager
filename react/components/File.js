import React from 'react';
import Constants from '../constants';

export default class File extends React.Component {
  constructor (props) {
    super(props);

    this.doubleClickDelay = Constants.doubleClickDelay;
    this.clickedOnce = false;
    this.timer = undefined;
  }

  componentDidMount () {
    this.view = document.querySelector(`#file-item-${this.props.id}`);
    this.view.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      Constants.resetActiveElement();
      this.view.classList.add('item-active');
      let event = new CustomEvent(Constants.Events.setCurrentContextMenuParent, {detail: {content: this.props.content, id: this.props.id, view: this.view, event: e}});
      document.dispatchEvent(event);

      let fileDetailsEvent = new CustomEvent(Constants.Events.showFileDetails, {detail: this.props.content});
      document.dispatchEvent(fileDetailsEvent);
    }, false);
  }

  selectClick (id) {
    if (this.clickedOnce) {
      return this.doubleClick(id);
    }
    Constants.resetActiveElement();
    if (!document.querySelector('#file-item-' + id).classList.contains('item-active')) {
      document.querySelector('#file-item-' + id).classList.add('item-active');
    }

    this.showFileDetails();
    // console.log("Single click");
    this.clickedOnce = true;
    this.showFileDetails();

    this.timer = setTimeout(() => {
      this.clickedOnce = false;
    }, this.doubleClickDelay);
  }

  doubleClick (id) {
    Constants.openFile(this.props.content.path);
  }

  showFileDetails (id) {
    let event = new CustomEvent(Constants.Events.showFileDetails, {detail: this.props.content});
    document.dispatchEvent(event);
  }

  render () {
    return (
      <div className="file-item item" onClick={this.selectClick.bind(this, this.props.id)} id={`file-item-${this.props.id}`}>
        <span>{this.props.content.name}</span>
      </div>
    );
  }
}
