'use strict';

const WebSocket = require('ws');

const app = require('express')();
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

//expose port 3000 server
server.listen(3000, function(){
  console.log('server run di port 3000');
});
