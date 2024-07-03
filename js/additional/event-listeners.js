import { navigateToPage } from './navigation.js';

export function initPageEventListeners() {
    const buttonBot = document.getElementById('button-bot');
    const buttonPlayer = document.getElementById('button-player');
    const button1vs1 = document.getElementById('button-1vs1');
    const button2vs2 = document.getElementById('button-2vs2');
    const buttonLobby = document.getElementById('button-lobby');
    const buttonConnect = document.getElementById('button-connect');
    const buttonPlay = document.getElementById('button-play');
    const buttonMenu = document.getElementById('button-menu');

    if (buttonBot) {
        buttonBot.addEventListener('click', () => navigateToPage("with_bot.html"));
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', () => navigateToPage("with-player.html"));
    }

    if (button1vs1) {
        button1vs1.addEventListener('click', () => window.location.href = "index.html");
    }

    if (button2vs2) {
        button2vs2.addEventListener('click', () => navigateToPage("lobby.html"));
    }

    if (buttonLobby) {
        buttonLobby.addEventListener('click', () => navigateToPage("lobby.html"));
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', () => {
            const inputField = document.getElementById('input-code');
            inputField.classList.toggle("input-for-code");
        });
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => window.location.href = "index.html");
    }

    if (buttonMenu) {
        buttonMenu.addEventListener('click', () => navigateToPage("menu.html"));
    }
}
