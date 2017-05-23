import React from "react";

import FolderListItem from './FolderListItem';
import Constants from '../constants';

export default class FolderList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {folderContents: [], pathObj: {}};
    this.state.pathObj.getCurrentFolderName = (path) => {
      if (this.state.pathObj.base) {
        return this.state.pathObj.base.slice(this.state.pathObj.base.lastIndexOf('/') + 1);
      }
      return "";
    };
    this.state.pathObj.parent = () => {
      // console.log("Parent");
      // console.log(this.state.pathObj.base);
      if (this.state.pathObj.base) {
        // console.log(this.state.pathObj.base.slice(0, this.state.pathObj.base.lastIndexOf('/')));
        return this.state.pathObj.base.slice(0, this.state.pathObj.base.lastIndexOf('/'));
      }
      return "";
    };
  }

  componentDidMount () {
    this.state.pathObj.base = '/home/jibin/Documents';
    this.fetchFromDirectory();
  }

  componentWillReceiveProps () {
    // console.log("component will recieve props");
    // console.log(this.props);
    if (!this.props.pathObj) {
      this.state.pathObj.base = '/home/jibin/Documents';
    }
    this.state.pathObj.getCurrentFolderName = () => {
      if (this.state.pathObj.base) {
        return this.state.pathObj.base.slice(this.state.pathObj.base.lastIndexOf('/') + 1);
      }
      return "";
    };
    this.fetchFromDirectory();
  }

  goBack (e) {
    let base = this.state.pathObj.base || '/';
    let lastIndex = base.lastIndexOf('/');
    if (base.indexOf('/') === base.lastIndexOf('/')) {
      return;
    }
    this.state.pathObj.base = base.slice(0, lastIndex);
    this.fetchFromDirectory();
  }

  moveToDirectory (targetFolder) {
    this.state.pathObj.base = `${this.state.pathObj.parent()}/${targetFolder}`;
    this.fetchFromDirectory();
  }

  fetchFromDirectory (directoryPath, preventUpdate) {
    // console.log("fetch: " + (directoryPath || this.state.pathObj.base));
    fetch(`${Constants.BASE_URL}/directory?base=${encodeURIComponent(directoryPath || this.state.pathObj.base)}`)
    .then(response => {
      return response.json();
    })
    .then(contents => {
      if (!preventUpdate) {
        let event = new CustomEvent(Constants.Events.directoryChange, {detail: {'contents': contents.content, 'pathObj': this.state.pathObj}});
        document.dispatchEvent(event);
        this.fetchFromDirectory(this.state.pathObj.base.slice(0, this.state.pathObj.base.lastIndexOf('/')), true);
      } else {
        this.setState({folderContents: contents.content});
      }
    });
  }

  render () {
    // console.log("Render");
    // console.log(this.state.pathObj);
    let folderContents = this.state.folderContents;
    return (
      <div className="folderList">
        <span className="current-directory-name">{this.state.pathObj.parent().getCurrentFolderName()}</span><br />
        <span className="current-path">{this.state.pathObj.parent()}</span>
        <span onClick={this.goBack.bind(this)} className="cursor back-button back_button" href="" id="back-button"><i className="material-icons" role="presentation">keyboard_backspace</i>&nbsp;&nbsp;&nbsp;Back</span>
        {/* <li onClick={this.goBack.bind(this)} className="folder-list-back-button">Back</li> */}
        <ul id="nav-folder-list">
        {
          folderContents.filter((content) => {
            if (document.hiddenVisible) {
              return true;
            } else {
              return content.name[0] !== '.';
            }
          }).map((content, index) => {
            if (!content.isFile) {
              return <li key={index} onClick={this.moveToDirectory.bind(this, content.name)} className="cursor folder-list-item" ><FolderListItem item={content} /></li>
            } else {
              { /* return <li key={index}><FolderListItem item={content} /></li> */ }
              return null;
            }
          })
        }
        </ul>
      </div>
    )
  }
}
