import {PLAYER_STATES, PLAYER} from "./constants";

export class Player {
    constructor(i) {
        this.x = PLAYER.x[i];
        this.y = PLAYER.y[i];
        this.size = PLAYER.size;
        this.speed = PLAYER.speed;
        this.team = PLAYER.team[i];
        this.color = PLAYER.color[i];
        this.state = PLAYER.state;
    }

    createPlayer() {
        return new Player();
    }
    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }
    die() {
        this.state = PLAYER_STATES.DEAD;
    }
    setColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}