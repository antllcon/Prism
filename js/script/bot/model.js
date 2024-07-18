import {BOT_STATES, DEFAULT_BOTS} from "./const";
import {yellow, TEAM_STATES} from "../game/const";

export class Bot {
    constructor(i)  {
        this.x = DEFAULT_BOTS.x[i];
        this.y = DEFAULT_BOTS.y[i];
        this.size = DEFAULT_BOTS.size;
        this.speed = DEFAULT_BOTS.speed;
        this.team = DEFAULT_BOTS.team[i];
        this.color = DEFAULT_BOTS.color[i];
        this.state = DEFAULT_BOTS.state;
    }
    getX() {return this.x;}
    getY() {return this.y;}
    getSize() {return this.size;}
    getSpeed(){return this.speed;}
    getTeam() {return this.team;}
    getColor() {return this.color;}
    getState() {return this.state;}
    isAlive() { return this.state === BOT_STATES.ACTIVE}
    isDead() {return this.state === BOT_STATES.DEAD}
    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }
    die() {this.state = BOT_STATES.DEAD;}
    setColor(color) {this.color = color;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    renaissance() {this.state = BOT_STATES.ACTIVE}
    setState(state) {this.state = state}
}