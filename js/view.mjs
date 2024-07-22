import { ctx } from "./script.mjs";
import {getMyPlayer} from "./script/player/player.mjs";

export function drawCharacters(arrayCharacters) {
    const endAnimation = 9;
    const spriteSize = 64;

    arrayCharacters.forEach(character => {
        if (character.isAlive() || character.isStunned()) {
            ctx.fillStyle = character.getColor();
            ctx.fillRect(character.getX(), character.getY(), character.getSize(), character.getSize());
            if (character.getLoad()) {
                let spritePath;
                if (character.getType() === 'bot') {
                    switch (character.getDirection()) {
                        case "up": spritePath = "./src/assets/sprites/bot/up.png"; break;
                        case "down": spritePath = "./src/assets/sprites/bot/down.png"; break;
                        case "left": spritePath = "./src/assets/sprites/bot/left.png"; break;
                        case "right": spritePath = "./src/assets/sprites/bot/right.png"; break;
                    }
                }
                if (character.getType() === 'player') {
                    switch (character.getDirection()) {
                        case "up": spritePath = "./src/assets/sprites/player/up.png"; break;
                        case "down": spritePath = "./src/assets/sprites/player/down.png"; break;
                        case "left": spritePath = "./src/assets/sprites/player/left.png"; break;
                        case "right": spritePath = "./src/assets/sprites/player/right.png"; break;
                    }
                }

                if (spritePath) {
                    character.setImage(spritePath);
                }

                ctx.drawImage(
                    character.getImage(),
                    character.getCount() * spriteSize,
                    0,
                    spriteSize,
                    spriteSize,
                    character.getX() - (spriteSize / 2 - character.getSize() / 2),
                    character.getY() - (spriteSize / 2 - character.getSize() / 2),
                    spriteSize,
                    spriteSize
                );
                character.setTick(character.getTick() + 1);
                if (character.getTick() >= 2) {
                    character.setCount(character.getCount() + 1);
                    character.setTick(0);
                }
                if (character.getCount() === endAnimation) {
                    character.setCount(0);
                }
            }
        }
        if (
            character.isStunned() &&
            character.stunnedUntil < Date.now()
        ) {
            character.recoverFromStunned();
        }
        const mainPlayer = getMyPlayer(arrayCharacters);
        if (character.getType() === 'player'){
            if (character.isMain()) {
                character.renderPB();
                if (character.isStunned()) {
                    character.drawCountdown();
                }
            }
        }
    });
}
