import {canvasHeight, canvasWidth, dark, GAME_STATES} from "./const";

export const lastState = {
    lastTime: 0
};

export const gameState = {
    gameTime: 0
};

export let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark,
    state: GAME_STATES.PLAY
};