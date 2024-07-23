// import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const";
const canvasHeight, canvasWidth, COLORS, GAME_STATES = require('./const.js');
module.exports = lastState, gameState, Game, game, GAME;

const lastState = {
    lastTime: 0,
};

const gameState = {
    gameTime: 0,
};

class Game {
    constructor() {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.background = COLORS.DARK;
        this.state = GAME_STATES.PLAY;
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

    getBackground() {
        return this.background;
    }

    getState() {
        return this.state;
    }
}

const game = new Game();

const GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: COLORS.DARK,
    state: GAME_STATES.PLAY
};
