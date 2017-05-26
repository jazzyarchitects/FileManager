export default {
  "BASE_URL": process.env.NODE_ENV === "production" ? "http://<host_url>" : "http://localhost:3000",
  "DefaultPath": '/home/jibin/Downloads',
  "Events": {
    "directoryChange": 'directory-change',
    "directoryChangeFromContents": 'directory-change-from-contents',
    "hiddenVisibilityToggle": 'change-hidden-visibility',
    "showFileDetails": 'show-file-details',
    "goBackFromContents": 'go-back-from-contents',
    "showFolderDetails": 'show-folder-details'
  },
  "days": ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  "months": ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
}
