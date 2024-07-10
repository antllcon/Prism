// const express = require("express");
// const http = require("http");
// const path = require("path");
// const socketIO = require("socket.io");
// const getPlayers = require("./player").getPlayers;

// const app = express();
// const server = http.Server(app);
// const io = socketIO(server);

// app.set("port", 5000);
// app.use("/dist/src", express.static(path.dirname(__dirname) + "/dist/src"));
// app.use("/socket.io", express.static(path.join(__dirname, "node_modules", "socket.io", "client")));

// app.get("/", (request, response) => {
//     response.sendFile(path.join(__dirname) + "/dist", 'index.html');
// });

// server.listen(5000, () => {
//     console.log("Server started on port 5000");
// });

// let players = null;
// io.on('connection', (socket) => {
//     players = getPlayers(socket);
//     setTimeout(() => {
//         console.log(players);
//     }, 1000)
// });


const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

// Маршрут для статического контента (например, HTML-страницы)
app.use(express.static(path.dirname(__dirname) + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.dirname(__dirname) + '/dist/index.html');
});

// Обработчик подключения клиента к сокету
io.on('connection', (socket) => {
    console.log('Client connected0000:', socket.id);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
