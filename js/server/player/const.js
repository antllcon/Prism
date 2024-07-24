const canvasWidth = 1820;
const canvasHeight = 1024;
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
const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead',
}
PlayerConsts = {
    canvasWidth: 1820,
    canvasHeight: 1024,
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
    
    PLAYER_STATES: {
        ACTIVE: 'active',
        STUNNED: 'stunned',
        DEAD: 'dead',
    },
    
    DURATION_DISABILITY: 5000,
    
    DEFAULT_PLAYERS: {
        type: "player",
        x: [50, 50, canvasWidth - 50, canvasWidth - 50],
        y: [
            canvasHeight / 3,
            (canvasHeight * 2) / 3,
            canvasHeight / 3,
            (canvasHeight * 2) / 3,
        ],
        size: 30,
        speed: 300,
        team: [TEAM_STATES.PURPLE, TEAM_STATES.PURPLE, TEAM_STATES.YELLOW, TEAM_STATES.YELLOW],
        color: [COLORS.PURPLE, COLORS.PURPLE, COLORS.YELLOW, COLORS.YELLOW],
        state: PLAYER_STATES.ACTIVE,
        load: false,
        count: 0,
        tick: 0,
        direction: "right",
        isAllowedToJostle: false,
    },
    
    ABILITY_SCALE_SPEED: 10,
    MAX_SPEED: 1200,
    ABILITY_SCALE_MAX: 50,
    ABILITY_DURATION: 10000,
    ABILITY_SPEED_MULTIPLAYER: 3,
}

module.exports = PlayerConsts;