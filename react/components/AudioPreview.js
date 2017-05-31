import React from 'react';

import Constants from '../constants';
import FetchFromServer from '../FetchFromServer';

export default class AudioPreview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.unmount = false;
  }

  componentDidMount () {
    this.fetchAudioDetails();
  }

  componentWillReceiveProps (newProps) {
    this.fetchAudioDetails(newProps.content);
  }

  fetchAudioDetails (properties) {
    let props = properties || this.props.content;
    FetchFromServer(`${Constants.BASE_URL}/file/thumb/audio?path=${encodeURIComponent(props.path)}`)
    .then(result => {
      !this.unmount && this.setState({imageURL: result.imageURL});
    });
  }

  componentWillUnmount () {
    this.unmount = true;
  }

  render () {
    if (!this.state || !this.state.imageURL) {
      return null;
    }
    return (
      <div className="preview audio-preview">
        <img src={this.state.imageURL} />
      </div>
    )
  }
};
