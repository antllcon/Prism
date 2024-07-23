// const countdownAudio = new Audio('src/assets/sound/sounds/countdown.mp3');

// export function playCountdown() {
//     countdownAudio.play();
// }


import player from 'play-sound';

const audioPlayer = player();

export function playCountdown() {
    audioPlayer.play('src/assets/sound/sounds/countdown.mp3', (err) => {
        if (err) console.error(`Could not play sound: ${err}`);
    });
}