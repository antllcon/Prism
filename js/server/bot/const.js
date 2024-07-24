
const canvasWidth = 1820;
const canvasHeight = 1024;
const GAME_STATES = {
    START: "start",
    PLAY: "play",
    VICTORY: "victory",
    PAUSE: "pause"
}
const TEAM_STATES = {
    NONE: "none",
    PURPLE: "purple",
    YELLOW: "yellow"
}
const COLORS = {
    GREEN: '#40c140',
    YELLOW: "#f8df5c",
    PURPLE: "#8f23dc",
    GRAY: "#666",
    DARK: "#333",
    BLACK: "#111",
    WHITE: "#FFF",
}

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
    size: 30,
    speed: 300,
    team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
    color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
    state: BOT_STATES.ACTIVE,
    load: false,
    count: 0,
    tick: 0,
    direction: "left"
}
BotConsts = {
    canvasWidth: 1820,
    canvasHeight: 1024,
    GAME_STATES: {
        START: "start",
        PLAY: "play",
        VICTORY: "victory",
        PAUSE: "pause"
    },
    TEAM_STATES: {
        NONE: "none",
        PURPLE: "purple",
        YELLOW: "yellow"
    },
    COLORS: {
        GREEN: '#40c140',
        YELLOW: "#f8df5c",
        PURPLE: "#8f23dc",
        GRAY: "#666",
        DARK: "#333",
        BLACK: "#111",
        WHITE: "#FFF",
    },

    BOT_STATES: {
        ACTIVE: 'active',
        STUNNED: 'stunned',
        DEAD: 'dead',
    },

    DURATION_DISABILITY: 5000,

    DEFAULT_BOTS: {
        id: [0, 1, 2, 3],
        type: "bot",
        x: [50, 50, canvasWidth - 50, canvasWidth - 50],
        y: [canvasHeight / 3, canvasHeight * 2 / 3, canvasHeight / 3, canvasHeight * 2 / 3],
        size: 30,
        speed: 200,
        team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
        color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
        state: BOT_STATES.ACTIVE,
        load: false,
        count: 0,
        tick: 0,
        direction: "left"
    }
}
module.exports = BotConsts;
