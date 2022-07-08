const socketIO = require('socket.io');

exports.io = {
   connection: (server) => {
      return socketIO(server);
   },

   onConnect: (server, connectionUsers) => {
      const io = this.io.connection(server);

      io.on('connection', (socket) => {
         console.log('Conexão detectada...');

         socket.on('join-request', (username) => {
            socket.username = username;
            connectionUsers.push(username);
            console.log(connectionUsers);

            socket.emit('user-ok', connectionUsers);
         });
      });
   }
}
