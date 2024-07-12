import {PLAYER_STATES} from "./const";
import {canvasHeight, canvasWidth} from "../game/const";

export const DEFAULT_PLAYERS = {
    x: [50, 50, canvasWidth-50, canvasWidth-50],
    y: [canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 10,
    speed: 300,
    team: ['purple', 'purple', 'yellow', 'yellow'],
    color: ['purple', 'purple', 'yellow', 'yellow'],
    state: PLAYER_STATES.ACTIVE
}
export class Player {
    constructor(i, id, socket_id)  {
        this.id = id;
        this.main = (socket_id === id);
        this.x = DEFAULT_PLAYERS.x[i];
        this.y = DEFAULT_PLAYERS.y[i];
        this.size = DEFAULT_PLAYERS.size;
        this.speed = DEFAULT_PLAYERS.speed;
        this.team = DEFAULT_PLAYERS.team[i];
        this.color = DEFAULT_PLAYERS.color[i];
        this.state = DEFAULT_PLAYERS.state;
    }

    getId() {
        return this.id;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getSize() {
        return this.size;
    }
    getSpeed(){
        return this.speed;
    }
    getTeam() {
        return this.team;
    }
    getColor() {
        return this.color;
    }
    getState() {
        return this.state;
    }
    isAlive() {
        return this.state === PLAYER_STATES.ACTIVE
    }
    isDead() {
        return this.state === PLAYER_STATES.DEAD
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
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    renaissance() {
        this.state = PLAYER_STATES.ACTIVE
    }
}

