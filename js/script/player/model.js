import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION, MAX_SPEED
} from "./const";
import {canvasHeight, canvasWidth} from "../game/const";
import {ProgressBar} from "./progressBar";


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
        this.abilityScale = 0;
        this.abilityActive = false;
        this.progressBar = new ProgressBar(this);
        this.progressBar.render();
    }

    getId() { return this.id;}
    getX() { return this.x;}
    getY() { return this.y;}
    getSize() { return this.size;}
    getSpeed(){ return this.speed;}
    getTeam() { return this.team; }
    getColor() { return this.color;}
    getState() { return this.state;}
    isAlive() { return this.state === PLAYER_STATES.ACTIVE}
    isDead() { return this.state === PLAYER_STATES.DEAD }
    moveOn(x, y) {
        this.x += x;
        this.y += y;
        this.progressBar.updatePosition(x, y)
    }
    die() { this.state = PLAYER_STATES.DEAD;}
    setColor(color) { this.color = color;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    setSpeed(speed){this.speed = speed}
    renaissance() {this.state = PLAYER_STATES.ACTIVE}
    renderPB() {this.progressBar.render();}

     updateAbilityScale(deltaTime) {
        this.abilityScale += ABILITY_SCALE_SPEED * deltaTime;
        this.progressBar.update(this.abilityScale)
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
        console.log('ability activated')
        console.log(this.abilityActive, 'activateAbility')
        this.abilityActive = true;
        this.setSpeed(MAX_SPEED);
       setTimeout(() => {
            this.abilityActive = false;
            this.setSpeed(DEFAULT_PLAYERS.speed);
        }, ABILITY_DURATION );
    }
}

