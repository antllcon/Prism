const gameThemeAudio = new Audio('src/assets/sound/sounds/game_theme.mp3');
gameThemeAudio.loop = true;
gameThemeAudio.autoplay = true;

export function playGameTheme() {
    gameThemeAudio.play();
}
