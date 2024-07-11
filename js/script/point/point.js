// noinspection JSPrimitiveTypeWrapperUsage

export function createPoint(point) {
    return {
        id: point.id,
        x: point.x,
        y: point.y,
        width: point.width,
        height: point.height,
        size: point.size,
        type: point.type,
        team: point.team,
        color: point.color,
        angle: point.angle,
        existTime: point.existTime,
        activationTime: null,
        state: point.state,
        speed: point.speed,
        direction: point.direction
    };
}

export function resetPoint(point, index) {
    const defaultPoint = DEFAULT_POINTS[index];
    point.id = defaultPoint.id;
    point.y = defaultPoint.y;
    point.width = defaultPoint.width;
    point.height = defaultPoint.height;
    point.size = defaultPoint.size;
    point.type = defaultPoint.type;
    point.team = defaultPoint.team;
    point.color = defaultPoint.color;
    point.existTime = defaultPoint.existTime;
    point.activationTime = null;
    point.state = POINT_STATES.INACTIVE;
    point.speed = defaultPoint.speed;
}

export function drawPoints() {
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE) {
            if (point.type === POINT_TYPES.CROSS) {
                point.angle += Math.PI / 180;
                ctx.save();
                ctx.translate(point.x, point.y);
                ctx.rotate(point.angle);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(-point.size / 2, 0);
                ctx.lineTo(point.size / 2, 0);
                ctx.moveTo(0, -point.size / 2);
                ctx.lineTo(0, point.size / 2);
                ctx.stroke();
                ctx.restore();
            }
            if (point.type === POINT_TYPES.TRIGRAPH) {
                point.angle += Math.PI / 180;
                ctx.save();
                ctx.translate(point.x, point.y);
                ctx.rotate(point.angle);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(point.size / 2, 0);
                ctx.lineTo(0, 0);
                ctx.moveTo(0, 0);
                ctx.lineTo(-point.size / 2 * Math.cos(Math.PI / 3), -point.size / 2 * Math.sin(Math.PI / 3));
                ctx.moveTo(0, 0);
                ctx.lineTo(-point.size / 2 * Math.cos(-Math.PI / 3), -point.size / 2 * Math.sin(-Math.PI / 3));
                ctx.stroke();
                ctx.restore();
            }
            if (point.type === POINT_TYPES.LINE) {
                ctx.save();
                ctx.translate(point.x, point.y);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(point.size, 0);
                ctx.lineTo(-point.size, 0);
                ctx.stroke();
                ctx.restore();
            }

        }
        if (point.state === POINT_STATES.INACTIVE) {
            point.angle += Math.PI / 180;
            ctx.save();
            ctx.translate(point.x + point.width / 2, point.y + point.height / 2);
            ctx.rotate(point.angle);
            ctx.fillStyle = point.color;
            ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);
            ctx.restore();
        }
        if (point.state === POINT_STATES.INVISIBLE) {

        }
    });
}

export function respawnPoint(point) {
    if (point.id !== 0 && point.id !== 1) {
        point.state = POINT_STATES.INVISIBLE;
    }
    point.team = TEAM_STATES.NONE;
    point.activationTime = null;
    point.color = gray;
    point.height = 10;
}