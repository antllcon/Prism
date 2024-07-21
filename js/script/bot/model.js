import {BOT_STATES, DEFAULT_BOTS, DURATION_DISABILITY} from "./const";
import {yellow, TEAM_STATES} from "../game/const";
import {ctx} from "../../script";

export class Bot {
    constructor(i)  {
        this.x = DEFAULT_BOTS.x[i];
        this.y = DEFAULT_BOTS.y[i];
        this.size = DEFAULT_BOTS.size;
        this.speed = DEFAULT_BOTS.speed;
        this.team = DEFAULT_BOTS.team[i];
        this.color = DEFAULT_BOTS.color[i];
        this.state = DEFAULT_BOTS.state;
        this.stunnedUntil = 0;
        this.name = "Bot"
    }
    getName(){return this.name = "Bot"}
    getX() {return this.x;}
    getY() {return this.y;}
    getSize() {return this.size;}
    getSpeed(){return this.speed;}
    getTeam() {return this.team;}
    getColor() {return this.color;}
    getState() {return this.state;}
    isAlive() { return this.state === BOT_STATES.ACTIVE}
    isStunned(){ return this.state === BOT_STATES.STUNNED}
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
    makeStunned() {
        this.stunnedUntil = Date.now() + DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(BOT_STATES.STUNNED);
    }
    setSpeed(value){
        this.speed = value;
    }

    recoverFromStunned() {
        this.stunnedUntil = 0;
        this.setSpeed(DEFAULT_BOTS.speed);

        if (this.isDead()) {
            this.renaissance();
        } else {
            this.setState(BOT_STATES.ACTIVE);
        }
    }

    drawCountdown() {
        console.log('drawCountdown')
        if (this.isStunned()) {
            console.log('drawCountdown 2');
            const remainingTime = this.stunnedUntil - Date.now();
            const seconds = Math.floor(remainingTime / 1000);
            const milliseconds = Math.floor((remainingTime % 1000) / 10);
            const countdownText = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(countdownText, this.x, this.y - 30);
        }
    }
}