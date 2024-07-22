
const menuThemeAudio = new Audio('src/assets/sound/sounds/menu_theme.mp3');
menuThemeAudio.loop = true;
menuThemeAudio.autoplay = true;

export function playMenuTheme() {
    menuThemeAudio.play();
}

/*
import player from 'play-sound';

const audioPlayer = player();

export function playMenuTheme() {
    audioPlayer.play('src/assets/sound/sounds/menu_theme.mp3', (err) => {
        if (err) console.error(`Could not play sound: ${err}`);
    });
}*/
