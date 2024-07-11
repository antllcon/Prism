import {playMenuTheme} from "./sound/menuThemeAudio";

let centralPartMenu;
let nameGame;
let buttonBot;
let buttonPlayer;
let button1vs1;
let button2vs2;
let buttonLobby;
let buttonConnect;
let buttonPlay;
let buttonMenu;

function loadHTML(filename, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", filename);
    xhr.onload = () => {
        callback(xhr.response);
    }
    xhr.send();
}

function callback(html) {
    document.body.innerHTML = html;
}

function transitionToPage(file) {
    loadHTML(file, (html) => {
        callback(html);
        if (file === 'menu.html' || file === 'with_bot.html'
            || file === 'with-player.html') {
            loadToMainPageLink();
        }
        initEventListeners();
    });
}

function loadToMainPageLink() {
    let toMainPage = document.createElement("a");
    toMainPage.classList.add("logo");
    toMainPage.href = "";
    loadHTML("src/assets/img/prism.svg", (html) => {
        toMainPage.innerHTML = html;
    });
    document.body.appendChild(toMainPage);
}

function initEventListeners() {
    nameGame = document.getElementById('central-part-menu');
    centralPartMenu = document.getElementById('central-part-menu');
    buttonBot = document.getElementById('button-bot');
    buttonPlayer = document.getElementById('button-player');
    button1vs1 = document.getElementById('button-1vs1');
    button2vs2 = document.getElementById('button-2vs2');
    buttonLobby = document.getElementById('button-lobby');
    buttonConnect = document.getElementById('button-connect');
    buttonPlay = document.getElementById('button-play');
    buttonMenu = document.getElementById('button-menu');

    if (buttonBot) {
        buttonBot.addEventListener('click', () => {
            // centralPartMenu.classList.add("central-part__menu-animate-out");
            setTimeout(() => transitionToPage("with_bot.html"), 0);
        });
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', () => { transitionToPage("with-player.html"); });
    }

    if (button1vs1) {
        button1vs1.addEventListener('click', () => { window.location.href = "game.html"; });
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
        buttonPlay.addEventListener('click', () => { window.location.href = "game.html"; });
    }

    if (buttonMenu) {
        buttonMenu.addEventListener('click', () => { transitionToPage("menu.html"); });
    }
}

// Initial load of the menu page
loadHTML('menu.html', (html) => {
    callback(html);
    playMenuTheme();
    loadToMainPageLink();
    initEventListeners();
});


