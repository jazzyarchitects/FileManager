import React from 'react';

import Constants from '../constants';
import FetchFromServer from '../FetchFromServer';

export default class VideoPreview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.shouldShow = false;
  }

  componentDidMount () {
    this.shouldShow = true;
    this.fetchVideoThumbnail();
  }

  componentWillReceiveProps (newProps) {
    this.fetchVideoThumbnail(newProps);
  }

  fetchVideoThumbnail (properties) {
    let props = properties || this.props.content;

    if (!props) {
      return;
    }

    FetchFromServer(`${Constants.BASE_URL}/file/video?path=${encodeURIComponent(props.path)}`)
    .then(jsonResult => {
      this.shouldShow && this.setState({thumbURL: jsonResult.path.replace(/\//g, '-').slice(0, jsonResult.path.lastIndexOf('.')) + '.png'});
    });
  }

  componentWillUnmount () {
    this.shouldShow = false;
  }

  render () {
    if (!this.state || !this.state.thumbURL) {
      return null;
    }
    return (
      <div className="image-preview">
       <img src={`${Constants.BASE_URL}/file/thumb/video?path=${encodeURIComponent(this.state.thumbURL)}`} className="preview-image" />
     </div>
    );
  }
}
