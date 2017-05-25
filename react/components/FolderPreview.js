import React from 'react';
import ImagePreview from './ImagePreview';
import PdfPreview from './PdfPreview';
import DefaultFilePreview from './DefaultFilePreview';
import FileDetailsView from './FileDetailsView';

import Constants from '../constants';

export default class FilePreview extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="file-preview-main">
        <h3 className="preview-h3"><i className="material-icons">folder</i> {this.props.contents.name}</h3>
        {/* {content} */}
        {/* <FileDetailsView content={this.props.contents} /> */}
        <div className="folder-image">
          <svg version="1.1" focusable="false" viewBox="0 0 128 128"><g><path fill="#8f8f8f" d="M128.145,47.954V24.681c0-1.926-1.562-3.49-3.491-3.49H48.932 c0,0-1.563-8.146-3.491-8.146H3.491C1.563,13.045,0,14.608,0,16.536v8.145v2.328v20.945"></path><path opacity="0.33" d="M128.145,47.954V24.681c0-1.926-1.562-3.49-3.491-3.49H48.932 c0,0-1.563-8.146-3.491-8.146H3.491C1.563,13.045,0,14.608,0,16.536v8.145v2.328v20.945"></path><path fill="#8f8f8f" d="M120,32.827H8.145C3.647,32.827,0,36.474,0,40.973v67.491 c0,1.929,1.563,3.491,3.491,3.491h121.162 c1.929,0,3.491-1.562,3.491-3.491V40.973C128.145,36.474,124.498,32.827,120,32.827z"></path></g></svg>
        </div>
        <table className="details-table"><tbody>
          {
            Object.keys(this.props.contents).map((key, index) => {
              if (key.indexOf("time") === -1) {
                return null;
              }
              let d = new Date(this.props.contents[key]);
              let toDisplay = `${Constants.days[d.getDay()]} ${Constants.months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
              if (key === "atime") {
                return <tr key={index}><td>Last Accessed</td><td>{toDisplay}</td></tr>
              }
              if (key === "mtime") {
                return <tr key={index}><td>Last Modified</td><td>{toDisplay}</td></tr>
              }
              if (key === "btime") {
                return <tr key={index}><td>Created at</td><td>{toDisplay}</td></tr>
              }
            })
          }
        </tbody></table>
      </div>
    )
  }
}
