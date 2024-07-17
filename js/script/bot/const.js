import {canvasHeight, canvasWidth} from "../game/const";

export const BOT_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const DEFAULT_BOTS = {
    x: [50, 50, canvasWidth-50, canvasWidth-50],
    y: [canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    //временное значение сайза
    size: 50,
    speed: 200,
    team: ['purple', 'purple', 'yellow', 'yellow'],
    color: ['purple', 'purple', 'yellow', 'yellow'],
    state: BOT_STATES.ACTIVE
}
// export const botStartX = canvasWidth - 50;
// export const botStartY = canvasHeight / 2;