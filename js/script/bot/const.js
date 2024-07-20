import {canvasHeight, canvasWidth} from "../game/const";

export const BOT_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const DEFAULT_BOTS = {
    type: "bot",
    x: [50, 50, canvasWidth - 50, canvasWidth - 50],
    y: [canvasHeight / 3, canvasHeight * 2 / 3, canvasHeight / 3, canvasHeight * 2 / 3],
    size: 10,
    speed: 300,
    team: ['purple', 'purple', 'yellow', 'yellow'],
    color: ['purple', 'purple', 'yellow', 'yellow'],
    state: BOT_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "left"
    state: BOT_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "left"
}
// export const botStartX = canvasWidth - 50;
// export const botStartY = canvasHeight / 2;