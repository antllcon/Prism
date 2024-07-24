import {PLAYER_STATES, DEFAULT_PLAYERS} from "./const";

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
        this.image = new Image();
        this.load = DEFAULT_PLAYERS.load;
        this.count = DEFAULT_PLAYERS.count;
        this.tick = DEFAULT_PLAYERS.tick;
        this.direction = DEFAULT_PLAYERS.direction;
    }

    // Геттеры и сеттеры
    getType() { return this.type; }
    getId() { return this.id; }
    getX() { return this.x; }
    getY() { return this.y; }
    getSize() { return this.size; }
    getSpeed() { return this.speed; }
    getTeam() { return this.team; }
    getColor() { return this.color; }
    getState() { return this.state; }
    getImage() { return this.image; }
    getLoad() { return this.load; }
    getCount() { return this.count; }
    getTick() { return this.tick; }
    getDirection() { return this.direction; }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    setImage(image) { this.image.src = image; }
    setLoad(load) { this.load = load; }
    setCount(count) { this.count = count; }
    setTick(tick) { this.tick = tick; }
    setDirection(direction) { this.direction = direction; }

    isAlive() { return this.state === PLAYER_STATES.ACTIVE; }
    isDead() { return this.state === PLAYER_STATES.DEAD; }
    isStunned() { return this.state === PLAYER_STATES.STUNNED; }
    moveOn(x, y) { this.x += x; this.y += y; }
    die() { this.state = PLAYER_STATES.DEAD; }
    setColor(color) { this.color = color; }
    renaissance() { this.state = PLAYER_STATES.ACTIVE; }
    
    setId(id) {
        this.id = id;
    }
    settSize(size) {
        this.size = size;
    }
    setSpeed(speed){
        this.speed = speed;
    }
    setTeam(team) {
        this.team = team;
    }
    setState(state) {
        this.state = state;
    }
}

