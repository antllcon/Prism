import {DEFAULT_PLAYERS, ABILITY_SCALE_MAX, MAX_SPEED, PLAYER_STATES, ABILITY_DURATION} from "./const";
import {ctx, activePlayers, playersPositions} from "../../script";

export function handleInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {

        player.x += player.speed * dt * (-1);
        player.y += 0;
        player.direction = "left";

        player.progressBar.x = player.x;
        player.progressBar.y = player.y - 60;
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {


        player.x += player.speed * dt;
        player.y += 0;
        player.direction = "right";

        player.progressBar.x = player.x;
        player.progressBar.y = player.y - 60;
    }
    if (input.isDown('DOWN') || input.isDown('s')) {

        player.x += 0;
        player.y +=  player.speed * dt;

        player.direction = "down";

        player.progressBar.x = player.x;
        player.progressBar.y = player.y - 60;
    }
    if (input.isDown('UP') || input.isDown('w')) {

        player.x += 0;
        player.y += player.speed * dt * (-1);
        player.progressBar.x = player.x;
        player.progressBar.y = player.y - 60;
        player.direction = "up";

    }
    if (input.isDown('f') || input.isDown('F')) {
        if (player.abilityScale >= ABILITY_SCALE_MAX) {
            player.abilityActive = true;
            player.speed = MAX_SPEED;
            setTimeout(() => {
                player.abilityActive = false;
                player.speed = DEFAULT_PLAYERS.speed;
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
            ctx.fillRect(player.x, player.y, player.getSize(), player.getSize());

            if (player.load) {
                switch (player.direction) {
                    case "up":
                        player.image.src = "./src/assets/sprites/player/up.png";
                        break;
                    case "down":
                        player.image.src = "./src/assets/sprites/player/down.png";
                        break;
                    case "left":
                        player.image.src = "./src/assets/sprites/player/left.png";
                        break;
                    case "right":
                        player.image.src = "./src/assets/sprites/player/right.png";
                        break;
                }
                ctx.drawImage(
                    player.image,
                    player.count * spriteSize,
                    0,
                    spriteSize,
                    spriteSize,
                    player.x - (spriteSize / 2 - player.getSize() / 2),
                    player.y - (spriteSize / 2 - player.getSize() / 2),
                    spriteSize,
                    spriteSize
                );
                player.tick = (player.tick + 1);
                if (player.tick >= 2) {
                    player.count = (player.count + 1);
                    player.tick = (0);
                }
                if (player.count === endAnimation) {
                    player.count = (0);
                }
            }
        }

        if (player.state === PLAYER_STATES.DEAD) {
            setTimeout(() => {
               // player.setColor(green);
                player.x = (10);
                player.y = (10);
                player.state = PLAYER_STATES.ACTIVE;
            }, 1000);
        }
        if (
            player.state === PLAYER_STATES.STUNNED &&
            player.stunnedUntil < Date.now()
        ) {
            player.stunnedUntil = 0;
            player.speed = DEFAULT_PLAYERS.speed;

            if (player.state === PLAYER_STATES.DEAD || player.state === PLAYER_STATES.STUNNED) {
                player.state = PLAYER_STATES.ACTIVE;
            }
        }
            ctx.strokeStyle = player.progressBar.progressEmptyColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(player.progressBar.x, player.progressBar.y, player.progressBar.width, player.progressBar.height);

            ctx.fillStyle = player.progressBar.progressFillColor;
            ctx.fillRect(
                player.progressBar.x,
                player.progressBar.y,
                (player.progressBar.width * player.progressBar.progress) / ABILITY_SCALE_MAX,
                player.progressBar.height
            );
            if (player.state === PLAYER_STATES.STUNNED) {
                const remainingTime = player.stunnedUntil - Date.now();
                const seconds = Math.floor(remainingTime / 1000);
                const milliseconds = Math.floor((remainingTime % 1000) / 10);
                const countdownText = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.fillText(countdownText, player.x, player.y - 30);
            }
        }
    );
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
    for (let i = 0; i < playersPositions; i++) {
        activePlayers[i].x = (DEFAULT_PLAYERS.x[playersPositions[i]]);
        activePlayers[i].y = (DEFAULT_PLAYERS.y[playersPositions[i]]);
        activePlayers[i].progressBar.x = (activePlayers[i].x);
        activePlayers[i].progressBar.y = (activePlayers[i].y - 60);
        activePlayers[i].abilityScale = (0);
        activePlayers[i].progressBar.progress = (activePlayers[i].abilityScale);
        activePlayers[i].state = PLAYER_STATES.ACTIVE;
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
    playerFromServer.x ? player.x = (playerFromServer.x) : null;
    playerFromServer.y ? player.y = (playerFromServer.y) : null;
    playerFromServer.state ? player.state = (playerFromServer.state) : null;
}