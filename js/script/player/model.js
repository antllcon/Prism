import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    ABILITY_SPEED_MULTIPLAYER
} from "./const";
import {canvasHeight, canvasWidth} from "../game/const";


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



    updateAbilityScale(deltaTime) {
        console.log("we are in update ability scale");
        this.abilityScale += ABILITY_SCALE_SPEED * deltaTime;

        if (this.abilityScale >= ABILITY_SCALE_MAX) {
            this.activateAbility();
            console.log("we are in update ability scale activated");
            //this.abilityScale = 0;
        }
    }

    activateAbility() {
        this.abilityActive = true;
        setTimeout(() => {
            this.abilityActive = false;
        }, ABILITY_DURATION * 1000);
    }
}

