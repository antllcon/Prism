import {PLAYER, PLAYER_STATES} from "./constants";
import {canvasHeight, canvasWidth, socket} from "../script";
console.log("hello from js/player/model")

export function drawPlayers() {
    socket.on('roomIsReady', (players) => {
        for (let index = 0; index < players.length; index++) {
            if (PLAYER.state === PLAYER_STATES.ACTIVE) {
                if (PLAYER.team === TEAM_STATES.PURPLE) {
                    PLAYER.color = green;
                }
                if (PLAYER.team === TEAM_STATES.YELLOW) {
                    PLAYER.color = red;
                }
                ctx.fillStyle = PLAYER.color;
                ctx.fillRect(PLAYER.x + index*50, PLAYER.y + index*50, PLAYER.size, PLAYER.size);
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
    })
}