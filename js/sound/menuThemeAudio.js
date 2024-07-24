const menuThemeAudio = new Audio('src/assets/sound/sounds/menu_theme.MP3');
menuThemeAudio.loop = true;
menuThemeAudio.autoplay = true;

export function playMenuTheme() {
    menuThemeAudio.play();
}