import React from 'react';
import ReactDOM from 'react-dom';

import FolderList from './FolderList';

export default class App extends React.Component {
  render () {
    return (
      <FolderList />
    )
  }
}

// console.log(document);
window.onload = function () {
  ReactDOM.render(<App />, document.getElementById('folderListContainer'));
}
