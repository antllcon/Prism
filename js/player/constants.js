import {canvasHeight, canvasWidth} from "../script";

console.log(canvasWidth, canvasHeight, "hello from js/player/constants")

export const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const PLAYER = {
    x: [ 50, 50, canvasWidth-50, canvasWidth-50],
    y: [ canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 10,
    speed: 50,
    team: ['purple', 'yellow', 'purple', 'yellow'],
    color: ['purple', 'yellow', 'purple', 'yellow'],
    state: PLAYER_STATES.ACTIVE
}
