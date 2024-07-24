const Player = require("./model.js");
const PlayerConsts = require("./const.js");

class PlayerFunctions {
    createPlayers(clients) {
        let createdPlayers = [];
        for (let i = 0; i < clients.length; i++) {
            createdPlayers[i] = new Player(i, clients[i]);
        }
        return createdPlayers
    }
    
    getMyPlayer(players) {
        const mainPlayer = players.find((player) => player.main);
        return mainPlayer || {};
    }
    
    resetAllPlayers(activePlayers) {
        for (let i = 0; i < activePlayers.length; i++) {
            activePlayers[i].setX(PlayerConsts.DEFAULT_PLAYERS.x[i]);
            activePlayers[i].setY(PlayerConsts.DEFAULT_PLAYERS.y[i]);
            activePlayers[i].progressBar.setX(activePlayers[i].getX());
            activePlayers[i].progressBar.setY(activePlayers[i].getY() - 60);
            activePlayers[i].setAbilityScale(0);
            activePlayers[i].progressBar.update(activePlayers[i].getAbilityScale());
            activePlayers[i].renaissance();
        }
    }
    
    findPlayerBySocketId(activePlayers, socketId) {
        let foundPlayer;
        activePlayers.forEach(player => {
            if (player.getId() === socketId) {
                foundPlayer = player;
            }
        });
        return foundPlayer;
    }
    updatePlayers(players, socketId) {
        players.forEach(playerFromServer => {
            if (playerFromServer.id !== socketId) {
                const player = findPlayerBySocketId(playerFromServer.id);
                if (player) {
                    updatePlayer(player, playerFromServer);
                }
                
            }
        });
    }
    
    updatePlayer(player, playerFromServer) {
        playerFromServer.x ? player.setX(playerFromServer.x) : null;
        playerFromServer.y ? player.setY(playerFromServer.y) : null;
        playerFromServer.state ? player.setState(playerFromServer.state) : null;
    }
}

module.exports = PlayerFunctions;