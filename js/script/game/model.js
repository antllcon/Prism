import { canvasHeight, canvasWidth, dark, GAME_STATES } from './const';

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
        this.background = dark;
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
    background: dark,
    state: GAME_STATES.PLAY,
};
