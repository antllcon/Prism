import {Player} from "./model";
import {DEFAULT_PLAYERS} from "./const";
import {ctx, activePlayers} from "../../script";
import {GREEN} from "./const";

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
    if (input.isDown('f') || (input.isDown('F')))
    {
        player.resetAbilityScale();
    }
}

export function drawPlayer(activePlayers) {
    const mainPlayer = getMyPlayer(activePlayers)
    activePlayers.forEach(player => {
        if (player.isAlive()) {
            ctx.fillStyle = player.getColor();
            ctx.fillRect(player.getX(), player.getY(), player.getSize(), player.getSize());
        }
        if (player.isDead()) {
            setTimeout(() => {
                player.setColor(GREEN);
                player.setX(10);
                player.setY(10);
                player.renaissance();
            }, 1000); // Changed delay to 1000ms
        }
        if (player.getId() === mainPlayer.getId())
        {
            player.renderPB()
        }
    })

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
        activePlayers[i].progressBar.x = activePlayers[i].getX();
        activePlayers[i].progressBar.y = activePlayers[i].getY() - 60;
        activePlayers[i].renaissance();
    }
}