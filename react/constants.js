export default {
  "BASE_URL": process.env.NODE_ENV === "production" ? "http://<host_url>" : "http://localhost:3000",
  "DefaultPath": '/home/jibin/Documents',
  "Events": {
    "directoryChange": 'directory-change',
    "directoryChangeFromContents": 'directory-change-from-contents',
    "hiddenVisibilityToggle": 'change-hidden-visibility',
    "showFileDetails": 'show-file-details'
  }
}
