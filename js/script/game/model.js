import {canvasHeight, canvasWidth, dark, GAME_STATES} from "./const";

export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");

export let lastTime;

export let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark,
    state: GAME_STATES.PLAY
};