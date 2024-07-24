import { ctx } from "./script";
import { PLAYER_STATES, DEFAULT_PLAYERS, ABILITY_SCALE_MAX } from "./script/player/const";
import {getMyPlayer} from "./script/player/player";

export function drawCharacters(arrayCharacters) {
    const endAnimation = 9;
    const spriteSize = 64;

    arrayCharacters.forEach(character => {
        if (character.state === PLAYER_STATES.STUNNED || character.state === PLAYER_STATES.ACTIVE) {
            ctx.fillStyle = character.color;
            ctx.fillRect(character.x, character.y, character.size, character.size);
            if (character.load) {
                let spritePath;
                if (character.type === 'bot') {
                    switch (character.direction) {
                        case "up": spritePath = "./src/assets/sprites/bot/up.png"; break;
                        case "down": spritePath = "./src/assets/sprites/bot/down.png"; break;
                        case "left": spritePath = "./src/assets/sprites/bot/left.png"; break;
                        case "right": spritePath = "./src/assets/sprites/bot/right.png"; break;
                    }
                }
                if (character.type === 'player') {
                    switch (character.direction) {
                        case "up": spritePath = "./src/assets/sprites/player/up.png"; break;
                        case "down": spritePath = "./src/assets/sprites/player/down.png"; break;
                        case "left": spritePath = "./src/assets/sprites/player/left.png"; break;
                        case "right": spritePath = "./src/assets/sprites/player/right.png"; break;
                    }
                }

                if (spritePath) {
                    character.image.src = spritePath;
                }
                ctx.drawImage(
                    character.image,
                    character.count * spriteSize,
                    0,
                    spriteSize,
                    spriteSize,
                    character.x - (spriteSize / 2 - character.size / 2),
                    character.y - (spriteSize / 2 - character.size / 2),
                    spriteSize,
                    spriteSize
                );
                character.tick = character.tick + 1;
                if (character.tick >= 2) {
                    character.count = character.count + 1;
                    character.tick = 0;
                }
                if (character.count=== endAnimation) {
                    character.count = 0;
                }
            }
        }
        // updateEntities
        // исправить
        if (
            character.state === PLAYER_STATES.STUNNED &&
            character.stunnedUntil < Date.now()
        ) {
            character.stunnedUntil = 0;
            character.speed = DEFAULT_PLAYERS.speed;
            if (character.state === PLAYER_STATES.DEAD || 
                character.state === PLAYER_STATES.STUNNED) {
            character.state = PLAYER_STATES.ACTIVE;
        }
        }

        // в рендер
        if (character.type === 'player'){
            if (character.main) {
                ctx.strokeStyle = character.progressBar.progressEmptyColor;
                ctx.lineWidth = 2;
                ctx.strokeRect(character.progressBar.x, character.progressBar.y, character.progressBar.width, character.progressBar.height);

                ctx.fillStyle = character.progressBar.progressFillColor;
                ctx.fillRect(
                    character.progressBar.x,
                    character.progressBar.y,
                    (character.progressBar.width * character.progressBar.progress) / ABILITY_SCALE_MAX,
                    character.progressBar.height
                );
                // обратный отсчет
                if (character.state === PLAYER_STATES.STUNNED) {
                    const remainingTime = character.stunnedUntil - Date.now();
                    const seconds = Math.floor(remainingTime / 1000);
                    const milliseconds = Math.floor((remainingTime % 1000) / 10);
                    const countdownText = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
                    ctx.fillStyle = 'white';
                    ctx.font = '16px Arial';
                    ctx.fillText(countdownText, character.x, character.y - 30);
                }
            }
        }
    });
}
