const socket = io('http://localhost:8000');

const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'Right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter Your Name To Join");
socket.emit('new-user-joined', name);


socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'Right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'Left')
})

socket.on('left', data => {
    append(`${data.name} left the chat`, 'Left')
})