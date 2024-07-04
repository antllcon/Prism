import { loadHTML, callback, loadToMainPageLink } from './additional/html-loader.js';

function transitionToPage(file) {
    loadHTML(file, (html) => {
        callback(html);
        if (file === 'menu.html' || file === 'with_bot.html' || file === 'with-player.html') {
            loadToMainPageLink();
        }
        initEventListeners();
    });
}

function initEventListeners() {
    let buttonBot = document.getElementById('button-bot');
    let buttonPlayer = document.getElementById('button-player');
    let button1vs1 = document.getElementById('button-1vs1');
    let button2vs2 = document.getElementById('button-2vs2');
    let buttonLobby = document.getElementById('button-lobby');
    let buttonConnect = document.getElementById('button-connect');
    let buttonPlay = document.getElementById('button-play');
    let buttonMenu = document.getElementById('button-menu');

    if (buttonBot) {
        buttonBot.addEventListener('click', () => { transitionToPage("with_bot.html"); });
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', () => { transitionToPage("with-player.html"); });
    }

    if (button1vs1) {
        button1vs1.addEventListener('click', () => { window.location.href = "index.html"; });
    }

    if (button2vs2) {
        button2vs2.addEventListener('click', () => { transitionToPage("lobby.html"); });
    }

    if (buttonLobby) {
        buttonLobby.addEventListener('click', () => { transitionToPage("lobby.html"); });
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', () => {
            let inputField = document.getElementById('input-code');
            inputField.classList.toggle("input-for-code")
        });
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => { window.location.href = "index.html"; });
    }

    if (buttonMenu) {
        buttonMenu.addEventListener('click', () => { transitionToPage("menu.html"); });
    }
}

loadHTML('menu.html', (html) => {
    callback(html);
    loadToMainPageLink();
    initEventListeners();
});
