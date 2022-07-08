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

            // vai mostrar o usuário da requisição
            socket.emit('user-ok', connectionUsers);
            // vai notificar todos os usuários que um novo usuário entrou, menos o próprio usuário
            socket.broadcast.emit('list-update', {
               joined: username, // usuário que entrou
               list: connectionUsers // lista de usuários
            });
         });
      });
   }
}
