module.exports = canvasWidth, canvasHeight, GAME_STATES, TEAM_STATES, COLORS;
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