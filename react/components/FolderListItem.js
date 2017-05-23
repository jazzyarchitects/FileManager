import React from 'react';

export default class FolderListItem extends React.Component {
  render () {
    let content = this.props.item;

    return (
      <span>
        {content.name}
      </span>
    )
  }
}
