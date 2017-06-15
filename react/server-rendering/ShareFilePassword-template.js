export default ({body, initialState}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title> File Manager - Authentication</title>
        <link rel="stylesheet" href="/public/css/sharefilepassword.css" />
        <script>window.__APP_INITIAL_STATE=${initialState}</script>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
};
