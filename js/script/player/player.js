import {Player} from "./model";
import {DEFAULT_PLAYERS} from "./const";
import {ctx, activePlayers} from "../../script";

// export function handleInput(dt) {
//     if (input.isDown('LEFT') || input.isDown('a')) {
//         PLAYER.x -= PLAYER.speed * dt;
//     }
//     if (input.isDown('RIGHT') || input.isDown('d')) {
//         PLAYER.x += PLAYER.speed * dt;
//     }
//     if (input.isDown('DOWN') || input.isDown('s')) {
//         PLAYER.y += PLAYER.speed * dt;
//     }
//     if (input.isDown('UP') || input.isDown('w')) {
//         PLAYER.y -= PLAYER.speed * dt;
//     }
// }

export function handleInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.moveOn(player.getSpeed() * dt * (-1), 0)
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.moveOn(player.getSpeed() * dt, 0)
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.moveOn(0,player.getSpeed() * dt )
    }
    if (input.isDown('UP') || input.isDown('w')) {
        player.moveOn(0,player.getSpeed() * dt * (-1))
    }
}

export function drawPlayer(activePlayers) {
    activePlayers.forEach(player => {
        if (player.isAlive()) {
            ctx.fillStyle = player.getColor();
            ctx.fillRect(player.getX(), player.getY(), player.getSize(), player.getSize());
        }
        if (player.isDead()) {
            setTimeout(() => {
                player.setColor(green);
                player.setX(10);
                player.setY(10);
                player.renaissance();
            }, 1000); // Changed delay to 1000ms
        }
    })
}

export function createPlayers(clients, myId) {
    let createdPlayers = [];
    for (let i = 0; i < clients.length; i++) {
        createdPlayers[i] = new Player(i, clients[i], myId);
    }
    return createdPlayers
}

export function getMyPlayer(players) {
    const mainPlayer = players.find(player => player.main);
    return mainPlayer || {};
}

export function resetAllPlayers() {
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