import React from 'react';

import Constants from '../constants';

export default class AudioPreview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    this.fetchAudioDetails();
  }

  componentWillReceiveProps (newProps) {
    this.fetchAudioDetails(newProps.content);
  }

  fetchAudioDetails (properties) {
    let props = properties || this.props.content;
    fetch(`${Constants.BASE_URL}/file/thumb/audio?path=${encodeURIComponent(props.path)}`)
    .then(r => r.json())
    .then(result => {
      this.setState({imageURL: result.imageURL});
    });
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
