const express = require('express');
const path = require('path');
const http = require('http');
const { io } = require('./connection/socketIO');

const app = express();
const server = http.createServer(app);// vai criar o servidor 
// io.connection(server);// vai criar o socket

app.use(express.static(path.join(__dirname, '../', 'public')));

io.onConnect(server);

server.listen(3000, () => {
   console.log('Server running on http://localhost:3000');
});
