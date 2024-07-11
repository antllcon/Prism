import {PLAYER} from "./model";
import {PLAYER_STATES} from "./const";
import {green, red, TEAM_STATES} from "../game/const";
import {ctx} from "../game/model";

export function drawPlayer() {
    if (PLAYER.state === PLAYER_STATES.ACTIVE) {
        if (PLAYER.team === TEAM_STATES.PURPLE) {
            PLAYER.color = green;
        }
        if (PLAYER.team === TEAM_STATES.YELLOW) {
            PLAYER.color = red;
        }
        ctx.fillStyle = PLAYER.color;
        ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
    }
    if (PLAYER.state === PLAYER_STATES.DEAD) {
        setTimeout(() => {
            PLAYER.color = green;
            PLAYER.x = 10;
            PLAYER.y = 10;
            PLAYER.state = PLAYER_STATES.ACTIVE;
        }, 1000);
    }
}

export function drawPlayers() {
    //socket.on('roomIsReady', (players) => {
        for (let i = 0; i < players.length; i++) {
            if (PLAYER.state === PLAYER_STATES.ACTIVE) {
                if (PLAYER.team[i] === TEAM_STATES.PURPLE) {
                    PLAYER.color = green;
                }
                if (PLAYER.team[i] === TEAM_STATES.YELLOW) {
                    PLAYER.color = red;
                }
                ctx.fillStyle = PLAYER.color[i];
                ctx.fillRect(PLAYER.x + i * 50, PLAYER.y + i * 50, PLAYER.size, PLAYER.size);
            }
            if (PLAYER.state === PLAYER_STATES.DEAD) {
                setTimeout(() => {
                    PLAYER.color = green;
                    PLAYER.x = 10;
                    PLAYER.y = 10;
                    PLAYER.state = PLAYER_STATES.ACTIVE;
                }, 1000);
            }
        }
    //})
}