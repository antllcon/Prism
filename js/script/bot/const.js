import {canvasHeight, canvasWidth} from "../game/const";

export const BOT_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const botStartX = canvasWidth - 50;
export const botStartY = canvasHeight / 2;