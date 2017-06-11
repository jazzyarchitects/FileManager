export default ({body}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title> File Manager - Authentication</title>
        <link rel="stylesheet" href="/public/css/sharefilepassword.css" />
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
};
