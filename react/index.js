import FolderList from './components/FolderList';
import FileList from './components/FileList';
import HiddenToggle from './components/HiddenToggle';
import FilePreview from './components/FilePreview';
import FolderPreview from './components/FolderPreview';
import PasswordDialog from './components/PasswordDialog';
import ShareModal from './components/ShareModal';

import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './constants';
import Encrypter from '../compiled/modules/utils/crypto';
import FetchFromServer from './FetchFromServer';

import md5 from 'md5';

String.prototype.getCurrentFolderName = function () {
  if (this) {
    return this.slice(this.lastIndexOf('/') + 1);
  }
  return "";
}

let Operation = {
  CUT: 0,
  COPY: 1,
  NONE: 2
};

let ContextMenuItems = {
  OPEN: 0,
  CUT: 1,
  COPY: 2,
  PASTE: 3,
  SHARE: 4
};

let snackbarView;
let SnackbarStatuses = {
  visible: 1,
  hidden: 0
};
let snackbarStatus = SnackbarStatuses.visible;
let snackbarTimer;
let snackbarContentView;
let SNACKBAR_TIMEOUT = 5 * 1000;

let contextMenuItemIds = ["context-menu-open", "context-menu-cut", "context-menu-copy", "context-menu-paste", "content-menu-share"];
let contextMenuItemActions = [openCurrentFile, cutCurrentFile, copyCurrentFile, pasteCurrentFile, shareFilePath];
let contextMenu;
let contextMenuItems = [];
let contextMenuCurrentState = {};
let currentContextMenuParent;

let currentPathObj = {fromFile: false};
let currentFile;
let currentOperation;
let currentDirectory;

let PopupStates = {
  OPEN: 0,
  CLOSE: 1
};

let currentPopupState = PopupStates.CLOSE;

window.onload = function () {
  // Show password dialog if not logged in
  if (getCookie("userSessionStatus") !== "loggedIn") {
    document.isLoggedIn = false;
    document.body.innerHTML = "";
    let box = document.createElement('div');
    box.id = "authenticationBox";
    document.body.appendChild(box);
    ReactDOM.render(<PasswordDialog />, document.getElementById("authenticationBox"));
    document.getElementById('authenticationBox').style.marginTop = (window.innerHeight - document.getElementById('authenticationBox').clientHeight) / 2;
    document.getElementById('loginPassword').focus();
    document.authenticationInProgress = true;
  } else {
    document.authenticationInProgress = false;
    document.isLoggedIn = true;

    render();
    // Assigning DOM elements
    let backButton = document.getElementById('back-button');
    let folderList = document.getElementById('nav-folder-list');
    let header = document.querySelector("header");
    let folderContentContainer = document.getElementById("folderContentContainer");
    snackbarView = document.getElementById('snackbar');
    snackbarContentView = document.getElementById("snackbar-content");
    contextMenu = document.querySelector("#myMenu");
    document.getElementById("snackbar-close").addEventListener('click', function () { console.log("Snackbar close"); hideSnackbar() });

    // Set nav-bar folder list height to enable partial scroll bar
    folderList.style.height = window.innerHeight - backButton.getBoundingClientRect().bottom - 15;
    // Set file list height to enable sectional scrolling
    folderContentContainer.style.height = window.innerHeight - header.getBoundingClientRect().bottom - 8;

    // Set click listeners on context menu buttons
    for (let i = 0; i < contextMenuItemIds.length; i++) {
      let temp = document.getElementById(contextMenuItemIds[i]);
      temp.addEventListener('click', contextMenuItemActions[i]);
      contextMenuItems.push(temp);
    }

    // When user click on file list container but is not on any file or folder item, then reset file preview
    folderContentContainer.addEventListener('click', function (e) {
      Constants.resetActiveElement();
      ReactDOM.render(<FilePreview contents={undefined} />, document.getElementById('file-preview'));
      currentFile = undefined;
    }, true);

    // Assign context menu event to only those contextmenu triggers in the file-list section
    folderContentContainer.addEventListener('contextmenu', contextMenuRequestHandler, false);
    contextMenu.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    ReactDOM.render(<FilePreview contents={currentFile} />, document.getElementById('file-preview'));
  }
};

// Functiont to render folder list, file list and file preview
function render () {
  ReactDOM.render(<FolderList pathObj={currentPathObj} />, document.getElementById('folderListContainer'));
  ReactDOM.render(<FileList />, document.getElementById('folderContentContainer'));
  ReactDOM.render(<HiddenToggle visibility={document.hiddenVisible || false} />, document.getElementById('hidden-visibility-toggle-container'));
}

// Event handler for event when user clicks on a folder from nav bar folder list
document.addEventListener(Constants.Events.directoryChange, (e) => {
  document.getElementById('content-name-holder').innerHTML = `<a style="color: #222; line-height: 1.6em">${e.detail.pathObj.getCurrentFolderName()}</a><br /><a style='font-size: 0.6em; color: #555;'>${e.detail.pathObj.base}</a>`;
  ReactDOM.render(<FileList contents={e.detail.contents} pathObj={e.detail.pathObj} />, document.getElementById('folderContentContainer'));
  currentDirectory = e.detail.pathObj.base;
});

// Event handler for event triggered when user double clicks a folder in folder list in file-list-container. Open clicked folder
document.addEventListener(Constants.Events.directoryChangeFromContents, (e) => {
  // console.log("Received " + Constants.Events.directoryChangeFromContents);
  let pathObj = e.detail.pathObj;
  let folderObj = e.detail.folderObj;

  pathObj.base += `/${folderObj.name}`;
  currentPathObj = pathObj;
  ReactDOM.render(<FolderList pathObj={pathObj}/>, document.getElementById('folderListContainer'));
});

// Event handler for event triggered when user changes hidden file visibility
document.addEventListener(Constants.Events.hiddenVisibilityToggle, (e) => {
  document.hiddenVisible = e.detail.visibility || false;
  render();
  // }
});

// Event handler for event triggered when user clicks on a file name. Show this file details
document.addEventListener(Constants.Events.showFileDetails, (e) => {
  // console.log("Received ");
  // console.log(Constants.Events.showFileDetails);
  ReactDOM.render(<FilePreview contents={e.detail} />, document.getElementById('file-preview'));
  currentFile = e.detail;
});

// Event handler for event triggered when user single clicks a folder in file-list-container. Show folder details
document.addEventListener(Constants.Events.showFolderDetails, (e) => {
  // console.log("Received " + Constants.Events.showFolderDetails);
  ReactDOM.render(<FolderPreview contents={e.detail} />, document.getElementById('file-preview'));
});

// Event handler to handle events when a file or folder item is right clicked
document.addEventListener(Constants.Events.setCurrentContextMenuParent, (e) => {
  // console.log("Received " + Constants.Events.setCurrentContextMenuParent);
  currentContextMenuParent = {content: e.detail.content, id: e.detail.id, isFolder: e.detail.isFolder || false, isFile: e.detail.isFile || false};
  showContextMenu(e.detail.event, 'fileOperation');
});

// Event handler to close share popup as it cannot be unmounted from itself
document.addEventListener(Constants.Events.closePopup, (e) => {
  hideSharePopup();
});

/* Context menu related functions */
// Show context menu at current cursor location
function showContextMenu (e, type) {
  e.preventDefault();
  let cursorPostiion = getMousePosition(e);
  let scrollPosition = getScrollPosition();

  contextMenu.style.display = 'block';
  contextMenu.style.left = cursorPostiion.x + scrollPosition.x;
  contextMenu.style.top = cursorPostiion.y + scrollPosition.y;

  let allowedIndexes;

  contextMenuCurrentState.fromFile = currentContextMenuParent.isFile;
  contextMenuCurrentState.fromFolder = currentContextMenuParent.isFolder;
  // Conditional items
  // Currently sharing folders is disabled
  if (contextMenuCurrentState.fromFile) {
    allowedIndexes = [ContextMenuItems.OPEN, ContextMenuItems.CUT, ContextMenuItems.COPY];
    allowedIndexes.push(ContextMenuItems.SHARE);
  } else if (contextMenuCurrentState.fromFolder) {
    allowedIndexes = [ContextMenuItems.OPEN];
  } else {
    allowedIndexes = [ContextMenuItems.PASTE];
  }

  // Unconditional items

  for (let i = 0; i < contextMenuItems.length; i++) {
    if (allowedIndexes.indexOf(i) !== -1) {
      contextMenuItems[i].style.display = 'block';
    } else {
      contextMenuItems[i].style.display = 'none';
    }
  }

  if (currentOperation === Operation.COPY || currentOperation === Operation.CUT) {
    contextMenuItems[ContextMenuItems.PASTE].classList.remove('disabled');
  } else {
    contextMenuItems[ContextMenuItems.PASTE].classList.add('disabled');
  }
}

// Hide context menu
function dismissContextMenu () {
  contextMenu.style.display = 'none';
}

// When user click anywhere in the document, dismiss the context menu
document.addEventListener('click', function (e) {
  dismissContextMenu(e);
}, false);

function contextMenuRequestHandler (e) {
  Constants.resetActiveElement();
  showContextMenu(e);
}

// Snackbar functions
function hideSnackbar () {
  snackbarView.classList.add('snackbar-hidden');
  snackbarStatus = SnackbarStatuses.hidden;
  snackbarTimer && clearTimeout(snackbarTimer);
  // setTimeout(function () {
  //   showSnackbar();
  // }, 2000);
}

function showSnackbar (content, preventAutoDismiss = false) {
  snackbarView.classList.remove('snackbar-hidden');
  snackbarContentView.innerHTML = content;
  snackbarStatus = SnackbarStatuses.visible;
  if (!preventAutoDismiss) {
    snackbarTimer = setTimeout(function () {
      hideSnackbar();
    }, SNACKBAR_TIMEOUT);
  }
}

/* Helper functions to get cursor position for context menu */
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

// Context menu actions
function openCurrentFile () {
  if (currentContextMenuParent) {
    let path = currentContextMenuParent.content.path;
    Constants.openFile(path);
  }
}

function cutCurrentFile () {
  currentOperation = Operation.CUT;
}

function copyCurrentFile () {
  currentOperation = Operation.COPY;
}

function pasteCurrentFile () {
  let operation = currentOperation === Operation.CUT ? 'cut' : 'copy';
  let tf = Encrypter.encryptString(currentContextMenuParent.content.path);
  let td = Encrypter.encryptString(currentDirectory);
  FetchFromServer(`${Constants.BASE_URL}/directory/${operation}`, 'PUT', {tf, td})
    .then(result => {
      alert(JSON.stringify(result));
      currentOperation = Operation.NONE;
    });
}

function showSharePopup (content, url, password) {
  ReactDOM.render(<ShareModal content={currentContextMenuParent.content} url={url} password={password} />, document.getElementById("popup"));
  currentPopupState = PopupStates.OPEN;
}

function hideSharePopup () {
  ReactDOM.unmountComponentAtNode(document.getElementById("popup"));
}

function shareFilePath () {
  showSharePopup();
}

function getCookie (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
