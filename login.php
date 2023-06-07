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

// Verificar se o formulário de login foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Preparar a consulta SQL para evitar injeção SQL
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    // Obter o resultado da consulta
    $result = $stmt->get_result();

    // Verificar se o usuário existe
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verificar a senha
        if (password_verify($password, $user['password'])) {
            // A senha está correta. Iniciar a sessão.
            $_SESSION['loggedin'] = true;
            $_SESSION['userid'] = $user['id'];
            $_SESSION['email'] = $email;

            // Redirecionar para a página inicial
            header("location: index.php");
        } else {
            // A senha está incorreta. Mostrar uma mensagem de erro.
            echo "Senha incorreta!";
        }
    } else {
        // O usuário não existe. Mostrar uma mensagem de erro.
        echo "Usuário não encontrado!";
    }

    // Fechar a consulta
    $stmt->close();
}

// Fechar a conexão
$conn->close();
?>
