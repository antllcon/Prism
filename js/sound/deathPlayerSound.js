const deathPlayerAudio = new Audio('src/assets/sound/sounds/death_player.mp3');
deathPlayerAudio.muted = true;
function playDeathPlayer() {
    deathPlayerAudio.play();
}
modeule.exports = playDeathPlayer;