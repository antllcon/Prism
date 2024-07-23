import {canvasHeight, canvasWidth, TEAM_STATES, COLORS} from "../game/const";

export const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead',
};

export const DURATION_DISABILITY = 5000;

export const DEFAULT_PLAYERS = {
    type: "player",
    x: [50, 50, canvasWidth - 50, canvasWidth - 50],
    y: [
        canvasHeight / 3,
        (canvasHeight * 2) / 3,
        canvasHeight / 3,
        (canvasHeight * 2) / 3,
    ],
    size: 10,
    speed: 300,
    team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
    color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
    state: PLAYER_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "right",
    isAllowedToJostle: false,
};

export const ABILITY_SCALE_SPEED = 10;
export const MAX_SPEED = 900;
export const ABILITY_SCALE_MAX = 50;
export const ABILITY_DURATION = 10000;
export const ABILITY_SPEED_MULTIPLAYER = 3;
