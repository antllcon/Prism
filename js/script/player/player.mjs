import {Player} from "./model.ts";
import {DEFAULT_PLAYERS} from "./const.mjs";
import {ctx, activePlayers} from "../../script.mjs";

export function handleInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.moveOn(player.getSpeed() * dt * (-1), 0);
        player.setDirection("left");
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.moveOn(player.getSpeed() * dt, 0);
        player.setDirection("right");
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.moveOn(0, player.getSpeed() * dt);
        player.setDirection("down");
    }
    if (input.isDown('UP') || input.isDown('w')) {
        player.moveOn(0, player.getSpeed() * dt * (-1));
        player.setDirection("up");
    }
    if (input.isDown('f') || input.isDown('F')) {
        player.resetAbilityScale();
    }
}

export function initPlayerAnimation() {
   /* console.log(activePlayers)*/
    activePlayers.forEach(player => {
        player.setImage("./src/assets/sprites/player/right.png");
        player.getImage().onload = () => {
            player.setLoad(true);
        }
    })
}

export function drawPlayer(activePlayers) {
    const spriteSize = 64;
    const endAnimation = 9;
    const mainPlayer = getMyPlayer(activePlayers);
    activePlayers.forEach(player => {
        if (player.isAlive()|| player.isStunned()) {
            ctx.fillStyle = player.getColor();
            ctx.fillRect(player.getX(), player.getY(), player.getSize(), player.getSize());

            if (player.getLoad()) {
                switch (player.getDirection()) {
                    case "up":
                        player.setImage("./src/assets/sprites/player/up.png");
                        break;
                    case "down":
                        player.setImage("./src/assets/sprites/player/down.png");
                        break;
                    case "left":
                        player.setImage("./src/assets/sprites/player/left.png");
                        break;
                    case "right":
                        player.setImage("./src/assets/sprites/player/right.png");
                        break;
                }
                ctx.drawImage(
                    player.getImage(),
                    player.getCount() * spriteSize,
                    0,
                    spriteSize,
                    spriteSize,
                    player.getX() - (spriteSize / 2 - player.getSize() / 2),
                    player.getY() - (spriteSize / 2 - player.getSize() / 2),
                    spriteSize,
                    spriteSize
                );
                player.setTick(player.getTick() + 1);
                if (player.getTick() >= 2) {
                    player.setCount(player.getCount() + 1);
                    player.setTick(0);
                }
                if (player.getCount() === endAnimation) {
                    player.setCount(0);
                }
            }
        }

        if (player.isDead()) {
            setTimeout(() => {
               // player.setColor(green);
                player.setX(10);
                player.setY(10);
                player.renaissance();
            }, 1000);
        }
        if (
            player.getState() === PLAYER_STATES.STUNNED &&
            player.stunnedUntil < Date.now()
        ) {
            player.recoverFromStunned();
        }
        if (player.getId() === mainPlayer.getId()) {
            player.renderPB();
            if (player.isStunned()) {
                player.drawCountdown();
            }
        }
    });
}

export function createPlayers(clients, myId) {
    let createdPlayers = [];
    for (let i = 0; i < clients.length; i++) {
        createdPlayers[i] = new Player(i, clients[i]);
    }
    return createdPlayers
}
export function setPlayerWithIdAsMain(id) {
    const player = findPlayerBySocketId(id);
    player.setMain(true);
}

export function getMyPlayer(players) {
    const mainPlayer = players.find((player) => player.main);
    return mainPlayer || {};
}

export function resetAllPlayers() {
    for (let i = 0; i < activePlayers.length; i++) {
        activePlayers[i].setX(DEFAULT_PLAYERS.x[i]);
        activePlayers[i].setY(DEFAULT_PLAYERS.y[i]);
        activePlayers[i].progressBar.setX(activePlayers[i].getX());
        activePlayers[i].progressBar.setY(activePlayers[i].getY() - 60);
        activePlayers[i].setAbilityScale(0);
        activePlayers[i].progressBar.update(activePlayers[i].getAbilityScale());
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
function updatePlayer(player, playerFromServer) {
    playerFromServer.getX() ? player.setX(playerFromServer.getX()) : null;
    playerFromServer.getY() ? player.setY(playerFromServer.getY()) : null;
    playerFromServer.getState() ? player.setState(playerFromServer.getState()) : null;
}
export function updatePlayers(players, socketId) {
    players.forEach(playerFromServer => {
        if (playerFromServer.id !== socketId) {
            const player = findPlayerBySocketId(playerFromServer.id);
            if (player) {
                updatePlayer(player, playerFromServer);
            }
        }
    });
}