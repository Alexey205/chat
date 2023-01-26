const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (input.value) {
        socket.emit('new_message', input.value);
        input.value = '';
    }
})

socket.on('message', (msg)=>{
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

function ChangeNickname(){
    let nickname = prompt('Enter your nickname');
    if(nickname){
        socket.emit('setNickname', nickname);
    }
}

ChangeNickname();
