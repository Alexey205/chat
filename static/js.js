const socket = io({
    auth:{
        cookie: document.cookie
    }
});


const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const logout = document.getElementById('logout');

logout.addEventListener('click', (e)=>{
    document.cookie = 'token=; Max-Age=0';
    location.assign('/login');
});



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

// function ChangeNickname(){
//     let nickname = prompt('Enter your nickname');
//     if(nickname){
//         socket.emit('setNickname', nickname);
//     }
// }

ChangeNickname();
