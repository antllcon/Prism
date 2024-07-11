const gameThemeAudio = new Audio('./sounds/game_theme.mp3');
gameThemeAudio.loop = true;
gameThemeAudio.autoplay = true;

export function playGameTheme() {
    gameThemeAudio.play();
}