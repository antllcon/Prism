const menuThemeAudio = new Audio('./sounds/menu_theme.mp3');
menuThemeAudio.loop = true;
menuThemeAudio.autoplay = true;

export function playMenuTheme() {
    menuThemeAudio.play();
}