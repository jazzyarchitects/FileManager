window.onload = init;

function init(){
  document.oncontextmenu = contextMenuRequestHandler;
}

function contextMenuRequestHandler(e){
  e.preventDefault();
}