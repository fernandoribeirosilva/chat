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
      let li = document.createElement('li');
      li.innerHTML = user;
      ul.appendChild(li);
   });
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

// vai entra no chat
socket.on('user-ok', (list) => {
   loginPage.style.display = 'none';
   chatPage.style.display = 'flex';
   textInput.focus();

   userList = list;
   renderUserList();
});

// vai notificar todos os usuários que um novo usuário entrou, menos o próprio usuário
socket.on('list-update', (data) => {
   userList = data.list;
   renderUserList();
});