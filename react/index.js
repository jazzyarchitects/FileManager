import FolderList from './components/FolderList';
import FileList from './components/FileList';
import HiddenToggle from './components/HiddenToggle';

import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './constants';

String.prototype.getCurrentFolderName = function () {
  if (this) {
    return this.slice(this.lastIndexOf('/') + 1);
  }
  return "";
}

window.onload = function () {
  render();
  let backButton = document.getElementById('back-button');
  let folderList = document.getElementById('nav-folder-list');
  console.log(backButton);
  console.log(folderList);
  folderList.style.height = window.innerHeight - backButton.getBoundingClientRect().bottom - 15;
  console.log(folderList.style.height);
};

let currentPathObj = {};

function render () {
  ReactDOM.render(<FolderList pathObj={currentPathObj} />, document.getElementById('folderListContainer'));
  ReactDOM.render(<FileList />, document.getElementById('folderContentContainer'));
  ReactDOM.render(<HiddenToggle visibility={document.hiddenVisible || false} />, document.getElementById('hidden-visibility-toggle-container'));
}

document.addEventListener(Constants.Events.directoryChange, (e) => {
  document.getElementById('content-name-holder').innerHTML = `<a style="color: #222; line-height: 1.6em">${e.detail.pathObj.getCurrentFolderName()}</a><br /><a style='font-size: 0.6em; color: #555;'>${e.detail.pathObj.base}</a>`;
  ReactDOM.render(<FileList contents={e.detail.contents} pathObj={e.detail.pathObj} />, document.getElementById('folderContentContainer'));
});

document.addEventListener(Constants.Events.hiddenVisibilityToggle, (e) => {
  // if(e.detail.visible){
  document.hiddenVisible = e.detail.visibility || false;
  render();
  // }
});

document.addEventListener(Constants.Events.directoryChangeFromContents, (e) => {
  let pathObj = e.detail.pathObj;
  let folderObj = e.detail.folderObj;

  pathObj.base += `/${folderObj.name}`;
  currentPathObj = pathObj;
  ReactDOM.render(<FolderList pathObj={pathObj}/>, document.getElementById('folderListContainer'));
});
