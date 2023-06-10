<?php
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

// Get the page number from the URL, or default to 1 if no page number is given
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// Calculate the SQL offset
$offset = ($page - 1) * 30;

$sql = "SELECT username, message FROM chat_history ORDER BY id DESC LIMIT 30 OFFSET ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $offset);
$stmt->execute();

$result = $stmt->get_result();

$messages = array();
while($row = $result->fetch_assoc()) {
  $messages[] = $row;
}

echo json_encode($messages);

$conn->close();
?>
