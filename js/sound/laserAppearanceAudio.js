const laserSoundSrc = 'src/assets/sound/sounds/laser_appearance.mp3';

export function playLaserAppearance() {
    const laserAppearanceAudio = new Audio(laserSoundSrc);
    laserAppearanceAudio.play();
}
