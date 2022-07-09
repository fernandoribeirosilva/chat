const socket = io();// se for a conexão com outro servidor colocar a url do servidor, EX: io(url do servidor)

let username = '';
let userList = [];

const loginPage = document.querySelector('#login-page');
const chatPage = document.querySelector('#chat-page');

const loginInput = document.querySelector('#login-name-input');
const textInput = document.querySelector('#chat-text-input');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

const renderUserList = () => {
   let ul = document.querySelector('.user-list');
   ul.innerHTML = '';

   userList.forEach(user => {
      ul.innerHTML += `<li>${user}</li>`;
   });
}

const addMessage = (type, user, msg) => {
   let ul = document.querySelector('.chat-list');

   switch (type) {
      case 'status':
         ul.innerHTML += `<li class="m-status">${msg}</li>`;
         break;
      case 'msg':
         ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${msg}</li>`;
         break;
      default:
         break;
   }
}

loginInput.addEventListener('keyup', (e) => {
   if (e.keyCode === 13) {
      let name = loginInput.value.trim();

      if (name !== '') {
         username = name;
         document.title = `Chat (${username})`;
         socket.emit('join-request', username);
      }
   }
});

textInput.addEventListener('keyup', (e) => {
   if (e.keyCode === 13) {
      let txt = textInput.value.trim();
      textInput.value = '';

      if (txt != '') {
         addMessage('msg', username, txt);
         socket.emit('send-msg', txt);
      }
   }
});

// vai entra no chat
socket.on('user-ok', (list) => {
   loginPage.style.display = 'none';
   chatPage.style.display = 'flex';
   textInput.focus();

   addMessage('status', null, 'Conectado!');

   userList = list;
   renderUserList();
});

// vai notificar todos os usuários que um novo usuário entrou, menos o próprio usuário
socket.on('list-update', (data) => {
   // se a pessoa entro no chat
   if (data.joined) {
      addMessage('status', null, `${data.joined} entrou no chat.`);
   }

   // se apessoa saiu do chat
   if (data.left) {
      addMessage('status', null, `${data.left} saiu do chat.`);
   }

   userList = data.list;
   renderUserList();
});

socket.on('show-msg', (data) => {
   addMessage('msg', data.username, data.message)
});