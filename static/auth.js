const regForm = document.getElementById('formReg');
const loginForm = document.getElementById('loginForm');

regForm?.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {login, password, passRepeat} = regForm;

    if(password.value !== passRepeat.value){
        return alert("Passwords are different!");
    } 

    const user = JSON.stringify({
       login: login.value,
       password: password.value 
    })
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register');
    xhr.send(user);
    xhr.onload = () => alert(xhr.response); 
});

loginForm?.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    const {login, password} = loginForm;

    const user = JSON.stringify({
       login: login.value,
       password: password.value 
    })
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login');
    xhr.send(user);
    xhr.onload = () => {
        if(xhr.status === 200){
            const token = xhr.response;
            document.cookie = `token=${token}`;
            window.location.assign('/');
        } else{
            return alert(xhr.response);
        }
    };
});