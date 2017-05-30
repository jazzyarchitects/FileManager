import React from 'react';

import Constants from '../constants';

export default class DefaultFilePreview extends React.Component {
  constructor (props) {
    super(props);

    this.shouldShow = true;
    this.trucated = false;
    this.state = {};
  }

  componentDidMount () {
    this.fetchFileContent()
  }

  componentWillReceiveProps (newProps) {
    this.shouldShow = true;
    this.fetchFileContent(newProps);
  }

  fetchFileContent (newProps) {
    let props = newProps || this.props;
    if (!props || !props.content) {
      return "";
    }
    fetch(`${Constants.BASE_URL}/file/string?path=${encodeURIComponent(props.content.path)}`, {credentials: "same-origin"})
    .then(response => {
      if (this.shouldShow) {
        return response.json();
      }
      return null;
    })
    .then(result => {
      this.trucated = result.content.length > 1024 * 2;
      this.shouldShow && this.setState({data: result.content.slice(0, 1024 * 2)});
    });
  }

  componentWillUnmount () {
    this.shouldShow = false;
  }

  render () {
    if (!this.state || !this.state.data) {
      if (this.props && this.props.content) {
        this.fetchFileContent();
      }
      return null;
    }
    let truncatedMsg = "";
    if (this.trucated) {
      truncatedMsg = <div><br /><div>...<b>Open file to view complete content</b></div></div>
    }
    return (
      <div className="content-preview">
        <pre>{this.state.data}</pre>
        <br />{truncatedMsg}
      </div>
    )
  }
};
