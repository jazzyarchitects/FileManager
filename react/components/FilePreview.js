import React from 'react';
import ImagePreview from './ImagePreview';

export default class FilePreview extends React.Component {
  constructor (props) {
    super(props);

    this.imageFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    this.IMAGE = 'image';
    this.PDF = 'pdf';
  }

  decidePreviewType () {
    if (!this.props || !this.props.contents || !this.props.contents.name) {
      return 0;
    }
    if (this.imageFileExtensions.indexOf(this.props.contents.name.slice(this.props.contents.name.lastIndexOf('.') + 1)) !== -1) {
      return this.IMAGE;
    }
    return 0;
  }

  render () {
    let result = this.decidePreviewType.bind(this)();
    switch (result) {
      case this.IMAGE:
        return (<ImagePreview content={this.props.contents}/>);
      default:
        return null;
    }
  }
}
