import React from 'react';
import File from './File';

export default class FileList extends React.Component {
  constructor (props) {
    super(props);
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
            this.contents.map((content, index) => {
              if (!content.isFile) {
                return <File key={index} content={content}/>
              }
              return null;
            })
          }
      </div>
      <br />
      <h2 className="section-heading"> Files </h2>

      <div className="file-section section">
      {
        this.contents.map((content, index) => {
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
