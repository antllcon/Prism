import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const";

//game заменить на классы

export class Game {
    constructor() {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.background = COLORS.DARK;
        this.state = GAME_STATES.start;
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

    setBackground(image) {
        this.background = image;
    }
    setState(state) {
        this.state = state;
    }
}

export let game = new Game();

export let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: COLORS.DARK,
    state: GAME_STATES.start
};

