import React from 'react';

import Constants from '../constants';

export default class FileDetailsView extends React.Component {
  openFile () {
    let win = window.open(`${Constants.BASE_URL}/file/raw/${this.props.content.name}?path=${this.props.content.path}`)
    win.focus();
  }

  render () {
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
          <tr><td>Size</td><td>{Math.floor(this.props.content.size / 10.24) / 100} KB</td></tr>
        </tbody></table>
      </div>
    )
  }
}
