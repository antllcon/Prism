// noinspection JSPrimitiveTypeWrapperUsage

import { Point } from './model';
import { POINT_TYPES, pointsAmount } from './const';
import { ctx, points } from '../../script';

export function createPoints() {
    for (let i = 0; i < pointsAmount; i++) {
        points[i] = new Point(i);
    }
}

export function resetPoints() {
    for (let i = 0; i < points.length; i++) {
        points[i].setState(DEFAULT_POINTS.state);
    }
}

export function initPointAnimation() {
    points.forEach(point => {
        point.setImage("./src/assets/sprites/point/line-point.png");
        point.getImage().onload = () => {
            point.setLoad(true);
        };
    });
}

export function drawPoints() {
    let spriteSize = 50;
    points.forEach(point => {
        if (point.isActive()) {
            if (point.isTypeCross()) {
                point.setAngle(point.getAngle() + Math.PI / 180);
                ctx.save();
                ctx.translate(point.getX(), point.getY());
                ctx.rotate(point.getAngle());
                ctx.strokeStyle = point.getColor();
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(-point.getSize() / 2, 0);
                ctx.lineTo(point.getSize() / 2, 0);
                ctx.moveTo(0, -point.getSize() / 2);
                ctx.lineTo(0, point.getSize() / 2);
                ctx.stroke();
                ctx.restore();
            }
            if (point.isTypeTrigraph()) {
                point.setAngle(point.getAngle() + Math.PI / 180);
                ctx.save();
                ctx.translate(point.getX(), point.getY());
                ctx.rotate(point.getAngle());
                ctx.strokeStyle = point.getColor();
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(point.getSize() / 2, 0);
                ctx.lineTo(0, 0);
                ctx.moveTo(0, 0);
                ctx.lineTo(-point.getSize() / 2 * Math.cos(Math.PI / 3), -point.getSize() / 2 * Math.sin(Math.PI / 3));
                ctx.moveTo(0, 0);
                ctx.lineTo(-point.getSize() / 2 * Math.cos(-Math.PI / 3), -point.getSize() / 2 * Math.sin(-Math.PI / 3));
                ctx.stroke();
                ctx.restore();
            }
            if (point.isTypeLine()) {
                ctx.save();
                ctx.translate(point.getX(), point.getY());
                ctx.strokeStyle = point.getColor();
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(point.getSize(), 0);
                ctx.lineTo(-point.getSize(), 0);
                ctx.stroke();
                ctx.restore();
            }
        }
        if (point.isInactive()) {
            //console.log("я не активный");
            //console.log(point.getAngle());
            point.setAngle(point.getAngle() + Math.PI / 180);
            ctx.save();
            ctx.translate(point.getX(), point.getY());
            ctx.rotate(point.getAngle());
            if (point.getLoad()) {
               // console.log("изображение есть");
                let spritePath;
                switch (point.getType()) {
                    case POINT_TYPES.CROSS:
                        spritePath = "./src/assets/sprites/point/cross-point.png";
                        break;
                    case POINT_TYPES.TRIGRAPH:
                        spritePath = "./src/assets/sprites/point/triradius-point.png";
                        break;
                    case POINT_TYPES.LINE:
                        spritePath = "./src/assets/sprites/point/line-point.png";
                        break;
                }
                if (spritePath) {
                    point.setImage(spritePath);
                }
                ctx.drawImage(point.getImage(), -spriteSize  / 2, -spriteSize / 2);
                //console.log("должен был отрисовать");
            } else {
                ctx.fillStyle = point.getColor();
                ctx.fillRect(-point.getWidth() / 2, -point.getHeight() / 2, point.getWidth(), point.getHeight());
            }
            ctx.restore();
        }
    });
}

// export function resetPoints() {
//     createPoints();
// }

// export function resetPoint(point) {
//     let id = point.getId();
//     point = new Point(id);
//     // const defaultPoint = DEFAULT_POINTS[index];
//     // point.id = defaultPoint.id;
//     // point.y = defaultPoint.y;
//     // point.width = defaultPoint.width;
//     // point.height = defaultPoint.height;
//     // point.size = defaultPoint.size;
//     // point.type = defaultPoint.type;
//     // point.team = defaultPoint.team;
//     // point.color = defaultPoint.color;
//     // point.existTime = defaultPoint.existTime;
//     // point.activationTime = null;
//     // point.state = POINT_STATES.INACTIVE;
//     // point.speed = defaultPoint.speed;
// }

// export function drawPoints() {
//     points.forEach(point => {
//         if (point.isActive()) {
//             // console.log(point);
//             // console.log(point.isTypeTrigraph());
//             if (point.isTypeCross()) {
//                 // console.log('cross');
//                 point.setAngle(point.getAngle() + Math.PI / 180);
//                 ctx.save();
//                 ctx.translate(point.getX(), point.getY());
//                 ctx.rotate(point.getAngle());
//                 ctx.strokeStyle = point.getColor();
//                 ctx.lineWidth = 5;
//                 ctx.beginPath();
//                 ctx.moveTo(-point.getSize() / 2, 0);
//                 ctx.lineTo(point.getSize() / 2, 0);
//                 ctx.moveTo(0, -point.getSize() / 2);
//                 ctx.lineTo(0, point.getSize() / 2);
//                 ctx.stroke();
//                 ctx.restore();
//             }
//             if (point.isTypeTrigraph()) {
//                 // console.log('trigraph');
//                 point.setAngle(point.getAngle() + Math.PI / 180);
//                 ctx.save();
//                 ctx.translate(point.getX(), point.getY());
//                 ctx.rotate(point.getAngle());
//                 ctx.strokeStyle = point.getColor();
//                 ctx.lineWidth = 5;
//                 ctx.beginPath();
//                 ctx.moveTo(point.getSize() / 2, 0);
//                 ctx.lineTo(0, 0);
//                 ctx.moveTo(0, 0);
//                 ctx.lineTo(
//                     (-point.getSize() / 2) * Math.cos(Math.PI / 3),
//                     (-point.getSize() / 2) * Math.sin(Math.PI / 3)
//                 );
//                 ctx.moveTo(0, 0);
//                 ctx.lineTo(
//                     (-point.getSize() / 2) * Math.cos(-Math.PI / 3),
//                     (-point.getSize() / 2) * Math.sin(-Math.PI / 3)
//                 );
//                 ctx.stroke();
//                 ctx.restore();
//             }
//             if (point.isTypeLine()) {
//                 // console.log('line');
//                 ctx.save();
//                 ctx.translate(point.getX(), point.getY());
//                 ctx.strokeStyle = point.getColor();
//                 ctx.lineWidth = 5;
//                 ctx.beginPath();
//                 ctx.moveTo(point.getSize(), 0);
//                 ctx.lineTo(-point.getSize(), 0);
//                 ctx.stroke();
//                 ctx.restore();
//             }
//
//         }
//         if (point.isInactive()) {
//             point.setAngle(point.getAngle() + Math.PI / 180);
//             ctx.save();
//             ctx.translate(
//                 point.getX() + point.getWidth() / 2,
//                 point.getY() + point.getHeight() / 2
//             );
//             ctx.rotate(point.getAngle());
//             ctx.fillStyle = point.getColor();
//             ctx.fillRect(
//                 -point.getWidth() / 2,
//                 -point.getHeight() / 2,
//                 point.getWidth(),
//                 point.getHeight()
//             );
//             ctx.restore();
//         }
//         if (point.isInvisible()) {
//         }
//     });
// }



// export function movePoint(point, dt) {
//     if (point.getId() === 2 || point.getId() === 3) {
//         if (point.getX() <= 50) {
//             point.setDirection(0);
//         }
//         if (point.getX() >= 1760) {
//             point.setDirection(Math.PI);
//         }
//     }
//     point.moveOn(Math.cos(point.getDirection()) * point.getSpeed() * dt, 0);
// }

// export function updateVisibilityPoints(point) {
//     if (point.isTypeTrigraph()) {
//         if (
//             5 <= point.getId() &&
//             point.getId() <= 12 &&
//             gameState.gameTime > 3
//         ) {
//             point.setInactive();
//         }
//         if (
//             2 <= point.getId() &&
//             point.getId() <= 3 &&
//             gameState.gameTime > 6
//         ) {
//             point.setInactive();
//         }
//     }
//     if (point.isTypeCross && gameState.gameTime > 15) {
//         point.setInactive();
//     }
// }