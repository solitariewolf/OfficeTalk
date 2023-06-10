// Adicionar evento de clique ao botão "Sair"
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', logout);

// Função para fazer o logout
function logout() {
    // Realizar uma requisição para logout.php
    fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Se o logout foi bem sucedido, redirecionar para a página de login
                window.location.href = '../index.html';
            }
        })
        .catch(error => {
            console.error('Erro ao fazer logout:', error);
        });
}

// Função para carregar a lista de usuários do arquivo users.php
function loadUserList() {
    var userListElement = document.querySelector('.user-list');

    // Fazer uma requisição AJAX para obter a lista de usuários
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'users.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // A requisição foi bem sucedida. Atualizar a lista de usuários.
            userListElement.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Chamar a função para carregar a lista de usuários ao carregar a página
document.addEventListener('DOMContentLoaded', loadUserList);

// Função para enviar mensagens
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();

    if (message !== '') {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'send.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                messageInput.value = '';
                loadChatHistory();
            }
        };
        
        var params = 'message=' + encodeURIComponent(message);
        xhr.send(params);
    } else {
        console.log("A mensagem não pode ser vazia");
    }
}

// Função para carregar o histórico do chat
function loadChatHistory() {
    var chatHistoryElement = document.querySelector('.chat-history');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'history.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var messages = JSON.parse(xhr.responseText);
            var html = '';
            messages.forEach(function(message) {
                html += '<div class="message"><strong>' + message.username + '</strong>: ' + message.message + '</div>';
            });
            chatHistoryElement.innerHTML = html;
            
            // Scroll para o final do chat
            chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
        } else {
            console.log("Não foi possível carregar o histórico do chat");
        }
    };
    xhr.send();
}

setInterval(loadChatHistory, 2000);

// Vincular a função sendMessage ao botão "Enviar"
var sendButton = document.getElementById('send-button');
if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
} else {
    console.error('Botão "Enviar" não encontrado');
}

// Permitir o envio de mensagem com a tecla Enter
var messageInput = document.getElementById('message-input');
if (messageInput) {
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault(); // Impede a criação de uma nova linha no textarea
        }
    });
} else {
    console.error('Campo de entrada de mensagem não encontrado');
}
