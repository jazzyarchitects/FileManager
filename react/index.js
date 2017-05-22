import FolderList from './components/FolderList';
import FileList from './components/FileList';

import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './constants';

window.onload = function () {
  ReactDOM.render(<FolderList />, document.getElementById('folderListContainer'));
  ReactDOM.render(<FileList />, document.getElementById('folderContentContainer'));
};

document.addEventListener(Constants.Events.directoryChange, (e) => {
  ReactDOM.render(<FileList contents={e.detail.contents} pathObj={e.detail.pathObj} />, document.getElementById('folderContentContainer'));
});
