import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const";

export const lastState = {
    lastTime: 0,
};

export const gameState = {
    gameTime: 0,
};

export class Game {
    constructor() {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.src = './src/assets/img/background.png';
        this.state = GAME_STATES.PLAY;
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

    getSrc() {
        return this.src;
    }

    getState() {
        return this.state;
    }
}

export const game = new Game();

export const GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: COLORS.DARK,
    state: GAME_STATES.PLAY
};
