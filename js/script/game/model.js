import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const.mjs";

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

export const game = new Game();

export const GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: COLORS.DARK,
    state: GAME_STATES.PLAY
};
