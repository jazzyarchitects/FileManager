import Encrypter from '../compiled/modules/utils/crypto';

export default {
  "BASE_URL": process.env.NODE_ENV === "production" ? "http://<host_url>" : "http://localhost:3000",
  "DefaultPath": '/home/jibin/Downloads',
  "Events": {
    "directoryChange": 'directory-change',
    "directoryChangeFromContents": 'directory-change-from-contents',
    "hiddenVisibilityToggle": 'change-hidden-visibility',
    "showFileDetails": 'show-file-details',
    "goBackFromContents": 'go-back-from-contents',
    "showFolderDetails": 'show-folder-details',
    "setCurrentContextMenuParent": 'set-current-context-menu-parent',
    "closePopup": 'close-popup'
  },
  "days": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  "months": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  "resetActiveElement": () => {
    let allItem = document.querySelectorAll('.item-active');
    for (let item of allItem) {
      item.classList.remove('item-active')
    }
  },
  "checkResponse": (response) => {
    if (response.status === 403 && document.authenticationInProgress === false) {
      document.cookie = "";
      window.location.reload();
      return false;
    }
    return true;
  },
  "openFile": function (path) {
    let filePath = Encrypter.encryptString(path);
    let win = window.open(`${this.BASE_URL}/file/raw/${path.getCurrentFolderName()}?path=${filePath}`);
    win.focus();
  },
  "getRandomString": function (len) {
    len = len || 7;
    // No 0, O, I, l, 1
    let allowed = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*()';
    let finalString = "";
    for (let i = 0; i < len; i++) {
      finalString += allowed[Math.floor(Math.random() * allowed.length)];
    }
    return finalString;
  },
  "doubleClickDelay": 250
}
