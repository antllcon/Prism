let DEFAULT_POINTS = [
    {
        id: 0,
        x: 910, // canvasWidth / 2
        y: 20,  // topLinePointDistance
        width: 10,
        height: 10,
        size: 1000,
        type: POINT_TYPES.LINE,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INACTIVE,
        speed: 50,
        direction: 0
    },
    {
        id: 1,
        x: 910, // canvasWidth / 2
        y: 1004, // canvasHeight - bottomLinePointDistance
        width: 10,
        height: 10,
        size: 1000,
        type: POINT_TYPES.LINE,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INACTIVE,
        speed: 50,
        direction: Math.PI
    },
    {
        id: 2,
        x: 455, // canvasWidth / 4
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 350,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 150,
        direction: 0
    },
    {
        id: 3,
        x: 1365, // canvasWidth / 4 * 3
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 350,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 150,
        direction: Math.PI
    },
    {
        id: 4,
        x: 910, // canvasWidth / 2
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 2100,
        type: POINT_TYPES.CROSS,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 5,
        x: 1592.5, // canvasWidth * (7 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 6,
        x: 227.5, // canvasWidth * (1 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 7,
        x: 682.5, // canvasWidth * (3 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 8,
        x: 1137.5, // canvasWidth * (5 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 9,
        x: 1592.5, // canvasWidth * (7 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 10,
        x: 227.5, // canvasWidth * (1 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 11,
        x: 682.5, // canvasWidth * (3 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 12,
        x: 1137.5, // canvasWidth * (5 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
];

export let POINTS = DEFAULT_POINTS.map(createPoint);