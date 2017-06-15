import React from 'react';

import Constants from '../constants';
import FetchFromServer from '../FetchFromServer';

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
    FetchFromServer(`${Constants.BASE_URL}/file/string?path=${encodeURIComponent(props.content.path)}`)
      .then(result => {
        if (!this.shouldShow) {
          return null;
        }
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
