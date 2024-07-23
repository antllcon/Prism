// import {canvasHeight, canvasWidth, TEAM_STATES, COLORS} from "../game/const";
const canvasHeight, canvasWidth, TEAM_STATES, COLORS = require('../game/const.js');
module.exports = PLAYER_STATES, DURATION_DISABILITY, DEFAULT_PLAYERS, ABILITY_SCALE_SPEED,
    MAX_SPEED, ABILITY_SCALE_MAX, ABILITY_DURATION, ABILITY_SPEED_MULTIPLAYER;

const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead',
};

const DURATION_DISABILITY = 5000;

const DEFAULT_PLAYERS = {
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

const ABILITY_SCALE_SPEED = 10;
const MAX_SPEED = 1200;
const ABILITY_SCALE_MAX = 50;
const ABILITY_DURATION = 10000;
const ABILITY_SPEED_MULTIPLAYER = 3;
