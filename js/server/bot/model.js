const BotConsts = require('./const.js');
class Bot {
    constructor(i) {
        this.id = BotConsts.DEFAULT_BOTS.id[i];
        this.type = BotConsts.DEFAULT_BOTS.type;
        this.x = BotConsts.DEFAULT_BOTS.x[i];
        this.y = BotConsts.DEFAULT_BOTS.y[i];
        this.size = BotConsts.DEFAULT_BOTS.size;
        this.speed = BotConsts.DEFAULT_BOTS.speed;
        this.team = BotConsts.DEFAULT_BOTS.team[i];
        this.color = BotConsts.DEFAULT_BOTS.color[i];
        this.state = BotConsts.DEFAULT_BOTS.state;
        this.stunnedUntil = 0;
        this.name = 'Bot';
        this.image = null;
        this.load = BotConsts.DEFAULT_BOTS.load;
        this.count = BotConsts.DEFAULT_BOTS.count;
        this.tick = BotConsts.DEFAULT_BOTS.tick;
        this.direction = BotConsts.DEFAULT_BOTS.direction;
    }
    getId() {return this.id;}
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
    setId(id) {this.id = id;}
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
        return this.state === BotConsts.BOT_STATES.ACTIVE;
    }
    isStunned() {
        return this.state === BotConsts.BOT_STATES.STUNNED;
    }
    isDead() {
        return this.state === BotConsts.BOT_STATES.DEAD;
    }

    moveOn(x, y) {
        this.x += x;
        this.y += y;
    }

    die() {
        this.state = BotConsts.BOT_STATES.DEAD;
    }

    renaissance() {
        this.state = BotConsts.BOT_STATES.ACTIVE;
    }
    makeStunned() {
        this.stunnedUntil = Date.now() + BotConsts.DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(BotConsts.BOT_STATES.STUNNED);
    }
    setSpeed(value) {
        this.speed = value;
    }

    recoverFromStunned() {
        this.stunnedUntil = 0;
        this.setSpeed(BotConsts.DEFAULT_BOTS.speed);

        if (this.isDead() || this.isStunned()) {
            this.renaissance();
        }
    }
}
module.exports = Bot;
