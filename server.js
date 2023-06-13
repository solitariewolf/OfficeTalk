const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mysql = require('mysql');

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talk'
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados');
});

// Configurando a pasta de arquivos estáticos
app.use(express.static('public'));

// Carregando o histórico de mensagens quando o servidor inicia
let chatHistory = [];

db.query('SELECT * FROM chat_history ORDER BY timestamp ASC', (err, results) => {
    if (err) throw err;
    chatHistory = results;
});

// Configurando o socket.io para escutar eventos de conexão
io.on('connection', (socket) => {
    console.log('Usuário conectado');

    // Enviar o histórico de chat para o cliente
    socket.emit('chat history', chatHistory);

    // Escutar eventos de mensagens enviadas
    socket.on('chat message', (msg) => {
        // Enviar a mensagem para todos os clientes conectados
        io.emit('chat message', msg);

        // Inserir a mensagem no banco de dados
        const { username, message } = msg;
        const query = 'INSERT INTO chat_history (username, message) VALUES (?, ?)';
        db.query(query, [username, message], (err) => {
            if (err) throw err;
        });

        // Adicionar mensagem ao histórico de chat na memória
        chatHistory.push(msg);
    });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
