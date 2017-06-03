import React from 'react';

import Constants from '../constants';
import Encrypter from '../../compiled/modules/utils/crypto';

export default class FileDetailsView extends React.Component {
  openFile () {
    Constants.openFile(this.props.content.path);
  }

  render () {
    let size = this.props.content.size;
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let unitIndex = 0;

    while (size > 1024) {
      size = Math.floor(size / 10.24) / 100;
      unitIndex++;
    }

    return (
      <div className='file-details-container'>
        <button className='open-file-button detail' onClick={this.openFile.bind(this)}>Open File</button>
        <table className="details-table"><tbody>
          {
            Object.keys(this.props.content).map((key, index) => {
              if (key.indexOf("time") === -1) {
                return null;
              }
              let d = new Date(this.props.content[key]);
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
          <tr><td>Size</td><td>{size} {units[unitIndex]}</td></tr>
        </tbody></table>
      </div>
    )
  }
}
