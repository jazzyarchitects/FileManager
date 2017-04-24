import React from 'react';

export default class FolderListItem extends React.Component {
  render () {
    const name = this.props.name;
    const code = this.props.code;

    return (
      <span className='folder-list-item'>
        Hello
      </span>
    )
  }
}
