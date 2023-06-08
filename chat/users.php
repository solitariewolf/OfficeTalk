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

// Consulta SQL para obter a lista de usuários e seus status
$sql = "SELECT user, status FROM users";
$result = $conn->query($sql);

// Verificar se há resultados
if ($result->num_rows > 0) {
    // Iterar sobre os resultados e criar a lista de usuários
    while ($row = $result->fetch_assoc()) {
        $user = $row['user'];
        $status = $row['status'];
        
        // Determinar a classe CSS com base no status
        $statusClass = '';
        if ($status === 'online') {
            $statusClass = 'status-online';
        } elseif ($status === 'ausente') {
            $statusClass = 'status-ausente';
        } elseif ($status === 'offline') {
            $statusClass = 'status-offline';
        }
        
        // Exibir o usuário com a classe CSS correspondente
        echo "<li class=\"$statusClass\">$user</li>";
    }
} else {
    // Não há usuários encontrados
    echo "<li>Nenhum usuário encontrado</li>";
}

// Fechar a conexão com o banco de dados
$conn->close();
?>
