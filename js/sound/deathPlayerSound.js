const deathPlayerAudio = new Audio('src/assets/sound/sounds/death_player.mp3');
deathPlayerAudio.muted = true;
export function playDeathPlayer() {
    deathPlayerAudio.play();
}