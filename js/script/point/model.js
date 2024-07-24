import { POINT_STATES, POINT_TYPES, DEFAULT_POINTS } from './const';
export class Point {
    constructor(i)  {
        this.id = DEFAULT_POINTS.id[i];
        this.x = DEFAULT_POINTS.x[i];
        this.y = DEFAULT_POINTS.y[i];
        this.width = DEFAULT_POINTS.width;
        this.height = DEFAULT_POINTS.height;
        this.size = DEFAULT_POINTS.size[i];
        this.type = DEFAULT_POINTS.type[i];
        this.team = DEFAULT_POINTS.team;
        this.color = DEFAULT_POINTS.color;
        this.angle = DEFAULT_POINTS.angle[i];
        this.existTime = DEFAULT_POINTS.existTime;
        this.activationTime = null;
        this.state = DEFAULT_POINTS.state;
        this.speed = DEFAULT_POINTS.speed;
        this.direction = DEFAULT_POINTS.direction;
        this.image = new Image();
        this.load = DEFAULT_POINTS.load;
        this.count = DEFAULT_POINTS.count;
        this.tick = DEFAULT_POINTS.tick;
    }

    getId() {return this.id;}
    getX() {return this.x;}
    getY() {return this.y;}
    getWidth() {return this.width;}
    getHeight() {return this.height;}
    getSize() {return this.size;}
    getType() {return this.type;}
    getTeam() {return this.team;}
    getColor() {return this.color;}
    getAngle() {return this.angle;}
    getExistTime() {return this.existTime;}
    getActivationTime() {return this.activationTime;}
    getState() {return this.state;}
    getSpeed() {return this.speed;}
    getDirection() {return this.direction;}

    getImage() {return this.image;}
    getLoad() {return this.load;}
    getCount() {return this.count;}
    getTick() {return this.tick;}

    setId(id) {this.id = id;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    setWidth(width) {this.width = width;}
    setHeight(height) {this.height = height;}
    setSize(size) {this.size = size;}
    setType(type) {this.type = type;}
    setTeam(team) {this.team = team;}
    setColor(color) {this.color = color;}
    setAngle(angle) {this.angle = angle;}
    setExistTime(existTime) {this.existTime = existTime;}
    setActivationTime(activationTime) {this.activationTime = activationTime;}
    setState(state) {this.state = state;}
    setSpeed(speed) {this.speed = speed;}
    setDirection(direction) {this.direction = direction;}

    setImage(image) {this.image.src = image;}
    setLoad(load) {this.load = load;}
    setCount(count) {this.count = count;}
    setTick(tick) {this.tick = tick;}

    isActive() {return this.state === POINT_STATES.ACTIVE;}
    isInactive() {return this.state === POINT_STATES.INACTIVE;}
    isInvisible() {return this.state === POINT_STATES.INVISIBLE;}
    setActive() {this.state = POINT_STATES.ACTIVE;}
    setInactive() {this.state = POINT_STATES.INACTIVE;}
    setInvisible() {this.state = POINT_STATES.INVISIBLE;}
    isTypeLine() {return this.type === POINT_TYPES.LINE;}
    isTypeTrigraph() {return this.type === POINT_TYPES.TRIGRAPH;}
    isTypeCross() {return this.type === POINT_TYPES.CROSS;}
    setTypeLine() {this.type = POINT_TYPES.LINE;}
    setTypeTrigraph() {this.type = POINT_TYPES.TRIGRAPH;}
    setTypeCross() {this.type = POINT_TYPES.CROSS;}
    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }

    // возможно не надо - не надо
    deactivate() {this.setInactive();}
}
