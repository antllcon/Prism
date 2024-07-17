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
    players.push(socket.id);
    if (players.length === 2) {
        socket.emit('roomIsReady', players)
    }

    socket.on('createRoom', () => {
        roomId = generateRoomId();
        // Проверка id на уникальность сравнением со списком ids !!!!!!!! РЕАЛИЗОВАТЬ
        if (!rooms[roomId]) {
            rooms[roomId] = { clients: [], messages: [] };
            console.log('Room created with id: ', roomId);
            joinRoom(roomId, socket);
            // socket.emit('roomCreated');
        }
    });

    socket.on('joinRoom', (roomId) => {
        joinRoom(roomId, socket);
    });

    socket.on('leaveRoom', () => {
        roomId = findRoomBySocketId(socket.id);
        console.log(roomId, 'on leaveRoom');
        leaveRoom(roomId, socket);
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
        // players = players.filter((player) =>
        //     player.id !== socket.id
        // );
        let roomId = findRoomBySocketId(socket.id)
        if (roomId) {
            leaveRoom(roomId, socket);
        }
    })
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

function generateRoomId() {
    // Создаем строку из 6 цифр
    let uniqueId = Math.random().toString().slice(-6);
    // Преобразуем строку в число
    uniqueId = parseInt(uniqueId);
    // Возвращаем уникальное число
    return uniqueId;
}

function leaveRoom(roomId, socket) {
    if (rooms[roomId]) {
        rooms[roomId].clients = rooms[roomId].clients.filter(clientId => clientId !== socket.id);
        socket.leave(roomId); // Leave the room in Socket.IO
        console.log('Left the room with id: ', roomId);
        broadcastRoomUpdate(roomId);
    }
}

function findRoomBySocketId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        if (rooms[roomId].clients.includes(id)) {
            foundId = roomId;
        }
    });
    if (foundId) {
        return foundId;
    } else {
        return false;
    }
}
function joinRoom(roomId, socket) {
    if (rooms[roomId]) {
        rooms[roomId].clients.push(socket.id);
        socket.join(roomId); // Join the room in Socket.IO
        socket.emit('joinedRoom', roomId);
        console.log('Joined to room with id: ', roomId);
        broadcastRoomUpdate(roomId);
    } else {
        socket.emit('wrongId');
    }
}