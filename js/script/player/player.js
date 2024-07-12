import {PLAYER, Player} from "./model";
import {PLAYER_STATES} from "./const";
import {purple, yellow, TEAM_STATES} from "../game/const";
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
        console.log(dt, "dt undefined")
        player.moveOn(0,player.getSpeed() * dt * (-1))
    }
}

export function drawPlayer() {
    if (PLAYER.state === PLAYER_STATES.ACTIVE) {
        if (PLAYER.team === TEAM_STATES.PURPLE) {
            PLAYER.color = purple;
        }
        if (PLAYER.team === TEAM_STATES.YELLOW) {
            PLAYER.color = yellow;
        }
        ctx.fillStyle = PLAYER.color;
        ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
    }
    if (PLAYER.state === PLAYER_STATES.DEAD) {
        setTimeout(() => {
            PLAYER.color = purple;
            PLAYER.x = 10;
            PLAYER.y = 10;
            PLAYER.state = PLAYER_STATES.ACTIVE;
        }, 1000);
    }
}

export function drawPlayerEntity(activePlayers) {
    activePlayers.forEach(player => {
        if (player.isAlive()) {
            ctx.fillStyle = player.getColor;
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

// в разработке...
export function drawPlayers() {
    //socket.on('roomIsReady', (players) => {
        for (let i = 0; i < players.length; i++) {
            if (PLAYER.state === PLAYER_STATES.ACTIVE) {
                if (PLAYER.team[i] === TEAM_STATES.PURPLE) {
                    PLAYER.color = purple;
                }
                if (PLAYER.team[i] === TEAM_STATES.YELLOW) {
                    PLAYER.color = yellow;
                }
                ctx.fillStyle = PLAYER.color[i];
                ctx.fillRect(PLAYER.x + i * 50, PLAYER.y + i * 50, PLAYER.size, PLAYER.size);
            }
            if (PLAYER.state === PLAYER_STATES.DEAD) {
                setTimeout(() => {
                    PLAYER.color = purple;
                    PLAYER.x = 10;
                    PLAYER.y = 10;
                    PLAYER.state = PLAYER_STATES.ACTIVE;
                }, 1000);
            }
        }
    //})
}

export function createPlayers(players, myId) {
    let activePlayers = [];
    for (let i = 0; i < players.length; i++) {
        activePlayers[i] = new Player(i, players[i], myId);
    }
    return activePlayers
}

export function getMyPlayer(players) {
    const mainPlayer = players.find(player => player.main);
    return mainPlayer || {};
}