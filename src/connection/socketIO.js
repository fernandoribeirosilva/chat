const socketIO = require('socket.io');

exports.io = {
   connection: (server) => {
      return socketIO(server);
   },

   onConnect: async (server) => {
      const io = this.io.connection(server);

      io.on('connection', (socket) => {
         console.log('Conexão detectada...');
      });
   }
}
