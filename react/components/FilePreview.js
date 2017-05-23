import React from 'react';
import ImagePreview from './ImagePreview';

export default class FilePreview extends React.Component {
  decidePreviewType () {

  }

  render () {
    console.log(this.props.contents);
    return (
      <ImagePreview content={this.props.contents}/>
    )
  }
}
