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

  selectClick () {
    if (this.clickedOnce) {
      return this.doubleClick(this);
    }
    // console.log("Single click");
    this.clickedOnce = true;
    this.showDetails.call(this);

    this.timer = setTimeout(() => {
      this.clickedOnce = false;
    }, this.doubleClickDelay);
  }

  render () {
    return (
      <div className="directory-item" onClick={this.selectClick.bind(this)} style={{lineHeight: '20px'}}>
        <i className="material-icons">folder</i><span>{this.props.content.name}</span>
      </div>
    );
  }
}
