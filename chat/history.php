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

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = 30; // Define the limit of messages to load

$sql = "SELECT username, message, timestamp FROM chat_history ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";
$result = $conn->query($sql);

$messages = array();
while ($row = $result->fetch_assoc()) {
    $row['timestamp'] = date("c", strtotime($row['timestamp']));
    $messages[] = $row;
}

echo json_encode($messages);

$conn->close();
?>
