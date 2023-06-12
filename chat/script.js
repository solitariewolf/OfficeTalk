// Adicionar evento de clique ao botão "Sair"
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', logout);

let currentOffset = 0;
let reachedTop = false;

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
    xhr.onreadystatechange = function () {
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
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                messageInput.value = '';
                loadChatHistory(true); // Chame com true para rolar para a mensagem mais recente
            }
        };

        var params = 'message=' + encodeURIComponent(message);
        xhr.send(params);
    } else {
        console.log("A mensagem não pode ser vazia");
    }
}


// Função para carregar o histórico do chat
function loadChatHistory(scrollToBottom = false) {
    if (reachedTop && !scrollToBottom) return;

    var chatHistoryElement = document.querySelector('.chat-history');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `history.php?offset=${currentOffset}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var messages = JSON.parse(xhr.responseText);
            if (messages.length === 0 && !scrollToBottom) {
                reachedTop = true;
                return;
            }

            var html = '';
            messages.reverse().forEach(function (message) {
                var messageDate = new Date(message.timestamp).toLocaleString();
                html += '<div class="message"><strong>' + message.username + '</strong>: ' + message.message + '<br><span class="message-date">' + messageDate + '</span></div>';
            });

            chatHistoryElement.innerHTML = html + chatHistoryElement.innerHTML;
            currentOffset += messages.length;

            if (scrollToBottom) {
                // Scroll para o final do chat
                chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
            }
        } else {
            console.log("Não foi possível carregar o histórico do chat");
        }
    };
    xhr.send();
}


document.querySelector('.chat-history').addEventListener('scroll', function (event) {
    if (event.target.scrollTop === 0) {
        loadChatHistory();
    }
});

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
// Chamar a função para carregar a lista de usuários ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadUserList();
    loadChatHistory(true);
});

//função para atualizar o perfil

document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profile-form");
    const profileModal = document.getElementById("profile-modal");

    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(profileForm);

            fetch('update_profile.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    profileModal.classList.add("hidden");
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    const cancelButton = document.getElementById("cancel-button");
    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            profileModal.classList.add("hidden");
        });
    }

    const profileLink = document.getElementById("profile-link");
    if (profileLink) {
        profileLink.addEventListener("click", function (event) {
            event.preventDefault();
            profileModal.classList.remove("hidden");
        });
    }
});

// preencher automaticamente os dados do formulario de perfil

const profileLink = document.getElementById("profile-link");
if (profileLink) {
    profileLink.addEventListener("click", function (event) {
        event.preventDefault();
        
        // Fetch the current user data
        fetch('get_profile.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("email").value = data.email;
                document.getElementById("username").value = data.username;
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Show the profile modal
        profileModal.classList.remove("hidden");
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const configForm = document.getElementById("config-form");
    const configModal = document.getElementById("config-modal");

    if (configForm) {
        configForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const status = document.getElementById("status-select").value;
            
            fetch('update_status.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    configModal.classList.add("hidden");
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
document.getElementById("settings-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const status = document.getElementById("status").value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "update_status.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.success) {
                alert("Status atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar status!");
            }
            document.getElementById("settings-modal").classList.add("hidden");
        }
    };
    
    xhr.send("status=" + status);
});
