// Restante do código omitido para brevidade

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
