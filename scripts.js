document.getElementById('login-form').addEventListener('submit', function(event) {
    // Impedir o envio normal do formulário
    event.preventDefault();

    // Obter os dados do formulário
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Enviar a solicitação AJAX
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login bem sucedido, redirecionar para /chat
            window.location.href = './chat';
        } else {
            // Login falhou, exibir mensagem de erro
            document.getElementById('error-message').textContent = data.message;
            document.getElementById('error-message').style.color = 'red';
        }
    });
});
