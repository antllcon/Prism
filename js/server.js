const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

const RECONNECT_TIMEOUT = 60 * 1000; // 60 секунд
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
            rooms[roomId] = { clients: {
                sockets: [],
                users: [],
                lastSeen: Date.now(),
                ready: 0
            }, messages: []};
            console.log('Room created with id: ', roomId);
            joinRoomSocket(roomId, socket);
            joinRoomUser(roomId, socket);
        }
    });

    socket.on('joinRoom', (roomId) => {
        joinRoomSocket(roomId, socket);
        joinRoomUser(roomId, socket);
    });

    socket.on('leaveRoom', () => {
        let roomId = findRoomBySocketId(socket.id);
        leaveRoom(roomId, socket);
    });

    // socket.on('sendDataToServer', (transPlayer) => {
    //     //внутри data находятся данные о плеере текущего клиента
    //     let roomId = findRoomBySocketId(socket.id);
    //     players.forEach(player => {
    //         if (player.id === transPlayer.id) {
    //             updatePlayer(player, transPlayer);
    //             socket.to(rooms[roomId]).emit('dataFromServer', player);
    //         }
    //     });
    // });

    socket.on('requestOnDataFromServer', () => {
        socket.emit('dataFromServer', players);
    })

    socket.on('disconnect', () => {
        let roomId = findRoomBySocketId(socket.id)
        if (roomId) {
            rooms[roomId].clients.lastSeen = Date.now();
            leaveRoom(roomId, socket);
        }
    })

    socket.on('playerIsReady', () => {
        let roomId  = findRoomBySocketId(socket.id);
        rooms[roomId].clients.ready++;
        console.log(rooms[roomId].clients.ready, 'ready');
        console.log(rooms[roomId].clients.sockets, 'sockets');
        if (rooms[roomId].clients.ready === rooms[roomId].clients.sockets.length)
        {
            io.in(roomId).emit('roomIsReady')
        }
    })

    socket.on('requestForClients', () => {
        console.log('requestForClients вызван')
        // roomId пустой
        // при это сокет айди есть
        // rooms пустой
        let roomId = findRoomByUserId(socket.handshake.query.userId);
        if (rooms[roomId]) {
            console.log(rooms[roomId].clients.sockets, 'sent sockets');
            socket.emit('sendClients', rooms[roomId].clients.sockets)
        }
    })

    socket.on('redirected', () => {
        console.log('произошел redirect');
        const userId = socket.handshake.query.userId;
        const roomId = findRoomByUserId(userId);
        if (rooms[roomId]) {
            rooms[roomId].clients.sockets.push(socket.id);
            socket.join(roomId);
        }
    })

    socket.on('reconnect', () => {
        console.log('произошел reconnect');
        const userId = socket.handshake.query.userId;
        const roomId = findRoomByUserId(userId);
        const lastSeen = rooms[roomId].clients.lastSeen;
        if (rooms[roomId] && lastSeen) {
            // Проверяем, был ли клиент в комнате и прошло ли достаточно времени
            if (Date.now() - lastSeen < RECONNECT_TIMEOUT) {
                rooms[roomId].clients.sockets.push(socket.id);
                // Очищаем отметку о временном отсутствии
                delete rooms[roomId].clients.lastSeen;
                socket.join(roomId);
            }
        }
    });
    socket.on('pageRefreshed', () => {
        console.log('произошел refresh');
        const userId = socket.handshake.query.userId;
        const roomId = findRoomByUserId(userId);
        if (rooms[roomId]) {
            const lastSeen = rooms[roomId].clients.lastSeen;
            if (lastSeen) {
                // Проверяем, был ли клиент в комнате и прошло ли достаточно времени
                if (Date.now() - lastSeen < RECONNECT_TIMEOUT) {
                    rooms[roomId].clients.sockets.push(socket.id);
                    // Очищаем отметку о временном отсутствии
                    delete rooms[roomId].clients.lastSeen;
                    socket.join(roomId);
                }
            }
        }
    });
});

// function updatePlayer(player, transPlayer) {
//     player.x = transPlayer.x;
//     player.y = transPlayer.y;
//     player.team = transPlayer.team;
//     player.color = transPlayer.color;
//     player.state = transPlayer.state;
// }

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
        rooms[roomId].clients.sockets = rooms[roomId].clients.sockets.filter(clientId => clientId !== socket.id);
        socket.leave(roomId);
        console.log(socket.id, ' left the room with id: ', roomId);
        broadcastRoomUpdate(roomId);
    }
}

function findRoomBySocketId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        if (rooms[roomId].clients.sockets.includes(id)) {
            foundId = roomId;
        }
    });
    if (foundId) {
        return foundId;
    } else {
        return false;
    }
}
function findRoomByUserId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        if (rooms[roomId].clients.users.includes(id)) {
            foundId = roomId;
        }
    });
    if (foundId) {
        return foundId;
    } else {
        return false;
    }
}
function joinRoomSocket(roomId, socket) {
    if (rooms[roomId]) {
        rooms[roomId].clients.sockets.push(socket.id);
        socket.join(roomId.toString());
        socket.emit('joinedRoom', roomId);
        console.log(socket.id, ' joined the room ', roomId);
        broadcastRoomUpdate(roomId);
    } else {
        socket.emit('wrongId');
    }
}
function joinRoomUser(roomId, socket) {
    if (rooms[roomId]) {
        const userId = socket.handshake.query.userId; // Получаем userId из handshake
        if (!rooms[roomId].clients.users.includes(userId)){
            rooms[roomId].clients.users.push(userId);
        }
    }
}