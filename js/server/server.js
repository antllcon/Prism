const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);


const Client = require('./client.js');
const Player = require('./player.js');
const RECONNECT_TIMEOUT = 60 * 1000; // 60 секунд
const staticDistPath = path.resolve(path.dirname(__dirname), '../dist');
app.use(express.static(staticDistPath));

app.get('/', (req, res) => {
    const distPath = path.resolve(path.dirname(__dirname), '../dist/index.html');
    res.sendFile(distPath);
});

let rooms = {};
let players = [];


io.on('connection', (socket) => {
    socket.on('createRoom', () => {
        let roomId = generateId();
        // Проверка id на уникальность сравнением со списком ids !!!!!!!! РЕАЛИЗОВАТЬ
        if (!rooms[roomId]) {
            rooms[roomId] = [];
            console.log('Room created with id: ', roomId);
            joinRoom(roomId, socket);
        }
    });

    socket.on('joinRoom', (roomId) => {
        joinRoom(parseInt(roomId), socket);
    });

    socket.on('leaveRoom', () => {
        const roomId = findRoomBySocketId(socket.id);
        leaveRoom(roomId, socket);
    });

    

    // socket.on('requestOnDataFromServer', () => {
    //     socket.emit('dataFromServer', players);
    // })

    socket.on('disconnect', () => {
        console.log('произошел disconnect');
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            let roomId = findRoomByUserId(socket.id);
            const client = findClientByUserId(roomId, userId);
            client.setSocketId(socket.id);
            if (roomId) {
                client.setLastSeen(Date.now());
                leaveRoom(roomId, socket);
            }
        })
        // УДАЛЕНИЕ КЛИЕНТА ИЗ КОМНАТЫ. 
        // roomId = findRoomBySocketId(socket.id);
        // if (rooms[roomId]) {
        //     for (const client of rooms[roomId]) {
        //         // Используем filter для создания нового массива без элементов, равных 2
        //         const clients = rooms[roomId].filter((client) => client.getSocketId() !==  socket.id);
        //         rooms[roomId] = clients;
        //     }
        //     console.log(rooms[roomId], 'room');
        // }
        
    })

    socket.on('playerIsReady', () => {
        const roomId  = findRoomBySocketId(socket.id);
        const client = findClientBySocketId(roomId, socket.id);
        client.setReady();
        let amountReadyClients = 0;
        rooms[roomId].forEach(client => {
            if (client.getReady()) {
                amountReadyClients++;
            }
        })
        if (amountReadyClients === rooms[roomId].length) {
            io.to(parseInt(roomId)).emit('roomIsReady')
        }
    })

    socket.on('requestForClients', () => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            let clientsSockets = []
            clientsSockets = getAllSocketsFromRoom(roomId);
            socket.emit('sendClients', clientsSockets)
        }
    })

    socket.on('redirected', () => {
        console.log('произошел redirect');
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            const roomId = findRoomByUserId(userId);
            const client = findClientByUserId(roomId, userId);
            if (client) {
                client.setSocketId(socket.id);
            }
            joinBack(socket);
        })
    })

    socket.on('reconnect', () => {
        console.log('произошел reconnect');
        // const userId = getUserIdFromCookie(socket);
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            const roomId = findRoomBySocketId(socket.id);
            rooms[roomId].push(new Client(socket.id, userId));
            const client = findClientByUserId(roomId, userId);
            // client.setSocketId(socket.id);
            const lastSeen = client.getLastSeen();
            if (rooms[roomId] && lastSeen) {
                // Проверяем, был ли клиент в комнате и прошло ли достаточно времени
                if (Date.now() - lastSeen < RECONNECT_TIMEOUT) {
                    client.setSocketId(socket.id);
                    socket.join(roomId);
                }
            }
        })
    });

    socket.on('pageRefreshed', () => {
        console.log('произошел refresh');
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            const roomId = findRoomByUserId(userId);
            // rooms[roomId].push(new Client(socket.id, userId));
            console.log(rooms[roomId], 'rooms[roomId] refresh');
            const client = findClientByUserId(roomId, userId);
            client.setSocketId(socket.id);
            joinBack(socket);
        })
    });

    socket.on('sendDataToServer', (transPlayer) => {
        const roomId = findRoomBySocketId(socket.id);
        players.forEach(player => {
            if (player.id === transPlayer.id) {
                updatePlayer(player, transPlayer);
                socket.to(roomId).emit('dataFromServer', players);
            }
        });
    });
});

function updatePlayer(player, transPlayer) {
    player.x = transPlayer.x;
    player.y = transPlayer.y;
    player.team = transPlayer.team;
    player.color = transPlayer.color;
    player.state = transPlayer.state;
}

// function broadcastRoomUpdate(roomId) {
//     io.to(roomId).emit('roomUpdate', rooms[roomId]);
// }

// Запуск сервера

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



function generateId() {
    let uniqueId = Math.random().toString().slice(-6);
    uniqueId = parseInt(uniqueId);
    return uniqueId;
}

// Получение

function findRoomBySocketId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        rooms[roomId].forEach(client => {
            if (id === client.getSocketId()) {
                foundId = roomId;
            }
        })
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
        rooms[roomId].forEach(client => {
            if (id === client.getUserId()) {
                foundId = roomId;
            }
        })
    });
    if (foundId) {
        return foundId;
    } else {
        return false;
    }
}
function getUserIdFromCookie(socket) {
    socket.emit('requestForCookie');
    socket.on('sentCookie', (cookieValue) => {
        // Создаем сессию для пользователя
        const result = cookieValue;
        console.log(result, 'cookieValue');
        return result;
    })
}
function findClientByUserId(roomId, userId) {
    let foundClient = null;
    if (rooms[roomId]) {
        rooms[roomId].forEach(client => {
        if (userId == client.getUserId()) {
            foundClient =  client;
        } 
        })
    }
    return foundClient;
}
function findClientBySocketId(roomId, socketId) {
    let foundClient = null;
    if (rooms[roomId]) {
        rooms[roomId].forEach(client => {
            if (socketId == client.getSocketId()) {
                foundClient =  client;
            } 
        })
    }
    return foundClient;
}
function getAllSocketsFromRoom(roomId) {
    let sockets = [];
    rooms[roomId].forEach(client => {
        sockets.push(client.getSocketId())
    })
    return sockets;
}
function saveSocketIdIntoClient(roomId, userId) {
    const client = findClientByUserId(roomId, userId);
    client.setSocketId(socket.id);
}



function joinRoom(roomId, socket) {
    socket.emit('requestForCookie');
    socket.on('sentCookie', (userId) => {
        if (rooms[roomId]) {
            rooms[roomId].push(new Client(socket.id, userId));
            socket.join(parseInt(roomId));
            socket.emit('joinedRoom', roomId);
            console.log(socket.id, ' joined the room ', roomId);
            // broadcastRoomUpdate(roomId);
        } else {
            socket.emit('wrongId');
        }
    })
    
}
function leaveRoom(roomId, socket) {
    if (rooms[roomId]) {
        socket.leave(roomId);
        console.log(socket.id, ' left the room with id: ', roomId);
        // broadcastRoomUpdate(roomId);
    }
}
function joinBack(socket) {
    const roomId = findRoomBySocketId(socket.id);
    if (rooms[roomId]) {
        socket.join(roomId);
    }
}
