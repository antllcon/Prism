const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);


//нам нужно иметь на стороне сервера
// сущность с такими полями:
// команда, увет, координаты, состояния (живой мертвый)

// Маршрут для статического контента (например, HTML-страницы)
app.use(express.static(path.dirname(__dirname) + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.dirname(__dirname) + '/dist/index.html');
});
let rooms = {};
let players = [];

// socket.id по каким-то причинам не существует на беке

// Обработчик подключения клиента к сокету
io.on('connection', (socket) => {
    console.log(socket.id, "socket id")
    players.push(socket.id);
    if (players.length === 2) {
        socket.emit('roomIsReady', players)
    }

    socket.on('createRoom', (roomId) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { clients: [], messages: [] };
            socket.emit('roomCreated', roomId);
            console.log('Room created');
        }
    });

    socket.on('joinRoom', (roomId) => {
        if (!rooms[roomId]) {
            rooms[roomId].clients.push(socket.id);
            socket.join(roomId); // Join the room in Socket.IO
            socket.emit('joinedRoom', roomId);
            console.log('Joined to room');
            broadcastRoomUpdate(roomId);
            if (rooms[roomId].clients.length === 2) {
                socket.emit('roomIsReady', rooms[roomId].clients)
            }
        }
    });

    socket.on('leaveRoom', (roomId) => {
        if (rooms[roomId]) {
            rooms[roomId].clients = rooms[roomId].clients.filter(clientId => clientId !== socket.id);
            socket.leave(roomId); // Leave the room in Socket.IO
            console.log('Left the room');
            broadcastRoomUpdate(roomId);
        }
    });

    socket.on('sendDataToServer', (transPlayer) => {
        //внутри data находятся данные о плеере текущего клиента
        players.forEach(player => {
            if (player.id === transPlayer.id) {
                updatePlayer(player, transPlayer);
                socket.to(rooms[roomId]).emit('dataFromServer', player);
            }
        });
    });

    socket.on('requestOnDataFromServer', () => {
        socket.emit('dataFromServer', players);
    })

    socket.on('disconnect', () => {
        players = players.filter((player) =>
            player.id !== socket.id
        );
    })

    if (players.length === 2) {
        socket.emit('roomIsReady', players);
    }
});

function updatePlayer(player, transPlayer) {
    player.x = transPlayer.x;
    player.y = transPlayer.y;
    player.team = transPlayer.team;
    player.color = transPlayer.color;
    player.state = transPlayer.state;
}

function broadcastRoomUpdate(roomId) {
    io.to(roomId).emit('roomUpdate', rooms[roomId]);
}

// Запуск сервера
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
