import React from "react";

import FolderListItem from './FolderListItem';
import Constants from '../constants';

export default class FolderList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {folderContents: [], pathObj: {}};
    this.state.pathObj.getCurrentFolderName = () => {
      if (this.state.pathObj.base) {
        return this.state.pathObj.base.slice(this.state.pathObj.base.lastIndexOf('/') + 1);
      }
      return "";
    };
  }

  componentDidMount () {
    this.state.pathObj.base = '/home/jibin/Documents/NodeJS/FileManager';
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
    this.state.pathObj.base = `${this.state.pathObj.base}/${targetFolder}`;
    this.fetchFromDirectory();
  }

  fetchFromDirectory (directoryPath) {
    // console.log(this.state.pathObj.base);
    fetch(`${Constants.BASE_URL}/directory?base=${encodeURIComponent(this.state.pathObj.base)}`)
    .then(response => {
      return response.json();
    })
    .then(contents => {
      let event = new CustomEvent(Constants.Events.directoryChange, {detail: {'contents': contents.content, 'pathObj': this.state.pathObj}});
      document.dispatchEvent(event);
      this.setState({folderContents: contents.content});
    });
  }

  render () {
    // console.log("Render");
    // console.log(this.state);
    let folderContents = this.state.folderContents;
    return (
      <div className="folderList">
        <span className="current-directory-name">{this.state.pathObj.getCurrentFolderName()}</span><br />
        <span className="current-path">{this.state.pathObj.base}</span>
        <span onClick={this.goBack.bind(this)} className="cursor mdl-navigation__link back-button" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">keyboard_backspace</i>Back</span>
        {/* <li onClick={this.goBack.bind(this)} className="folder-list-back-button">Back</li> */}
        <ul>
        {
          folderContents.map((content, index) => {
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
