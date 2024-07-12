import {PLAYER_STATES} from "./const";
import {canvasHeight, canvasWidth} from "../game/const";

export const PLAYER = {
    x: [50, 50, canvasWidth-50, canvasWidth-50],
    y: [canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 10,
    speed: 300,
    team: ['purple', 'yellow', 'purple', 'yellow'],
    color: ['purple', 'yellow', 'purple', 'yellow'],
    state: PLAYER_STATES.ACTIVE
}
export class Player {
    constructor(i, id, socket_id)  {
        this.id = id;
        this.main = (socket_id === id);
        this.x = PLAYER.x[i];
        this.y = PLAYER.y[i];
        this.size = PLAYER.size;
        this.speed = PLAYER.speed;
        this.team = PLAYER.team[i];
        this.color = PLAYER.color[i];
        this.state = PLAYER.state;
    }

    getSize(){
        return this.size
    }

    getTeam(){
        return this.team
    }

    isAlive(){
        return this.state === PLAYER_STATES.ACTIVE
    }

    isDead(){
        return this.state === PLAYER_STATES.DEAD
    }

    createPlayer() {
        return new Player();
    }
    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }

    getSpeed(){
        return this.speed
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
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    renaissance(){
        this.state = PLAYER_STATES.ACTIVE
    }

}

export function getMyPlayer(players){
    const mainPlayer = players.find(player => player.main);
    return mainPlayer || {};
}