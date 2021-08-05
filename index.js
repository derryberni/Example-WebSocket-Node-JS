'use strict';

const WebSocket = require('ws');

const app = require('express')();
const http = require('http');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/doraemon', (req, res) => {
  wss.send('doraemon');
  res.json({ 'status': 200 });
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.broadcast(message);
  });

  ws.send('Selamat Datang');
});

wss.broadcast = function broadcast(msg) {
   var newMsg = msg.toString();
   console.log(newMsg);
   wss.clients.forEach(function each(client) {
       console.log(client);
       client.send(newMsg);
    });
};

//expose port 3000 server
server.listen(3000, function(){
  console.log('server run di port 3000');
});
