// const deathPlayerAudio = new Audio('src/assets/sound/sounds/death_player.mp3');
// deathPlayerAudio.muted = true;
// export function playDeathPlayer() {
//     deathPlayerAudio.play();
// }

import player from 'play-sound';

const audioPlayer = player();

export function playDeathPlayer() {
    audioPlayer.play('src/assets/sound/sounds/death_player.mp3', (err) => {
        if (err) console.error(`Could not play sound: ${err}`);
    });
}