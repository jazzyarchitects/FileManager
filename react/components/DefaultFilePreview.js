import React from 'react';

import Constants from '../constants';

export default class DefaultFilePreview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    this.fetchFileContent()
  }

  componentWillReceiveProps (newProps) {
    this.fetchFileContent(newProps);
  }

  fetchFileContent (newProps) {
    let props = newProps || this.props;
    if (!props || !props.content) {
      return "";
    }
    fetch(`${Constants.BASE_URL}/file/string?path=${encodeURIComponent(props.content.path)}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      this.setState({data: result.content});
    });
  }

  render () {
    if (!this.state || !this.state.data) {
      if (this.props && this.props.content) {
        this.fetchFileContent();
      }
      return null;
    }
    return (
      <div className="content-preview">
        <pre>{this.state.data}</pre>
      </div>
    )
  }
};
