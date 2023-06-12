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

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $status = $_POST['status'];
    $userid = $_SESSION['userid'];

    $stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $userid);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }

    $stmt->close();
}
$conn->close();
?>
