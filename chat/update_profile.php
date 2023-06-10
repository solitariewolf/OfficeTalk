<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "talk";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

if (isset($_SESSION['userid'])) {
    $userId = $_SESSION['userid'];

    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $username = isset($_POST['username']) ? $_POST['username'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    if ($email || $username || $password) {
        $query = "UPDATE users SET ";
        $params = array();
        $types = '';

        if ($email) {
            $query .= "email = ?, ";
            $params[] = $email;
            $types .= "s";
        }

        if ($username) {
            $query .= "user = ?, ";
            $params[] = $username;
            $types .= "s";
        }

        if ($password) {
            $query .= "password = ?, ";
            $params[] = password_hash($password, PASSWORD_DEFAULT);
            $types .= "s";
        }

        // Remove a última vírgula e espaço
        $query = rtrim($query, ", ") . " WHERE id = ?";
        $params[] = $userId;
        $types .= "i";

        $stmt = $conn->prepare($query);
        $stmt->bind_param($types, ...$params);
        $stmt->execute();

        echo json_encode(array("success" => true, "message" => "Perfil atualizado com sucesso!"));
    } else {
        echo json_encode(array("success" => false, "message" => "Pelo menos um campo deve ser preenchido!"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Usuário não logado!"));
}

$conn->close();
?>
