import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    MAX_SPEED,
    DURATION_DISABILITY
} from "./const.mjs";

import {canvasHeight, canvasWidth} from "../game/const.mjs";
import {ProgressBar} from "./progressBar/progressBar.mjs";
import {BOT_STATES, DEFAULT_BOTS} from "../bot/const.mjs";
import {ctx} from "../../script.mjs";

export class Player {
    constructor(i, id, socket_id) {
        this.type = DEFAULT_PLAYERS.type;
        this.id = id;
        this.main = (socket_id === id);
        this.x = DEFAULT_PLAYERS.x[i];
        this.y = DEFAULT_PLAYERS.y[i];
        this.size = DEFAULT_PLAYERS.size;
        this.speed = DEFAULT_PLAYERS.speed;
        this.team = DEFAULT_PLAYERS.team[i];
        this.color = DEFAULT_PLAYERS.color[i];
        this.state = DEFAULT_PLAYERS.state;
        this.abilityScale = 0;
        this.abilityActive = false;
        this.progressBar = new ProgressBar(this);
        this.progressBar.render();
        this.stunnedUntil = 0;
        this.image = new Image();
        this.load = DEFAULT_PLAYERS.load;
        this.count = DEFAULT_PLAYERS.count;
        this.tick = DEFAULT_PLAYERS.tick;
        this.direction = DEFAULT_PLAYERS.direction;
    }

    getDirection() { return this.direction; }
    getType() { return this.type; }
    getId() {return this.id;}
    getX() {return this.x}
    getY() {return this.y;}
    getImage() { return this.image; }
    getLoad() { return this.load; }
    getSize() {return this.size;}
    getSpeed() {return this.speed;}
    getTeam() {return this.team;}
    getTick() { return this.tick; }
    getCount() { return this.count; }
    getColor() {return this.color;}
    // @ts-ignore
    getState() {return this.state;}
    getAbilityScale(){return this.abilityScale;}
    isMain() {return this.main}
    isAlive() {return this.state === PLAYER_STATES.ACTIVE;}
    isDead() {return this.state === PLAYER_STATES.DEAD;}
    isStunned()  {return this.state === PLAYER_STATES.STUNNED;}
    moveOn(x, y)  {
        this.x += x;
        this.y += y;
        this.progressBar.updatePosition(x, y);
    }
    die() {this.state = PLAYER_STATES.DEAD;}
    setColor(color) {this.color = color;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    setSpeed(speed) {this.speed = speed;}
    // @ts-ignore
    setState(state) {this.state = state;}
    setImage(image) { this.image.src = image; }
    setLoad(load) { this.load = load; }
    setCount(count) { this.count = count; }
    setTick(tick) { this.tick = tick; }
    setDirection(direction) { this.direction = direction; }
    renaissance() {
        this.state = PLAYER_STATES.ACTIVE;
    }
    renderPB() {this.progressBar.render();}
    setAbilityScale(value) {this.abilityScale = value;}
    updateAbilityScale(deltaTime) {
        this.abilityScale += ABILITY_SCALE_SPEED * deltaTime;
        this.progressBar.update(this.abilityScale);
        if (this.abilityScale >= ABILITY_SCALE_MAX) {
            this.abilityScale = ABILITY_SCALE_MAX;
        }
    }
    resetAbilityScale() {
        if (this.abilityScale >= ABILITY_SCALE_MAX) {
            this.activateAbility();
            this.abilityScale = 0;
            this.progressBar.update(this.abilityScale);
        }
    }
    activateAbility() {
        this.abilityActive = true;
        this.setSpeed(MAX_SPEED);
        setTimeout(() => {
            this.abilityActive = false;
            this.setSpeed(DEFAULT_PLAYERS.speed);
        }, ABILITY_DURATION);
    }
    makeStunned() {
        this.stunnedUntil = Date.now() + DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(PLAYER_STATES.STUNNED);
    }
    recoverFromStunned() {
        this.stunnedUntil = 0;
        this.setSpeed(DEFAULT_PLAYERS.speed);

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

    setInvisibleLasers(state) {
        this.invisibleLasers = state;
    }

    isInvisibleLasers() {
        return this.invisibleLasers;
    }
}