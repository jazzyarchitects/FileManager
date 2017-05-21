import React from "react";

import FolderListItem from './FolderListItem';
import Constants from '../constants';

export default class FolderList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {folderContents: [], pathObj: {}};
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
      // console.log(contents);
      this.setState({folderContents: contents.content});
    });
  }

  render () {
    // console.log("Render");
    // console.log(this.state);
    let folderContents = this.state.folderContents;
    return (
      <div className="folderList">
        <ul>
          <li onClick={this.goBack.bind(this)} className="folder-list-back-button">Back</li>
        {
          folderContents.map((content, index) => {
            if (!content.isFile) {
              return <li key={index} onClick={this.moveToDirectory.bind(this, content.name)} ><FolderListItem item={content} /></li>
            } else {
              return <li key={index}><FolderListItem item={content} /></li>
            }
          })
        }
        </ul>
      </div>
    )
  }
}
