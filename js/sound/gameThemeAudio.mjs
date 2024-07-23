// const gameThemeAudio = new Audio('src/assets/sound/sounds/game_theme.mp3');
// gameThemeAudio.loop = true;
// gameThemeAudio.autoplay = true;

// export function playGameTheme() {
//     gameThemeAudio.play();
// }

import player from 'play-sound';

const audioPlayer = player();

export function playGameTheme() {
    audioPlayer.play('src/assets/sound/sounds/game_theme.mp3', (err) => {
        if (err) console.error(`Could not play sound: ${err}`);
    });
}