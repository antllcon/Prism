import { BOT_STATES, DEFAULT_BOTS, DURATION_DISABILITY } from './const';
import { ctx } from '../../script.mjs';

export class Bot {
    constructor(i) {
        this.type = DEFAULT_BOTS.type;
        this.x = DEFAULT_BOTS.x[i];
        this.y = DEFAULT_BOTS.y[i];
        this.size = DEFAULT_BOTS.size;
        this.speed = DEFAULT_BOTS.speed;
        this.team = DEFAULT_BOTS.team[i];
        this.color = DEFAULT_BOTS.color[i];
        this.state = DEFAULT_BOTS.state;
        this.stunnedUntil = 0;
        this.name = 'Bot';
        this.image = new Image();
        this.load = DEFAULT_BOTS.load;
        this.count = DEFAULT_BOTS.count;
        this.tick = DEFAULT_BOTS.tick;
        this.direction = DEFAULT_BOTS.direction;
    }
    getName() {return (this.name = 'Bot');}
    getType() {return this.type;}
    getX() {return this.x;}
    getY() {return this.y;}
    getSize() {return this.size;}
    getSpeed() {return this.speed;}
    getTeam() {return this.team;}
    getColor() {return this.color;}
    getState() {return this.state;}
    getImage() {return this.image;}
    getLoad() {return this.load;}
    getCount() {return this.count;}
    getTick() {return this.tick;}
    getDirection() {return this.direction;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    setTeam(team) {
        this.team = team;
    }

    setColor(color) {
        this.color = color;
    }

    setState(state) {
        this.state = state;
    }

    setImage(image) {
        this.image.src = image;
    }

    setLoad(load) {
        this.load = load;
    }

    setCount(count) {
        this.count = count;
    }

    setTick(tick) {
        this.tick = tick;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    // Методы
    isAlive() {
        return this.state === BOT_STATES.ACTIVE;
    }
    isStunned() {
        return this.state === BOT_STATES.STUNNED;
    }
    isDead() {
        return this.state === BOT_STATES.DEAD;
    }

    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }

    die() {
        this.state = BOT_STATES.DEAD;
    }

    renaissance() {
        this.state = BOT_STATES.ACTIVE;
    }
    makeStunned() {
        this.stunnedUntil = Date.now() + DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(BOT_STATES.STUNNED);
    }
    setSpeed(value) {
        this.speed = value;
    }

    recoverFromStunned() {
        this.stunnedUntil = 0;
        this.setSpeed(DEFAULT_BOTS.speed);

        if (this.isDead() || this.isStunned()) {
            this.renaissance();
        }
    }

    drawCountdown() {
        if (this.isStunned()) {
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