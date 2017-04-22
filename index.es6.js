import express from 'express';
import http from 'http';
import socket from 'socket.io';
import logTable from './compiled/table';


global.console.table = logTable;

const app = express();

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, ()=>{
  console.log("Server listenting on port "+(process.env.PORT || 3000));
});

