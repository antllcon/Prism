const laserAppearanceAudio = new Audio('src/assets/sound/sounds/laser_appearance.mp3');
laserAppearanceAudio.preload = 'auto';

export function playLaserAppearance() {
    laserAppearanceAudio.play();
}