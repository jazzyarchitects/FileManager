export default (initialState) => {
  return `
    <html>
    <head>
      <title>
        File Manager - Share File
      </title>
      <link rel="stylesheet" href="/public/css/sharefilepassword.css" />
      <script>
        window.__INITIAL_STATE = ${JSON.stringify(initialState)};
        window.onload = function(){
          document.getElementById('loginPassword').addEventListener('focus', function(){
            document.getElementById('loginPassword').classList.remove('error-input');
          });
          document.getElementById('loginButton').addEventListener('click', function(){
            let requestURL = \`\${window.__INITIAL_STATE.hostname}/share/file/\${window.__INITIAL_STATE.filename}\`;
            fetch(requestURL, {
              method: 'POST',
              body: JSON.stringify({password: document.getElementById('loginPassword').value}),
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: "same-origin"
            })
            .then(r => r.json())
            .then( result => {
              if(result.success === false){
                return document.getElementById('loginPassword').classList.add('error-input');
              }else{
                window.location = result.link;
                // document.close();
                // window.close();
              }
            });
          });
        }
      </script>
    </head>
    <body>
      <div class='passwordDialog'>
          <center><h4 for="password">Enter Password to continue</h4></center>
          <input type="password" placeholder="password" id="loginPassword" />
          <br />
          <button id="loginButton" >Open</button>
        </div>
    </body>
  </html>
  `;
}
