import {DEFAULT_PLAYERS, ABILITY_SCALE_MAX, MAX_SPEED} from "./const";
import {ctx, activePlayers} from "../../script";

export function handleInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {
        //player.moveOn(player.speed * dt * (-1), 0);
        player.x += player.speed * dt * (-1);
        player.y += 0;
        //player.progressBar.updatePosition(player.speed * dt * (-1), 0);
        //updatePosition - is not a function
        player.progressBar.updatePosition(player.speed * dt * (-1), 0);
        player.direction = "left";
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        //player.moveOn(player.speed * dt, 0);

        player.x += player.speed * dt;
        player.y += 0;


        player.direction = "right";
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        //player.moveOn(0, player.speed * dt);

        player.x += 0;
        player.y +=  player.speed * dt;
        player.progressBar.updatePosition(0, player.speed * dt);

        player.direction = "down";
    }
    if (input.isDown('UP') || input.isDown('w')) {
        //player.moveOn(0, player.speed * dt * (-1));

        player.x += 0;
        player.y += player.speed * dt * (-1);
        player.progressBar.updatePosition(0, player.speed * dt * (-1));

        player.direction = "up";
    }
    if (input.isDown('f') || input.isDown('F')) {
        if (player.abilityScale >= ABILITY_SCALE_MAX) {
            player.abilityActive = true;
            player.speed = MAX_SPEED;
            setTimeout(() => {
                player.abilityActive = false;
                player.setSpeed = DEFAULT_PLAYERS.speed;
            }, ABILITY_DURATION);
            player.abilityScale = 0;
            //вот это надо изменить
            player.progressBar.progress = player.abilityScale;
        }
    }
}

export function initPlayerAnimation() {
    activePlayers.forEach(player => {
        if (player.image == null) {
            player.image = new Image();
        }
        player.image.src = "./src/assets/sprites/player/right.png";
        player.image.onload = () => {
            player.load = true;
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



export function setPlayerWithIdAsMain(id) {
    activePlayers.forEach(player => {
        if (player.id === id) {
            player.main = true;
        }    
    });
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
        if (player.id === socketId) {
            foundPlayer = player;
        }
    });
    return foundPlayer;
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

function updatePlayer(player, playerFromServer) {
    playerFromServer.getX() ? player.setX(playerFromServer.getX()) : null;
    playerFromServer.getY() ? player.setY(playerFromServer.getY()) : null;
    playerFromServer.getState() ? player.setState(playerFromServer.getState()) : null;
}