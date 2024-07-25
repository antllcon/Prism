import { BOT_STATES, DEFAULT_BOTS } from './const';
import { Bot } from './model';
import { GAME } from '../game/model';
import { Point } from '../point/model';
import { POINT_STATES } from '../point/const';
import { ctx, activeBots, requiredBots, points, readyBonuses } from '../../script';
import { yellow } from '../game/const';

export function createBots(requiredBots) {
    //в requiredBots передается массив с позициями(placeId), на которых надо создать ботов
    const createdBots = [];
    let i = 0;
    requiredBots.forEach((placeId) => {
        createdBots[i] = new Bot(placeId);
        i++;
    });
    return createdBots;
}

export function initBotAnimation() {
    activeBots.forEach(bot => {
        if (bot.image === null) {
            bot.image = new Image();
        }
        bot.image.src = ("./src/assets/sprites/bot/left.png");
        bot.image.onload = () => {
            bot.load = true;
        }
    })
}
// переписать drawcharacters
export function drawBot() {

    const endAnimation = 9;
    const spriteSize = 64;

    activeBots.forEach((bot) => {
        if (bot.state === BOT_STATES.ACTIVE || bot.state === BOT_STATES.STUNNED) {
            ctx.fillStyle = bot.color;
            ctx.fillRect(bot.x, bot.y, bot.size, bot.size);
            //console.log(bot.count);
            if (bot.load === true) {
                switch (bot.direction) {
                    case "up":
                        bot.image.src = "./src/assets/sprites/bot/up.png";
                        break;
                    case "down":
                        bot.src = ("./src/assets/sprites/bot/down.png");
                        break;
                    case "left":
                        bot.src = ("./src/assets/sprites/bot/left.png");
                        break;
                    case "right":
                        bot.src = ("./src/assets/sprites/bot/right.png");
                        break;
                }
                ctx.drawImage(
                    bot.image,
                    spriteSize * bot.count,
                    0,
                    spriteSize,
                    spriteSize,
                    bot.x - (spriteSize / 2 - bot.getSize() / 2),
                    bot.y - (spriteSize / 2 - bot.getSize() / 2),
                    spriteSize,
                    spriteSize
                );
                bot.tick = (bot.tick + 1);
                if (bot.tick >= 2) {
                    bot.count = (bot.count + 1);
                    bot.tick = (0);
                }
            }
            if (bot.count === endAnimation) {
                bot.count = (0);
            }
        }
        if (bot.state === BOT_STATES.STUNNED && bot.stunnedUntil < Date.now()) {
            startStunTimer(bot, DURATION_DISABILITY);
            bot.stunnedUntil = 0;
            bot.speed = (DEFAULT_BOTS.speed);

            if (bot.state === BOT_STATES.DEAD) {
                bot.state = BOT_STATES.ACTIVE;
        }


        }
        if (bot.state === BOT_STATES.STUNNED) {
            const remainingTime = bot.stunnedUntil - Date.now();
            const seconds = Math.floor(remainingTime / 1000);
            const milliseconds = Math.floor((remainingTime % 1000) / 10);
            const countdownText = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(countdownText, bot.x, bot.y - 30);
        }
    });
}

export function resetBots() {
    for (let i = 0; i < activeBots.length; i++) {
        activeBots[i].x = (DEFAULT_BOTS.x[requiredBots[i]]);
        activeBots[i].y = (DEFAULT_BOTS.y[requiredBots[i]]);
        activeBots[i].state = BOT_STATES.ACTIVE;
    }
}


function findBotById(bots, id) {
    let foundBot;
    bots.forEach(bot => {
        if (bot.getId() === id)
        foundBot = bot;
    });
    return foundBot;
}
export function updateBots(activeBots, bots) {
    // data[bots].foreach(botFromServer => {
    //     const bot = findBotById(botFromServer.id);
    //     updateBot(bot, botFromServer);
    // })
    //console.log(activeBots, 'before');
    activeBots = bots;
    //console.log(activeBots, 'after');
}
function updateBot(bot, botFromServer) {
    botFromServer.y ? bot.setY(botFromServer.y) : null;
    botFromServer.x ? bot.setX(botFromServer.x) : null;
    botFromServer.team ? bot.setTeam(botFromServer.team) : null;
    botFromServer.color ? bot.setColor(botFromServer.color) : null;
    botFromServer.state ? bot.setState(botFromServer.state) : null;
}


/* let closestBonus = null;
            let closestDistance = Infinity;

            bonuses.forEach(bonus => {
                const dx = bot.x - bonus.getX();
                const dy = bot.y - bonus.getY();
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestBonus = bonus;
                }
            });

            if (closestBonus) {
                const dxBonus = closestBonus.getX() - bot.x;
                const dyBonus = closestBonus.getY() - bot.y;
                const angleToBonus = Math.atan2(dyBonus, dxBonus);
                const speed = bot.getSpeed() * dt;

                bot.moveOn(speed * Math.cos(angleToBonus), speed * Math.sin(angleToBonus));
            } else {*/
