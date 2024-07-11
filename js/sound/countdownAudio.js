export const countdownAudio = new Audio('./sounds/countdown.mp3');

export function playCountdown() {
    countdownAudio.play();
}
let countdownAudio = new Audio();
countdownAudio.preload = 'auto';
//countdownAudio.src = '../src/sound/countdown.MP3';
let gameThemeAudio = new Audio();
gameThemeAudio.preload = 'auto';
//gameThemeAudio.src = '../src/sound/game_theme.MP3';
let laserAppearanceAudio = new Audio();
laserAppearanceAudio.preload = 'auto';
//laserAppearanceAudio.src = '../src/sound/laser_appearance.MP3';