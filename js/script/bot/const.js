// import {canvasHeight, canvasWidth, TEAM_STATES, COLORS} from "../game/const.js";
const canvasHeight, canvasWidth, TEAM_STATES, COLORS = require('../game/const.js');
module.exports = BOT_STATES, DURATION_DISABILITY, DEFAULT_BOTS;

const BOT_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead',
};

const DURATION_DISABILITY = 5000;

const DEFAULT_BOTS = {
    id: [0, 1, 2, 3],
    type: "bot",
    x: [50, 50, canvasWidth - 50, canvasWidth - 50],
    y: [canvasHeight / 3, canvasHeight * 2 / 3, canvasHeight / 3, canvasHeight * 2 / 3],
    size: 10,
    speed: 300,
    team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
    color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
    state: BOT_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "left"
}