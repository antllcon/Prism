const Player = require('../model');
const PlayerConst = require('../const.js');

const SIZE = {
    x: 50,
    y: 15,
};

class ProgressBar {
    constructor(player) {
        this.playerId = player.id;
        this.x = player.x;
        this.y = player.y - 60;
        this.height = SIZE.y;
        this.width = PlayerConst.ABILITY_SCALE_MAX;
        this.color = PlayerConst.COLORS.GREEN;
        this.progressFillColor = PlayerConst.COLORS.GREEN;
        this.progressEmptyColor = PlayerConst.COLORS.GRAY;
        this.progress = 0;
    }

    setX(x) {this.x = x;}
    setY(y) {this.y = y;}
    getX() {return this.x;}
    getY() {return this.y;}
    updatePosition(x, y) {
        this.x += x;
        this.y += y;
    }
    update(scaleValue) {this.progress = scaleValue;}
}
module.exports = ProgressBar;