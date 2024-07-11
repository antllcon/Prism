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

let players = [];
// Обработчик подключения клиента к сокету
io.on('connection', (socket) => {

    socket.on('createRoom', (RoomId) => {

    })
    players.push(getPlayer(socket));
    setTimeout(() => {
        console.log(players);
    }, 1000)

    socket.on('disconnect', () => {
        playersModified = players.filter((player) =>
            player.id !== socket.id
        );
        setTimeout(() => {
            console.log(playersModified);
        }, 1000)
        players = playersModified;
    })

    if (players.length === 2) {
        socket.emit('roomIsReady', players);
    }
});


// Запуск сервера
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function getPlayer(socket) {
    const player = {id: socket.id};
    return player;
}
