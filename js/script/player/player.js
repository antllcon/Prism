import {Player} from "./model";
import {DEFAULT_PLAYERS} from "./const";
import {activePlayers} from "../../script";

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
        }
    })
}

export async function initPlayerAnimation() {
    const promises = activePlayers.map(player => {
        return new Promise((resolve) => {
            player.setImage("./src/assets/sprites/player/right.png");
            player.getImage().onload = () => {
                player.setLoad(true);
                resolve();
            };
        });
    });
    await Promise.all(promises);
}//
// export function drawPlayer(activePlayers) {
//     const spriteSize = 64;
//     const endAnimation = 9;
//
//     activePlayers.forEach(player => {
//
//         if (player.isDead()) {
//             setTimeout(() => {
//                 player.setX(10);
//                 player.setY(10);
//                 player.renaissance();
//             }, 1000);
//         }
//     });
// }

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