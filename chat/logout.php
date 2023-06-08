<?php
// Dados de conexão com o banco de dados
$servername = "localhost";  // Endereço do servidor
$username = "root";        // Nome de usuário do MySQL
$password = "";            // Senha do MySQL
$database = "talk";       // Nome do banco de dados

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $database);

// Verifica se a conexão foi bem sucedida
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Iniciar a sessão
session_start();

// Verificar se o usuário está logado
if ($_SESSION['loggedin']) {
    // Atualizar o status do usuário para "offline"
    $userId = $_SESSION['userid'];
    $updateStmt = $conn->prepare("UPDATE users SET status = 'offline' WHERE id = ?");
    $updateStmt->bind_param("i", $userId);
    $updateStmt->execute();

    // Destruir a sessão
    session_destroy();

    // Retornar uma resposta JSON de sucesso
    echo json_encode(array("success" => true));
} else {
    // Usuário não está logado
    echo json_encode(array("success" => false, "message" => "Usuário não autenticado!"));
}

// Fechar a conexão
$conn->close();
?>
