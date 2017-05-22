import React from 'react';

export default class File extends React.Component {
  constructor (props) {
    super(props); ;
  }

  render () {
    return (
      <div className="directory-item">
        {this.props.content.name}
      </div>
    );
  }
}
