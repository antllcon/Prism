import {COLORS, TEAM_STATES} from "../game/const";
import {canvasWidth, canvasHeight} from "../game/const"

export const pointsAmount = 1;
export const POINT_STATES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    INVISIBLE: 'invisible'
}
export const POINT_TYPES = {
    LINE: "line",
    TRIGRAPH: "trigraph",
    CROSS: "cross"
}
export let DEFAULT_POINTS = {
    id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    x: [
        canvasWidth / 2,
        canvasWidth / 2,
        canvasWidth / 4,
        (canvasWidth / 4) * 3,
        canvasWidth / 2,
        canvasWidth * (7 / 8),
        canvasWidth * (1 / 8),
        canvasWidth * (3 / 8),
        canvasWidth * (5 / 8),
        canvasWidth * (7 / 8),
        canvasWidth * (1 / 8),
        canvasWidth * (3 / 8),
        canvasWidth * (5 / 8),
    ],
    y: [
        20,
        canvasHeight - 20,
        canvasHeight / 2,
        canvasHeight / 2,
        canvasHeight / 2,
        (canvasHeight * 4) / 5,
        (canvasHeight * 4) / 5,
        (canvasHeight * 4) / 5,
        (canvasHeight * 4) / 5,
        (canvasHeight * 1) / 5,
        (canvasHeight * 1) / 5,
        (canvasHeight * 1) / 5,
        (canvasHeight * 1) / 5,
    ],
    width: 10,
    height: 10,
    /*[1000, 1000, 350, 350, 2100, 500, 500, 500, 500, 500, 500, 500, 500],*/
    size: [300, 300, 350, 350, 300, 300, 300, 300, 300, 300, 300, 300, 300],
    /*[POINT_TYPES.LINE, POINT_TYPES.LINE, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.CROSS,
        POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH,
        POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH
    ],*/
    type: [POINT_TYPES.LINE, POINT_TYPES.LINE, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH,
        POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH,
        POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH, POINT_TYPES.TRIGRAPH
    ],
    team: TEAM_STATES.NONE,
    color: COLORS.GRAY,
    angle: 0,
    existTime: 10000,
    state: [
        POINT_STATES.INACTIVE,
        POINT_STATES.INACTIVE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
        POINT_STATES.INVISIBLE,
    ],
    speed: 0,
    direction: 0,
};
