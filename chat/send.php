<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "talk";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$message = $_POST['message'];
$username = $_SESSION['username'];

$sql = "INSERT INTO chat_history (username, message) VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $message);

$stmt->execute();

$stmt->close();
$conn->close();
?>
