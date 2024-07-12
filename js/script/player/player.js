import {PLAYER} from "./model";
import {PLAYER_STATES} from "./const";
import {purple, yellow, TEAM_STATES} from "../game/const";
import {ctx} from "../../script";

export function handleInput(dt) {
    if (input.isDown('LEFT') || input.isDown('a')) {
        PLAYER.x -= PLAYER.speed * dt;
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        PLAYER.x += PLAYER.speed * dt;
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        PLAYER.y += PLAYER.speed * dt;
    }
    if (input.isDown('UP') || input.isDown('w')) {
        PLAYER.y -= PLAYER.speed * dt;
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