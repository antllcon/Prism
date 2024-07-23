// const laserAppearanceAudio = new Audio(
//     'src/assets/sound/sounds/laser_appearance.mp3'
// );
import player from 'play-sound';

const audioPlayer = player();

export function playLaserAppearance() {
    audioPlayer.play('src/assets/sound/sounds/laser_appearance.mp3', (err) => {
        if (err) console.error(`Could not play sound: ${err}`);
    });
}
// export function playLaserAppearance() {
//     laserAppearanceAudio.play();
// }
