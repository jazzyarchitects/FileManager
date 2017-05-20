import React from 'react';

export default class FolderListItem extends React.Component {
  render () {
    let content = this.props.item;

    return (
      <span className='folder-list-item'>
        {content.name}
      </span>
    )
  }
}
