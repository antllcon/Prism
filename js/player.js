const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

const PLAYER = {
    x: [ 50, 50, canvasWidth-50, canvasWidth-50],
    y: [ canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 10,
    speed: 50,
    team: ['purple', 'yellow', 'purple', 'yellow'],
    color: ['purple', 'yellow', 'purple', 'yellow'],
    state: PLAYER_STATES.ACTIVE
}

class Player {

    constructor(i) {
        this.x = PLAYER.x[i];
        this.y = PLAYER.y[i];
        this.size = PLAYER.size;
        this.speed = PLAYER.speed;
        this.team = PLAYER.team[i];
        this.color = PLAYER.color[i];
        this.state = PLAYER.state;
    }

    createPlayer() {
        return new Player();
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
    getColor() {
        return this.color;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}