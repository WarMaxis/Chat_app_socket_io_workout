import socket from '../base/socket';

class Chat {
    constructor() {
        console.log(socket);

        var inputLogin = document.getElementById('login'),
            sendLogin = document.getElementById('send-login'),
            inputMessage = document.getElementById('message'),
            sendMessage = document.getElementById('send-message'),
            messages = document.getElementById('messages'),
            userLogin = '';

        inputMessage.style.display = "none";
        sendMessage.style.display = "none";

        sendLogin.addEventListener('click', function () {
            userLogin = inputLogin.value;

            socket.emit('client-login', {
                user: userLogin
            });

            socket.emit('client-get-history', {
                limit: '10'
            });

            socket.on('server-message', function (object) {
                console.log(object);
                for (var i = 0; i < 10; i++) {
                    messages.innerHTML = messages.innerHTML + object.messages[i].author + '    ' + object.messages[i].message + '<br><br>';
                }
            });

            inputMessage.style.display = "block";
            sendMessage.style.display = "block";
        });

        sendMessage.addEventListener('click', function () {
            var userMessage = inputMessage.value;

            socket.emit('client-message', {
                author: userLogin,
                message: userMessage
            });
        });

    }
}

export default Chat;
