import React from 'react';
import ImagePreview from './ImagePreview';
import PdfPreview from './PdfPreview';
import DefaultFilePreview from './DefaultFilePreview';
import FileDetailsView from './FileDetailsView';

export default class FilePreview extends React.Component {
  constructor (props) {
    super(props);
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Sept', 'Oct', 'Nov', 'Dec'];
  }

  render () {
    return (
      <div className="file-preview-main">
        <h3 className="preview-h3">{this.props.contents.name}</h3>
        {/* {content} */console.log(this.props.contents)}
        {/* <FileDetailsView content={this.props.contents} /> */}
        <table className="details-table"><tbody>
          {
            Object.keys(this.props.contents).map((key, index) => {
              if (key.indexOf("time") === -1) {
                return null;
              }
              let d = new Date(this.props.contents[key]);
              let toDisplay = `${this.days[d.getDay()]} ${this.months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
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
