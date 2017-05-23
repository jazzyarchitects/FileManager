import React from 'react';
import Constants from '../constants';

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
    fetch(`${Constants.BASE_URL}/file/image?path=${encodeURIComponent(props.content.path)}`)
    .then(result => {
      return result.json();
    })
    .then(result => {
      this.setState({imageData: 'data:' + result.mime + ';base64,' + result.content, mime: result.mime});
    })
  }

  render () {
    if (!this.state || !this.state.mime) {
      if (this.props && this.count) {
        this.count --;
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