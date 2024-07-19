import {canvasHeight, canvasWidth} from "../game/const";

export const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const DEFAULT_PLAYERS = {
    type: "player",
    x: [50, 50, canvasWidth-50, canvasWidth-50],
    y: [canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 10,
    speed: 300,
    team: ['purple', 'purple', 'yellow', 'yellow'],
    color: ['purple', 'purple', 'yellow', 'yellow'],
    state: PLAYER_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "right"
}