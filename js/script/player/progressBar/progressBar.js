// import { Player } from '../model';
// import { ctx } from '../../../script';
// import { COLORS } from '../../game/const';
// import {
//     PLAYER_STATES,
//     DEFAULT_PLAYERS,
//     ABILITY_SCALE_SPEED,
//     ABILITY_SCALE_MAX,
//     ABILITY_DURATION,
//     ABILITY_SPEED_MULTIPLAYER,
// } from '../const';
const Player = require('../model.js');
const ctx = require('../../../script.js');
const COLORS = require('../../game/const.js');
const PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    ABILITY_SPEED_MULTIPLAYER = require('../const.js');
module.exports = SIZE, GRAY, ProgressBar;

const SIZE = {
    x: 50,
    y: 15,
};

const GRAY = '#808080';

class ProgressBar {
    constructor(player) {
        this.playerId = player.id;
        this.x = player.x;
        this.y = player.y - 60;
        this.height = SIZE.y;
        this.width = ABILITY_SCALE_MAX;
        this.color = COLORS.GREEN;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 20);
        this.progressFillColor = COLORS.GREEN;
        this.progressEmptyColor = COLORS.GRAY;
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
    render() {
        ctx.strokeStyle = this.progressEmptyColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.progressFillColor;
        ctx.fillRect(
            this.x,
            this.y,
            (this.width * this.progress) / ABILITY_SCALE_MAX,
            this.height
        );
    }
}
