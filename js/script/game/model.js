import {canvasHeight, canvasWidth, COLORS, GAME_STATES} from "./const";

export const lastState = {
    lastTime: 0
};

export const gameState = {
    gameTime: 0
};

//game заменить на классы

export class Game {
    constructor()
    {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.background =  COLORS.DARK;
        this.state = GAME_STATES.PLAY;
    }

    getWidth()
    {
        return this.width
    }
    getHeight(){
        return this.height
    }

    getBackground(){
        return this.background
    }

    getState(){
        return this.state
    }

}


export let game = new Game();

export let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark,
    state: GAME_STATES.PLAY
};