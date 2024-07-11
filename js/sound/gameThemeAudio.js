export const gameThemeAudio = new Audio('./sounds/game_theme.mp3');

export function playGameTheme() {
    gameThemeAudio.play();
}