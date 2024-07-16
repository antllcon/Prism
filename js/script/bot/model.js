import {BOT_STATES, DEFAULT_BOTS} from "./const";

export class Bot {
    constructor(i) {
        this.x = DEFAULT_BOTS.x[i];
        this.y = DEFAULT_BOTS.y[i];
        this.size = DEFAULT_BOTS.size;
        this.speed = DEFAULT_BOTS.speed;
        this.team = DEFAULT_BOTS.team[i];
        this.color = DEFAULT_BOTS.color[i];
        this.state = DEFAULT_BOTS.state;
        this.image = new Image();
        this.load = DEFAULT_BOTS.load;
        this.count = DEFAULT_BOTS.count;
        this.tick = DEFAULT_BOTS.tick;
        this.direction = DEFAULT_BOTS.direction;
    }

    // Геттеры
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getSize() {
        return this.size;
    }

    getSpeed() {
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

    getImage() {
        return this.image;
    }

    getLoad() {
        return this.load;
    }

    getCount() {
        return this.count;
    }

    getTick() {
        return this.tick;
    }

    getDirection() {
        return this.direction;
    }

    // Сеттеры
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

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
}
