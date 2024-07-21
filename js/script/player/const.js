import { canvasHeight, canvasWidth } from '../game/const';

export const GREEN = '#00ff00';

export const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead',
};

export const DURATION_DISABILITY = 5000;

export const DEFAULT_PLAYERS = {
    x: [50, 50, canvasWidth - 50, canvasWidth - 50],
    y: [
        canvasHeight / 3,
        (canvasHeight * 2) / 3,
        canvasHeight / 3,
        (canvasHeight * 2) / 3,
    ],
    size: 50,
    speed: 500,
    team: ['purple', 'purple', 'yellow', 'yellow'],
    color: ['purple', 'purple', 'yellow', 'yellow'],
    state: PLAYER_STATES.ACTIVE,
    isAllowedToJostle: false,
};

export const ABILITY_SCALE_SPEED = 10;
export const MAX_SPEED = 1200;
export const ABILITY_SCALE_MAX = 50;
export const ABILITY_DURATION = 10000;
export const ABILITY_SPEED_MULTIPLAYER = 3;
