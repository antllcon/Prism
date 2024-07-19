import {Player} from "./model";
import {DEFAULT_PLAYERS} from "./const";
import {ctx, activePlayers} from "../../script";

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
}

export function initPlayerAnimation() {
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

    activePlayers.forEach(player => {
        if (player.isAlive()) {
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
                player.setX(10);
                player.setY(10);
                player.renaissance();
            }, 1000);
        }
    });
}

export function createPlayers(players, myId) {
    let createdPlayers = [];
    for (let i = 0; i < players.length; i++) {
        createdPlayers[i] = new Player(i, players[i], myId);
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