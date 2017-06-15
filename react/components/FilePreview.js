import React from 'react';
import ImagePreview from './ImagePreview';
import PdfPreview from './PdfPreview';
import DefaultFilePreview from './DefaultFilePreview';
import FileDetailsView from './FileDetailsView';
import VideoPreview from './VideoPreview';
import AudioPreview from './AudioPreview';

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
    this.NO_PREVIEW = 'no-view';
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
    return this.NO_PREVIEW;
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
      case this.AUDIO:
        content = <AudioPreview content={this.props.contents} />
        break;
      case this.DEFAULT:
        content = <DefaultFilePreview content={this.props.contents} />;
        break;
      case this.NO_PREVIEW:
        content = <div> </div>;
        break;
      default:
        content = <div></div>;
        break;
    }
    if (this.props.contents) {
      return (
        <div className="file-preview-main">
          <h3 className="preview-h3">{this.props.contents.name}</h3>
          {content}
          <FileDetailsView content={this.props.contents} />
        </div>
      )
    } else {
      return (
        <div className="file-preview-no-select">
          <div>
            <svg fill="#aaa" height="150" viewBox="0 0 24 24" width="150" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <br /><br />
            <center>File Manager</center>
          </div>
        </div>
      )
    }
  }
}
