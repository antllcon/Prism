
const canvasWidth = 1820;
const canvasHeight = 1024;
const GAME_STATES = {
    START: "start",
    PLAY: "play",
    VICTORY: "victory",
    PAUSE: "pause"
}

GAME_CONSTS = {
    POINT_STATES: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        INVISIBLE: 'invisible'
    },
    POINT_TYPES: {
        LINE: "line",
        TRIGRAPH: "trigraph",
        CROSS: "cross"
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
    TEAM_STATES: {
        NONE: "none",
        PURPLE: "purple",
        YELLOW: "yellow"
    },
    GAME_STATES: {
        START: "start",
        PLAY: "play",
        VICTORY: "victory",
        PAUSE: "pause"
    },
    canvasWidth: 1820,
    canvasHeight: 1024
}
module.exports = GAME_CONSTS;
