import { playMenuTheme } from './sound/menuThemeAudio';

const socket = io();

let globalRoomId;

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
let buttonEnter;
let buttonLeave;
let buttonReady;

function loadHTML(filename, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', filename);
    xhr.onload = () => {
        callback(xhr.response);
    };
    xhr.send();
}

function callback(html) {
    document.body.innerHTML = html;
}

function transitionToPage(file) {
    loadHTML(file, (html) => {
        callback(html);
        if (
            file === 'menu.html' ||
            file === 'with_bot.html' ||
            file === 'with-player.html'
        ) {
            loadToMainPageLink();
        }
        if (file === 'lobby.html') {
            let chapterCodeElement = document.querySelector('.chapter__code');
            chapterCodeElement.textContent = globalRoomId;
        }

        initEventListeners();
    });
}

function loadToMainPageLink() {
    let toMainPage = document.createElement('a');
    toMainPage.classList.add('logo');
    toMainPage.href = '';
    loadHTML('src/assets/img/prism.svg', (html) => {
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
    buttonEnter = document.getElementById('button-enter');
    buttonLeave = document.getElementById('button-leave');
    //создала константу
    buttonReady = document.getElementById('button-ready');

    if (buttonBot) {
        buttonBot.addEventListener('click', () => {
            // centralPartMenu.classList.add("central-part__menu-animate-out");
            setTimeout(() => transitionToPage('with_bot.html'), 0);
        });
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', () => {
            transitionToPage('with-player.html');
        });
    }

    if (button1vs1) {
        button1vs1.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    }

    if (button2vs2) {
        button2vs2.addEventListener('click', () => {
            transitionToPage('lobby.html');
        });
    }

    if (buttonLobby) {
        buttonLobby.addEventListener('click', () => {
            socket.emit('createRoom');
            socket.on('joinedRoom', (roomId) => {
                globalRoomId = roomId;
                transitionToPage('lobby.html');
            });
            // socket.on('roomCreated', () => {
            //     socket.emit('joinRoom');
            // })
        });
    }

    if (buttonEnter) {
        buttonEnter.addEventListener('click', () => {
            let inputRoomId = document.getElementById('input-code').value;
            socket.emit('joinRoom', inputRoomId);
            socket.on('joinedRoom', (roomId) => {
                globalRoomId = roomId;
                transitionToPage('lobby.html');
                console.log('transition');
            });
            socket.on('wrongId', () => {
                // добавить обработку несуществующего айди комнаты
            });
        });
    }

    if (buttonLeave) {
        buttonLeave.addEventListener('click', () => {
            socket.emit('leaveRoom');
            transitionToPage('with-player.html');
        });
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', () => {
            let inputField = document.getElementById('input-code');
            inputField.classList.toggle('input-for-code');
        });
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    }

    if (buttonMenu) {
        buttonMenu.addEventListener('click', () => {
            transitionToPage('menu.html');
        });
    }

    // новый event listener
    if (buttonReady) {
        buttonReady.addEventListener('click', () => {
            socket.emit('playerIsReady');
        });
    }

    socket.on('roomIsReady', () => {
        console.log('room is ready отработало');
        window.location.href = 'game.html';
    });
}

// Initial load of the menu page
loadHTML('menu.html', (html) => {
    callback(html);
    playMenuTheme();
    loadToMainPageLink();
    initEventListeners();
});
