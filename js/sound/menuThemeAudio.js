const menuThemeAudio = new Audio('src/assets/sound/sounds/menu_theme.mp3');
menuThemeAudio.loop = true;
menuThemeAudio.autoplay = true;

function playMenuTheme() {
    menuThemeAudio.play();
}
module.exports = playMenuTheme;