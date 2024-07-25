const BotFunctions = require('./bot/bot.js');
const botFunctions = new BotFunctions;
const PlayerFunctions = require('./player/player.js');
const playerFunctions = new PlayerFunctions;
const createBonuses = require('./bonuses/bonusFunctions.js')

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

const POSITIONS = [0, 1, 2, 3]

const Client = require('./client.js');
const Bot = require("./bot/model");

const RECONNECT_TIMEOUT = 60 * 1000; // 60 секунд
const staticDistPath = path.resolve(path.dirname(__dirname), '../dist');
app.use(express.static(staticDistPath));

app.get('/', (req, res) => {
    const distPath = path.resolve(path.dirname(__dirname), '../dist/index.html');
    res.sendFile(distPath);
});

let rooms = {};

io.on('connection', (socket) => {
    socket.on('createRoom', () => {
        let roomId = generateId();
        // Проверка id на уникальность сравнением со списком ids !!!!!!!! РЕАЛИЗОВАТЬ
        if (!rooms[roomId]) {
            rooms[roomId] = {
                clients: [],
                players: [],
                bonuses: [],
                bots: [],
                removedClients: []
            };
            console.log('Room created with id: ', roomId);
            joinRoom(roomId, socket);
            rooms[roomId].bonuses = createBonuses();
        }
    });

    socket.on('joinRoom', (roomId) => {
        joinRoom(parseInt(roomId), socket);
    });

    socket.on('leaveRoom', () => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            leaveRoom(roomId, socket);
            const positionsArray = getPositionsArray(roomId);
            io.to(parseInt(roomId)).emit('updateLobby', positionsArray);
        }
    });

    socket.on('changeLobbyPosition', (position) => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            rooms[roomId].clients.forEach((client) => {
                if (client.socketId === socket.id) {
                    client.position = position;
                }
            })
            const positionsArray = getPositionsArray(roomId);
            io.to(parseInt(roomId)).emit('updateLobby', positionsArray);
        }
    })
    socket.on('addBotOnPosition', (position) => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            rooms[roomId].bots.push(new Bot(position));
            const positionsArray= getPositionsArray(roomId);
            io.to(parseInt(roomId)).emit('updateLobby', positionsArray);
        }
    })
    socket.on('removeBotFromPosition', (position) => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            rooms[roomId].bots = rooms[roomId].bots.filter((bot) => bot.position !== position);
            const positionsArray= getPositionsArray(roomId);
            io.to(parseInt(roomId)).emit('updateLobby', positionsArray);
        }
    })

    socket.on('disconnect', () => {
        console.log('произошел disconnect');
        let roomId = findRoomBySocketId(socket.id);
        const client = findClientBySocketId(roomId, socket.id)
        if (rooms[roomId]) {
            client.setLastSeen(Date.now());
            leaveRoom(roomId, socket);
        }
    })

    socket.on('playerIsReady', () => {
        const roomId  = findRoomBySocketId(socket.id);
        const client = findClientBySocketId(roomId, socket.id);
        if (!client.getIsReady()) {
            client.setReady();
        } else {
            client.setNotReady();
        }
        let amountReadyClients = 0;
        rooms[roomId].clients.forEach(client => {
            if (client.getIsReady()) {
                amountReadyClients++;
            }
        })
        if (amountReadyClients === rooms[roomId].clients.length) {
            io.to(parseInt(roomId)).emit('roomIsReady')
        }
    })

    socket.on('requestForPlayers', () => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            const client = findClientBySocketId(roomId, socket.id);
            client.setNeedForPlayer();
            let playersPositions = getPlayersPositions(roomId);
            rooms[roomId].players = playerFunctions.createPlayers(playersPositions);
            clientsSockets = getAllSocketsFromRoom(roomId);
            const areAllNeedForPlayer = findOutAreAllNeedForPlayer(roomId, clientsSockets.length);
            if (areAllNeedForPlayer) {
                io.to(parseInt(roomId)).emit('sendPlayers', rooms[roomId].players)
            }
        }
    })
    
    socket.on('requestForBots', () => {
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            const client = findClientBySocketId(roomId, socket.id);
            client.setNeedForBot();
            let botsPositions = []
            botsPositions = getBotsPositions(roomId);
            const clientsSockets = getAllSocketsFromRoom;
            const areAllNeedForBot = findOutAreAllNeedForBot(roomId, clientsSockets.length);
            if (areAllNeedForBot) {
                rooms[roomId].bots = botFunctions.createBots(botsPositions);
                io.to(parseInt(roomId)).emit('sendBots', rooms[roomId].bots);
            }
        }
    })

    socket.on('requestForBonuses', () => {
        console.log("requestForBonuses")
        const roomId = findRoomBySocketId(socket.id);
        if (rooms[roomId]) {
            const client = findClientBySocketId(roomId, socket.id);
            client.setNeedForPlayer();//?
           // rooms[roomId].bonuses = playerFunctions.createPlayers(clientsSockets);
            /*rooms[roomId].bonuses = createBonuses();*/
            socket.emit("sendBonuses", rooms[roomId].bonuses);
        }
    })



    socket.on('redirected', () => {
        console.log('произошел redirect');
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            console.log(userId, 'userId');
            const roomId = findRoomByUserId(userId);
            const client = findClientByUserIdFromRemoved(roomId, userId);
            if (client) {
                client.setSocketId(socket.id);
                if (rooms[roomId]) {
                    rooms[roomId].clients.push(client);
                }
            }
            console.log(roomId);
            console.log('roomId');
            socket.join(roomId);
            // console.log(socket);
        })
    })

    socket.on('reconnect', () => {
        console.log('произошел reconnect');
        // const userId = getUserIdFromCookie(socket);
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            const roomId = findRoomByUserId(userId);
            rooms[roomId].clients.push(new Client(socket.id, userId));
            const client = findClientByUserIdFromRemoved(roomId, userId);
            // client.setSocketId(socket.id);
            const lastSeen = client.getLastSeen();
            if (rooms[roomId].clients && lastSeen) {
                // Проверяем, был ли клиент в комнате и прошло ли достаточно времени
                if (Date.now() - lastSeen < RECONNECT_TIMEOUT) {
                    client.setSocketId(socket.id);
                    socket.join(parseInt(roomId));
                }
            }
        })
    });

    socket.on('pageRefreshed', () => {
        console.log('произошел refresh');
        socket.emit('requestForCookie');
        socket.on('sentCookie', (userId) => {
            console.log(rooms[roomId], 'rooms[roomId] refresh');
            const roomId = findRoomByUserId(userId);
            const client = findClientByUserIdFromRemoved(roomId, userId);
            if (client) {
                client.setSocketId(socket.id);
                if (rooms[roomId]) {
                    rooms[roomId].clients.push(client);
                }
            }
            socket.join(parseInt(roomId));
        })
    });

    socket.on('sendDataToServer', (data) => {
        const roomId = findRoomBySocketId(socket.id);
        const playerFromClient = data.player;
        if (rooms[roomId]) {
            rooms[roomId].players.forEach(player => {
                if (player.getId() === playerFromClient.id) {
                    playerFunctions.updatePlayer(player, playerFromClient);
                }
            });
        }
        if (rooms[roomId]) {
            botFunctions.botMovement(data.dt, rooms[roomId].bots, data.points, data.bonuses);
        }
        let dataFromServer = {
            bots: [],
            players: []
        };
        if (rooms[roomId]) {
            dataFromServer.bots = rooms[roomId].bots;
            dataFromServer.players = rooms[roomId].players;
        }

        io.to(parseInt(roomId)).emit('dataFromServer', dataFromServer);
    });

    socket.on('updateEntityParams', (entity) => {

        const roomId = findRoomBySocketId(socket.id)
        if (entity.type === 'bot') {
            rooms[roomId].bots.forEach((bot) => {
                if (entity.id === bot.id) {
                    bot.x = entity.x;
                    bot.y = entity.y;
                    bot.state = entity.state;
                    bot.stunnedUntil = entity.stunnedUntil;
                    bot.speed = entity.speed;
                    bot.invisibleLasers = entity.invisibleLasers;
                }
            })
        }

        if (entity.type === 'player') {
            rooms[roomId].players.forEach((player) => {
                if (entity.id === player.id) {
                    player.x = entity.x;
                    player.y = entity.y;
                    player.state = entity.state;
                    player.stunnedUntil = entity.stunnedUntil;
                    player.speed = entity.speed;
                    player.invisibleLasers = entity.invisibleLasers;
                }
            })
        }
    })

    socket.on('resetPlayers', () => {
        console.log('ПОЛУЧИЛИ РЕСЕТ');
        const roomId = findRoomBySocketId(socket.id);
        playerFunctions.resetAllPlayers(rooms[roomId].players);
        console.log(rooms[roomId].players, 'players');
        socket.emit('playersReset', rooms[roomId].players);
    })

/*    socket.on('resetBots', () => {
        console.log('ПОЛУЧИЛИ РЕСЕТ');
        const roomId = findRoomBySocketId(socket.id);
        botFunctions.resetAllBots(requiredBots, rooms[roomId].bots);
        console.log(rooms[roomId].bots, 'bots');
        socket.emit('botsReset', rooms[roomId].bots);
      })*/

});

// function updatePlayer(player, transPlayer) {
//     player.x = transPlayer.x;
//     player.y = transPlayer.y;
//     player.team = transPlayer.team;
//     player.color = transPlayer.color;
//     player.state = transPlayer.state;
// }

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
        rooms[roomId].clients.forEach(client => {
            if (id === client.getSocketId()) {
                foundId = roomId;
            }
        })
    });
    if (foundId) {
        return foundId;
    }
    return false;
}
function findRoomByUserId(id) {
    let foundId;
    Object.keys(rooms).forEach(roomId => {
        rooms[roomId].removedClients.forEach(client => {
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
function findClientByUserIdFromRemoved(roomId, userId) {
    let foundClient = null;
    if (rooms[roomId]) {
        rooms[roomId].removedClients.forEach(client => {
            if (userId == client.getUserId()) {
                foundClient = client;
            } 
        })
    }
    return foundClient;
}
function findClientBySocketId(roomId, socketId) {
    let foundClient = null;
    if (rooms[roomId]) {
        rooms[roomId].clients.forEach(client => {
            if (socketId === client.getSocketId()) {
                foundClient =  client;
            } 
        })
    }
    return foundClient;
}
function getAllSocketsFromRoom(roomId) {
    let sockets = [];
    rooms[roomId].clients.forEach(client => {
        sockets.push(client.getSocketId())
    })
    return sockets;
}
function saveSocketIdIntoClient(roomId, userId) {
    const client = findClientByUserIdFromRemoved(roomId, userId);
    client.setSocketId(socket.id);
}
function findOutAreAllNeedForPlayer(roomId, length) {
    let amount = 0;
    rooms[roomId].clients.forEach(client => {
        if (client.neadForPlayer()) {
            amount++;
        }
    });
    return amount === length;
}
function findOutAreAllNeedForBot(roomId, length) {
    let amount = 0;
    rooms[roomId].clients.forEach(client => {
        if (client.neadForBot()) {
            amount++;
        }
    });
    return amount === length;
}
function clientPositionInit(roomId, myClient) {
    if (rooms[roomId]) {
        let availablePositions = POSITIONS;
        rooms[roomId].clients.forEach((client) => {
            availablePositions = availablePositions.filter((number) => number !== client.position);
        })
        const myPosition = Math.min(...availablePositions);
        myClient.position = myPosition;
    }
}
function getPositionsArray(roomId) {
    let positionsArray = [];
    if (rooms[roomId]) {
        rooms[roomId].clients.forEach((client) => {
            positionsArray.push({
                position: client.position,
                socketId: client.socketId
            });
        })
        rooms[roomId].bots.forEach((bot) => {
            positionsArray.push({
                position: bot.position,
                socketId: 'bot'
            });
        })
    }
    return positionsArray;
}


function joinRoom(roomId, socket) {
    socket.emit('requestForCookie');
    socket.on('sentCookie', (userId) => {
        console.log(userId, 'userId');
        if (rooms[roomId].clients) {
            const client = new Client(socket.id, userId);
            rooms[roomId].clients.push(client);
            socket.join(parseInt(roomId));
            clientPositionInit(roomId, client);
            const positionsArray= getPositionsArray(roomId);
            socket.emit('joinedRoom', roomId);
            console.log('user with sicket.id: ', socket.id, ' joined room: ', roomId);
            io.to(parseInt(roomId)).emit('updateLobby', positionsArray);
        } else {
            socket.emit('wrongId');
        }
    });
}
function leaveRoom(roomId, socket) {
    const client = findClientBySocketId(roomId, socket.id);
    socket.leave(roomId);
    rooms[roomId].removedClients.push(client);
    rooms[roomId].clients = rooms[roomId].clients.filter((client) => client.socketId !== socket.id);
    console.log(socket.id, ' left the room with id: ', roomId);
}
function getPlayersPositions(roomId) {
    let playersPositions = [];
    if (rooms[roomId]) {
        rooms[roomId].clients.forEach((client) => {
            playersPositions.push({
                position: client.position,
                socketId: client.socketId
            });
        })
    }
    return playersPositions;
}
function getBotsPositions(roomId) {
    let botsPositions = [];
    if (rooms[roomId]) {
        rooms[roomId].bots.forEach((bot) => {
            botsPositions.push(bot.position);
        })
    }
    return botsPositions;
}
