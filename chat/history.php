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

$sql = "SELECT username, message FROM chat_history ORDER BY id ASC";
$result = $conn->query($sql);

$messages = array();
while($row = $result->fetch_assoc()) {
  $messages[] = $row;
}

echo json_encode($messages);

$conn->close();
?>
