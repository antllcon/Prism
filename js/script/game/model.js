import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const";

export class Game {
    constructor() {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.background = COLORS.DARK;
        this.state = GAME_STATES.START;
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

    setState(state) {
        return this.state = state;
    }
}

export const game = new Game();

export const GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: COLORS.DARK,
    state: GAME_STATES.PLAY
};
