import React from 'react';

export default class File extends React.Component {
  constructor (props) {
    super(props); ;
  }

  render () {
    return (
      <div className="directory-item" onClick={this.props.onClick}>
        {this.props.content.name}
      </div>
    );
  }
}
