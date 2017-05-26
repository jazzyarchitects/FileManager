import React from 'react';
import ImagePreview from './ImagePreview';
import PdfPreview from './PdfPreview';
import DefaultFilePreview from './DefaultFilePreview';
import FileDetailsView from './FileDetailsView';
import VideoPreview from './VideoPreview';

import Constants from '../constants';

export default class FilePreview extends React.Component {
  constructor (props) {
    super(props);

    this.imageFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    this.pdfFileExtensions = ['pdf'];
    this.videoFileExtensions = ['mkv', 'mp4', '3gp', 'avi'];
    this.audioFileExtensions = ['mp3', 'wav'];
    this.IMAGE = 'image';
    this.PDF = 'pdf';
    this.VIDEO = 'video';
    this.AUDIO = 'audio';
    this.DEFAULT = 'default';
  }

  decidePreviewType () {
    if (!this.props || !this.props.contents || !this.props.contents.name) {
      return 0;
    }
    let fileExtension = this.props.contents.name.slice(this.props.contents.name.lastIndexOf('.') + 1).toLowerCase();
    if (this.imageFileExtensions.indexOf(fileExtension) !== -1) {
      return this.IMAGE;
    }
    if (this.pdfFileExtensions.indexOf(fileExtension) !== -1) {
      return this.PDF;
    }
    if (this.videoFileExtensions.indexOf(fileExtension) !== -1) {
      return this.VIDEO;
    }
    if (this.audioFileExtensions.indexOf(fileExtension) !== -1) {
      return this.AUDIO;
    }
    if (this.props.contents.size <= 1 * 1024 * 1024) {
      return this.DEFAULT;
    }
    return 0;
  }

  render () {
    let result = this.decidePreviewType.bind(this)();
    let content;
    switch (result) {
      case this.IMAGE:
        content = <ImagePreview content={this.props.contents}/>;
        break;
      case this.PDF:
        content = <PdfPreview content={this.props.contents} />;
        break;
      case this.VIDEO:
        content = <VideoPreview content={this.props.contents} />
        break;
      case this.DEFAULT:
        content = <DefaultFilePreview content={this.props.contents} />;
        break;
      default:
        return null;
    }
    return (
      <div className="file-preview-main">
        <h3 className="preview-h3">{this.props.contents.name}</h3>
        {content}
        <FileDetailsView content={this.props.contents} />
      </div>
    )
  }
}
