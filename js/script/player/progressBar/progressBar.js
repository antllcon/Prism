import { ctx } from "../../../script";
import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    MAX_SPEED,
    DURATION_DISABILITY
} from "../const";

export function drawProgressBar(progressBar) {
    ctx.strokeStyle = progressBar.progressEmptyColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(progressBar.x, progressBar.y, progressBar.width, progressBar.height);

    ctx.fillStyle = progressBar.progressFillColor;
    ctx.fillRect(
        progressBar.x,
        progressBar.y,
        (progressBar.width * progressBar.progress) / ABILITY_SCALE_MAX,
        progressBar.height
    );
}
export function updateAbilityScale(dt, player) {
    player.abilityScale += ABILITY_SCALE_SPEED * dt;
    player.progressBar.progress = player.abilityScale;
    if (player.abilityScale >= ABILITY_SCALE_MAX) {
        player.abilityScale = ABILITY_SCALE_MAX;
    }
}