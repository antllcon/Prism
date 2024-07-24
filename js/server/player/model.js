const PlayerConsts = require("./const.js");
const ProgressBar = require('./progressBar/progressBar.js')

class Player {
    constructor(i, id) {
        this.type = PlayerConsts.DEFAULT_PLAYERS.type;
        this.id = id;
        this.main = false;
        this.x = PlayerConsts.DEFAULT_PLAYERS.x[i];
        this.y = PlayerConsts.DEFAULT_PLAYERS.y[i];
        this.size = PlayerConsts.DEFAULT_PLAYERS.size;
        this.speed = PlayerConsts.DEFAULT_PLAYERS.speed;
        this.team = PlayerConsts.DEFAULT_PLAYERS.team[i];
        this.color = PlayerConsts.DEFAULT_PLAYERS.color[i];
        this.state = PlayerConsts.DEFAULT_PLAYERS.state;
        this.abilityScale = 0;
        this.abilityActive = false;
        this.progressBar = new ProgressBar(this);
        this.image = null;
        this.count = PlayerConsts.DEFAULT_PLAYERS.count;
        this.tick = PlayerConsts.DEFAULT_PLAYERS.tick;
        this.direction = PlayerConsts.DEFAULT_PLAYERS.direction;
        this.load = PlayerConsts.DEFAULT_PLAYERS.load;
        this.isInvisibleLasers = false;
    }

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

    isAlive() { return this.state === PlayerConsts.PLAYER_STATES.ACTIVE; }
    isDead() { return this.state === PlayerConsts.PLAYER_STATES.DEAD; }
    moveOn(x, y) {
        this.x += x;
        this.y += y;
        //this.progressBar.updatePosition(x, y)
    }
    die() { this.state = PlayerConsts.PLAYER_STATES.DEAD; }
    setColor(color) { this.color = color; }
    renaissance() { this.state = PlayerConsts.PLAYER_STATES.ACTIVE; }
    
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
module.exports = Player;
