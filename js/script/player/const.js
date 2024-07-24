import {canvasHeight, canvasWidth, TEAM_STATES, COLORS} from "../game/const";

export const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}

export const DEFAULT_PLAYERS = {
    type: "player",
    x: [50, 50, canvasWidth-50, canvasWidth-50],
    y: [canvasHeight/3, canvasHeight*2/3, canvasHeight/3, canvasHeight*2/3],
    size: 24,
    speed: 200,
    team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
    color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
    state: PLAYER_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "right"
}
