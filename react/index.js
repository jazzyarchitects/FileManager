import FolderList from './components/FolderList';
import FileList from './components/FileList';
import HiddenToggle from './components/HiddenToggle';
import FilePreview from './components/FilePreview';
import FolderPreview from './components/FolderPreview';

import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './constants';

String.prototype.getCurrentFolderName = function () {
  if (this) {
    return this.slice(this.lastIndexOf('/') + 1);
  }
  return "";
}

let contextMenu;
let currentPathObj = {};
let currentFile;

window.onload = function () {
  render();
  let backButton = document.getElementById('back-button');
  let folderList = document.getElementById('nav-folder-list');
  contextMenu = document.querySelector("#myMenu");
  folderList.style.height = window.innerHeight - backButton.getBoundingClientRect().bottom - 15;

  let folderContentContainer = document.getElementById("folderContentContainer");

  folderContentContainer.addEventListener('click', function (e) {
    let allItem = document.querySelectorAll('.item-active');
    for (let item of allItem) {
      item.classList.remove('item-active')
    }
    ReactDOM.render(<FilePreview contents={undefined} />, document.getElementById('file-preview'));
    currentFile = undefined;
  }, false);

  let header = document.querySelector("header");
  folderContentContainer.style.height = window.innerHeight - header.getBoundingClientRect().bottom - 8;
  ReactDOM.render(<FilePreview contents={currentFile} />, document.getElementById('file-preview'));
};

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
  document.hiddenVisible = e.detail.visibility || false;
  render();
  // }
});

document.addEventListener(Constants.Events.showFileDetails, (e) => {
  ReactDOM.render(<FilePreview contents={e.detail} />, document.getElementById('file-preview'));
  currentFile = e.detail;
});

document.addEventListener(Constants.Events.showFolderDetails, (e) => {
  ReactDOM.render(<FolderPreview contents={e.detail} />, document.getElementById('file-preview'));
});

document.addEventListener(Constants.Events.directoryChangeFromContents, (e) => {
  let pathObj = e.detail.pathObj;
  let folderObj = e.detail.folderObj;

  pathObj.base += `/${folderObj.name}`;
  currentPathObj = pathObj;
  ReactDOM.render(<FolderList pathObj={pathObj}/>, document.getElementById('folderListContainer'));
});

function showContextMenu (e) {
  let cursorPostiion = getMousePosition(e);
  let scrollPosition = getScrollPosition();

  contextMenu.style.display = 'block';
  contextMenu.style.left = cursorPostiion.x + scrollPosition.x;
  contextMenu.style.top = cursorPostiion.y + scrollPosition.y;
}

function dismissContextMenu () {
  contextMenu.style.display = 'none';
}

document.oncontextmenu = contextMenuRequestHandler;

document.addEventListener('click', function (e) {
  dismissContextMenu(e);
}, false);

function contextMenuRequestHandler (e) {
  e.preventDefault();
  showContextMenu();
}

function getMousePosition (e) {
  e = e || window.event;
  var position = {
    'x': e.clientX,
    'y': e.clientY
  }
  return position;
}

function getScrollPosition () {
  var x = 0;
  var y = 0;

  if (typeof (window.pageYOffset) === 'number') {
    x = window.pageXOffset;
    y = window.pageYOffset;
  } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
    x = document.documentElement.scrollLeft;
    y = document.documentElement.scrollTop;
  } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
    x = document.body.scrollLeft;
    y = document.body.scrollTop;
  }
  return {x, y};
}
