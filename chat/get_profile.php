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

    $stmt = $conn->prepare("SELECT email, user FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(array("success" => true, "email" => $user['email'], "username" => $user['user']));
    } else {
        echo json_encode(array("success" => false, "message" => "Usuário não encontrado!"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Usuário não logado!"));
}

$conn->close();
?>
