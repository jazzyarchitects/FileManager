import React from 'react';
import File from './File';
import Folder from './Folder'

import Constants from '../constants';

export default class FileList extends React.Component {
  constructor (props) {
    super(props);
  }

  openFolder (folderObj) {
    let event = new CustomEvent(Constants.Events.directoryChangeFromContents, {detail: {folderObj: folderObj, pathObj: this.props.pathObj}});
    document.dispatchEvent(event);
  }

  showFileDetails (fileObj) {

  }

  // componentDidMount () {
    // this.setState({contents: this.props.contents || [], pathObj: this.props.pathObj});
  // }

  render () {
    this.contents = this.props.contents || [];
    return (
      <div className="directory-list">
          <h2 className="section-heading"> Folders </h2>
        <div className="folder-section section">
          {
            this.contents.filter((content) => {
              if (document.hiddenVisible) {
                return true;
              } else {
                return content.name[0] !== '.';
              }
            }).map((content, index) => {
              if (!content.isFile) {
                return <Folder key={index} content={content} onClick={this.openFolder.bind(this, content)}/>
              }
              return null;
            })
          }
      </div>
      <br />
      <h2 className="section-heading"> Files </h2>

      <div className="file-section section">
      {
        this.contents.filter((content) => {
          if (document.hiddenVisible) {
            return true;
          } else {
            return content.name[0] !== '.';
          }
        }).map((content, index) => {
          if (content.isFile) {
            return <File key={index} content={content}/>
          }
          return null;
        })
      }
      </div>
      </div>
    )
  }
}
