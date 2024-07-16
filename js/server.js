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
    socket.on('createRoom', () => {
        let roomId = generateRoomId();
        // Проверка id на уникальность сравнением со списком ids !!!!!!!! РЕАЛИЗОВАТЬ
        if (!rooms[roomId]) {
            // readyClients
            rooms[roomId] = { clients: [], messages: [], readyClients: 0 };
            console.log('Room created with id: ', roomId);
            joinRoom(roomId, socket);
        }
    });

    socket.on('joinRoom', (roomId) => {
        joinRoom(roomId, socket);
    });

    socket.on('leaveRoom', () => {
        let roomId = findRoomBySocketId(socket.id);
        leaveRoom(roomId, socket);
    });

    socket.on('sendDataToServer', (transPlayer) => {
        //внутри data находятся данные о плеере текущего клиента
        let roomId = findRoomBySocketId(socket.id);
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

    // socket.on('disconnect', () => {
    //     let roomId = findRoomBySocketId(socket.id)
    //     if (roomId) {
    //         leaveRoom(roomId, socket);
    //     }
    // })

    socket.on('playerIsReady', () => {
        let roomId  = findRoomBySocketId(socket.id);
        console.log(roomId, 'друг в беде не бросит')
        rooms[roomId].readyClients++;

        if (rooms[roomId].readyClients === rooms[roomId].clients.length)
        {
            io.in(roomId).emit('roomIsReady')
        }
    })

    socket.on('requestForClients', () => {
        console.log('requestForClients вызван')
        // roomId пустой
        // при это сокет айди есть
        // rooms пустой
        let roomId = findRoomBySocketId(socket.id);
        console.log(roomId, 'неприятность эту мы переживем')
        socket.emit('sendClients', rooms[roomId].clients)
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
    let uniqueId = Math.random().toString().slice(-6);
    uniqueId = parseInt(uniqueId);
    return uniqueId;
}

function leaveRoom(roomId, socket) {
    if (rooms[roomId]) {
        rooms[roomId].clients = rooms[roomId].clients.filter(clientId => clientId !== socket.id);
        socket.leave(roomId);
        console.log(socket.id, ' left the room with id: ', roomId);
        broadcastRoomUpdate(roomId);
    }
}

function findRoomBySocketId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        console.log(rooms[roomId].clients, 'rooms[roomId].clients');
        console.log(id, 'socket.id');
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
        socket.join(roomId.toString());
        socket.emit('joinedRoom', roomId);
        console.log(socket.id, ' joined the room ', roomId);
        broadcastRoomUpdate(roomId);
    } else {
        socket.emit('wrongId');
    }
}