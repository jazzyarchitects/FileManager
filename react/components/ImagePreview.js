import React from 'react';
import Constants from '../constants';

export default class ImagePreview extends React.Component {
  componentDidMount () {
    this.fetchData();
  }
  componentWillReceiveProps () {
    this.fetchData();
  }

  fetchData () {
    console.log("fetch data");
    if (!this.props || !this.props.content) {
      return;
    }
    fetch(`${Constants.BASE_URL}/file?path=${encodeURIComponent(this.props.content.path)}`)
    .then(result => {
      return result.json();
    })
    .then(result => {
      this.setState({imageData: result.content});
    })
  }

  render () {
    console.log(this.state);
    if (!this.state || !this.state.imageData) {
      return null;
    }
    return (
     <div className="image-preview">
       {console.log(this.state.imageData)};
       <img src={this.state.imageData} />
     </div>
    )
  }
}
