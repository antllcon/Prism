const Player = require("./model.js");
const PlayerConsts = require("./const.js");

class PlayerFunctions {
    createPlayers(playersPositions) {
        let createdPlayers = [];
        playersPositions.forEach(position => {
            createdPlayers.push(new Player(position.position, position.socketId))
        });
        return createdPlayers
    }
    
    getMyPlayer(players) {
        const mainPlayer = players.find((player) => player.main);
        return mainPlayer || {};
    }
    
    resetAllPlayers(players) {
        players.forEach((player) => {
            player.x = (PlayerConsts.DEFAULT_PLAYERS.x[player.position]);
            player.y = (PlayerConsts.DEFAULT_PLAYERS.y[player.position]);
            player.progressBar.x = (player.x);
            player.progressBar.y = (player.y - 60);
            player.abilityScale = 0;
            player.progressBar.progress = 0;
            player.state = PlayerConsts.PLAYER_STATES.ACTIVE;
        })
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