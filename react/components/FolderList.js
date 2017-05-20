import React from "react";

import FolderListItem from './FolderListItem';
import * as Constants from '../constants';

export default class FolderList extends React.Component {
  constructor (props) {
    super(props);

    this.folderContents = props.folderContents;
    this.pathObj = props.pathObj;
  }

  goBack (e) {
    let base = this.props.pathObj.base;
    let lastIndex = base.lastIndexOf('/');
    base = base.slice(lastIndex);
    fetch(`${Constants.BASE_URL}/api/directory/?${encodeURIComponent(base)}`)
    .then(response => {
      console.log(response);
    });
  }

  render () {
    let folderContents = this.folderContents;
    return (
      <div className="folderList">
        <ul>
          <li onclick={goBack.bind(this)}>Back</li>
        {
          folderContents.map(function (content, index) {
            return <li><FolderListItem key={index} item={content} /></li>
          })
        }
        </ul>
      </div>
    )
  }
}
