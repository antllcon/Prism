import {Player} from "./model";
import {DEFAULT_PLAYERS} from "./const";
import {activePlayers, requiredPlayers} from "../../script";

export function handleInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.moveOn(player.getSpeed() * dt * (-1), 0);
        player.setDirection("left");
        player.moveOn(player.getSpeed() * dt * (-1), 0);
        player.setDirection("left");
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.moveOn(player.getSpeed() * dt, 0);
        player.setDirection("right");
        player.moveOn(player.getSpeed() * dt, 0);
        player.setDirection("right");
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.moveOn(0, player.getSpeed() * dt);
        player.setDirection("down");
        player.moveOn(0, player.getSpeed() * dt);
        player.setDirection("down");
    }
    if (input.isDown('UP') || input.isDown('w')) {
        player.moveOn(0, player.getSpeed() * dt * (-1));
        player.setDirection("up");
        player.moveOn(0, player.getSpeed() * dt * (-1));
        player.setDirection("up");
    }
}

export function initPlayerAnimation() {

    activePlayers.forEach(player => {
        player.setImage("./src/assets/sprites/player/right.png");
        player.getImage().onload = () => {
            player.setLoad(true);
        };
    });
}

// export function createPlayers(clients, myId) {
//     let createdPlayers = [];
//     for (let i = 0; i < clients.length; i++) {
//         createdPlayers[i] = new Player(i, clients[i], myId);
//     }
//     return createdPlayers;
// }

export function createPlayers() {
    //в requiredBots передается массив с позициями(placeId), на которых надо создать ботов
    let createdPlayers = [];
    let i = 0;
    requiredPlayers.forEach(placeId => {
        createdPlayers[i] = new Player(placeId);
        i++;
    });
    return createdPlayers;
}

export function getMyPlayer(players) {
    const mainPlayer = players.find(player => player.main);
    return mainPlayer || {};
}

export function resetPlayers() {
    for (let i = 0; i < activePlayers.length; i++) {
        activePlayers[i].setX(DEFAULT_PLAYERS.x[i]);
        activePlayers[i].setY(DEFAULT_PLAYERS.y[i]);
        activePlayers[i].renaissance();
    }
}

export function findPlayerBySocketId(socketId) {
    let foundPlayer;
    activePlayers.forEach(player => {
        if (player.getId() === socketId) {
            foundPlayer = player;
        }
    });
    return foundPlayer;
}

export function updatePlayer(player, playerFromServer) {
    playerFromServer.x ? player.setX(playerFromServer.x) : null;
    playerFromServer.y ? player.setY(playerFromServer.y) : null;
    playerFromServer.team ? player.setTeam(playerFromServer.team) : null;
    playerFromServer.color ? player.setColor(playerFromServer.color) : null;
    playerFromServer.state ? player.setState(playerFromServer.state) : null;
}