import React from 'react';
import Constants from '../constants';

export default class Folder extends React.Component {
  constructor (props) {
    super(props); ;

    this.doubleClickDelay = 250;
    this.clickedOnce = false;
    this.timer = undefined;
  }

  doubleClick (obj) {
    obj.clickedOnce = false;
    obj.props.onClick();
    clearTimeout(this.timer);
  }

  showDetails () {
    let event = new CustomEvent(Constants.Events.showFolderDetails, {detail: this.props.content});
    document.dispatchEvent(event);
  }

  selectClick (id) {
    if (this.clickedOnce) {
      return this.doubleClick(this);
    }
    let allitems = document.querySelectorAll('.item');
    for (let item of allitems) {
      item.classList.remove('item-active');
    }
    if (!document.querySelector('#folder-item-' + id).classList.contains('item-active')) { document.querySelector('#folder-item-' + id).classList.add('item-active'); }

    // console.log("Single click");
    this.clickedOnce = true;
    this.showDetails.call(this);

    this.timer = setTimeout(() => {
      this.clickedOnce = false;
    }, this.doubleClickDelay);
  }

  render () {
    return (
      <div className="directory-item item" onClick={this.selectClick.bind(this, this.props.id)} style={{lineHeight: '20px'}} id={`folder-item-${this.props.id}`}>
        <i className="material-icons">folder</i><span>{this.props.content.name}</span>
      </div>
    );
  }
}
