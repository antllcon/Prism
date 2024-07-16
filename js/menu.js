import {playMenuTheme} from "./sound/menuThemeAudio";

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
let cardBox;
let buttonGetBot;
let buttonPlay;
let buttonMenu;
let buttonLeave;
let inputRoomId;
let waitingCard;

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
        if (file === 'lobby.html') {            
            let chapterCodeElement = document.querySelector('.chapter__code');
            chapterCodeElement.textContent = globalRoomId;        
        }

        initEventListeners();
    });
}

function loadCard(templateId) {
    const template = document.getElementById(templateId);
    const cardContainer = document.getElementById('card-container');
    const card = template.content.cloneNode(true);
    cardContainer.appendChild(card);
}

function addBot() {
    const waitingCard = buttonGetBot.closest('.player');
    const botTemplate = document.getElementById('bot-template');
    const botCard= botTemplate.content.cloneNode(true);
    waitingCard.replaceWith(botCard);
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
    buttonGetBot = document.getElementById('get-bot');
    cardBox = document.getElementById('card-container');
    buttonPlay = document.getElementById('button-play');
    buttonMenu = document.getElementById('button-menu');
    buttonLeave = document.getElementById('button-leave');
    inputRoomId = document.getElementById('input-code');
    waitingCard = document.getElementById('waiting-template');

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
        buttonLobby.addEventListener('click', () => {
            socket.emit('createRoom');
            socket.on('joinedRoom', (roomId) => {
                globalRoomId = roomId;
                transitionToPage("lobby.html");
            })
            // socket.on('roomCreated', () => {
            //     socket.emit('joinRoom');
            // })
        });
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', () => {
            inputRoomId.classList.toggle("input-for-code")
        });
    }

    if (inputRoomId) {
        inputRoomId.addEventListener('input', (event) => {
            // Удаляем все нецифровые символы
            inputRoomId.value = inputRoomId.value.replace(/\D/g, '');
            if (inputRoomId.value.length === 6) {
                let codeRoom = document.getElementById('input-code').value;
                socket.emit('joinRoom', codeRoom);
                socket.on('joinedRoom', (roomId) => {
                    globalRoomId = roomId;
                    transitionToPage("lobby.html");
                    console.log('transition');
                })
                socket.on('wrongId', () => {
                    // добавить обработку несуществующего айди комнаты
                })
            }
            if (inputRoomId.value.length > 6) {
                inputRoomId.value = inputRoomId.value.slice(0, 6);
            }
        });
    }

    if (cardBox) {
        loadCard('player-template');
        loadCard('waiting-template');
        loadCard('waiting-template');
        loadCard('waiting-template');

        if (waitingCard) {
            buttonGetBot.addEventListener('click', () => {addBot(this)});
        }
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => {
            buttonPlay.textContent = 'READY';
            setTimeout(() => {
                window.location.href = "game.html";
            }, 1000)
        });
    }

    if (buttonLeave) {
        buttonLeave.addEventListener('click', () => {
            socket.emit('leaveRoom');
            transitionToPage("with-player.html");
        });
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



