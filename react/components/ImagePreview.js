import React from 'react';
import Constants from '../constants';
import FetchFromServer from '../FetchFromServer';

export default class ImagePreview extends React.Component {
  constructor (props) {
    super(props);
    this.count = 1;
    this.state = {};
  }

  componentDidMount () {
    this.fetchData();
  }
  componentWillReceiveProps (newProps) {
    this.count = 1;
    this.fetchData(newProps);
  }

  fetchData (optionsProps) {
    let props = optionsProps || this.props;
    if (!props || !props.content) {
      return;
    }
    let previewContainer = document.getElementById('file-preview');
    FetchFromServer(`${Constants.BASE_URL}/file/thumb/image/${previewContainer.offsetWidth}x${previewContainer.offsetHeight / 2}?path=${encodeURIComponent(props.content.path)}`)
      .then(result => {
        this.setState({imageData: 'data:' + result.mime + ';base64,' + result.content, mime: result.mime});
      })
  }

  render () {
    if (!this.state || !this.state.mime) {
      if (this.props && this.count) {
        this.count--;
        this.fetchData();
      }
      return null;
    }
    return (
      <div className="image-preview">
        <img src={this.state.imageData} className="preview-image" />
      </div>
    )
  }
}
