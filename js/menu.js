import { playMenuTheme } from './sound/menuThemeAudio';

const socket = io();

const playerImages = [
    "src/assets/img/kandinsky-download-1719222086261%201.svg",
    "src/assets/img/player-img-2.svg",
    "src/assets/img/player-img-3.svg",
    "src/assets/img/player-img-4.svg",
]

const nameCharacters = ["neon killer", "cyber viper", "nova reaper", "quantum phantom"]

const cardStyles = [
    {
        backgroundColor: "#6000C1",
        namePlayerColor: "#E9D3FF",
        nameCharacter: {
            get value() {
                return nameCharacters[this.character]
            },
            color: "#E9D3FF",
            borderRight: "12px solid #E9D3FF",
            borderLeft: "12px solid #E9D3FF",
            get src() {
                return playerImages[this.character]
            },
            character: 0,
        },
        buttonPickBot: {
            backgroundColor: "#3A0272",
            color: "#EFCEFF",
            playerPictureSrc: "src/assets/img/card-background-dark-purple.png",
        }
    },
    {
        backgroundColor: "#B22DF1",
        namePlayerColor: "#EFCEFF",
        nameCharacter: {
            get value() {
                return nameCharacters[this.character]
            },
            color: "#EFCEFF",
            borderRight: "12px solid #EFCEFF",
            borderLeft: "12px solid #EFCEFF",
            get src() {
                return playerImages[this.character]
            },
            character: 0,
        },
        buttonPickBot: {
            backgroundColor: "#8323B0",
            color: "#EFCEFF",
            playerPictureSrc: "src/assets/img/card-background-purple.png",
        }
    },
    {
        backgroundColor: "#FBFF35",
        namePlayerColor: "#818414",
        nameCharacter: {
            get value() {
                return nameCharacters[this.character]
            },
            color: "#818414",
            borderRight: "12px solid #818414",
            borderLeft: "12px solid #818414",
            get src() {
                return playerImages[this.character]
            },
            character: 0,
        },
        buttonPickBot: {
            backgroundColor: "#FDFFA3",
            color: "#AAAC1D",
            playerPictureSrc: "src/assets/img/card-background-yellow.png",
        }
    },
    {
        backgroundColor: "#FFC635",
        namePlayerColor: "#A18122",
        nameCharacter: {
            get value() {
                return nameCharacters[this.character]
            },
            color: "#A18122",
            borderRight: "12px solid #A18122",
            borderLeft: "12px solid #A18122",
            get src() {
                return playerImages[this.character]
            },
            character: 0,
        },
        buttonPickBot: {
            backgroundColor: "#FFDA7B",
            color: "#CFA333",
            playerPictureSrc: "src/assets/img/card-background-dark-yellow.png",
        }
    },
];

const places = [
    {
        position: 0,
        status: 'waiting-template',
    },
    {
        position: 1,
        status: 'waiting-template',
    },
    {
        position: 2,
        status: 'waiting-template',
    },
    {
        position: 3,
        status: 'waiting-template',
    }
]

let globalRoomId;

let buttonLogo;
let centralPartMenu;
let buttonBot;
let buttonPlayer;
let button1vs1;
let button2vs2;
let buttonLobby;
let buttonConnect;
let cardBox;
let buttonPlay;
let buttonMenu;
let buttonLeave;
let inputRoomId;
let currentPlayerCard;

function loadHTML(filename, callback) {
    const xhr = new XMLHttpRequest();
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
    removeCardEventListeners();
    removeEventListeners();
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
            const chapterCodeElement = document.querySelector('.chapter__code');
            chapterCodeElement.textContent = globalRoomId;
        }
        initEventListeners();
    });
}

function loadCard(templateId) {
    const template = document.getElementById(templateId);
    if (template) {
        const cardContainer = document.getElementById('card-container');
        if (cardContainer) {
            let card = template.content.cloneNode(true);
            cardContainer.appendChild(card);
        }
    }
}

function setStyleCard(index) {
    let cardBackgrounds = document.querySelectorAll('.player');

    if (index < cardBackgrounds.length) {
        let cardBackground = cardBackgrounds[index];

        let namePlayer = cardBackground.querySelector('.player-count');
        let nameCharacter =  cardBackground.querySelector('.player-name');
        let navigationArrowLeft = cardBackground.querySelector('.arrow-left');
        let navigationArrowRight = cardBackground.querySelector('.arrow-right');
        let buttonPickBot = cardBackground.querySelector('.get-bot');
        let buttonPickPlayer = cardBackground.querySelector('.get-player');
        let buttonPickWait = cardBackground.querySelector('.get-wait');
        let checkPlayer = cardBackground.querySelector('.get');

        let playerPicture = cardBackground.querySelector('.player-img');

        let styles = cardStyles[index];

        cardBackground.style.backgroundColor = styles.backgroundColor;
        namePlayer.style.color = styles.namePlayerColor;
        if (nameCharacter) {
            nameCharacter.textContent = styles.nameCharacter.value;
            nameCharacter.style.color = styles.nameCharacter.color;
            playerPicture.src = styles.nameCharacter.src;
            if (navigationArrowLeft) {
                navigationArrowLeft.style.borderRight = styles.nameCharacter.borderRight;
                navigationArrowRight.style.borderLeft = styles.nameCharacter.borderLeft;
            }
            if (checkPlayer) {
                namePlayer.textContent = `PLAYER ${index+1}`
            }
        }
        if (buttonPickWait) {
            buttonPickWait.style.backgroundColor = styles.buttonPickBot.backgroundColor;
            buttonPickWait.style.color = styles.buttonPickBot.color;
        }
        if (buttonPickBot) {
            buttonPickBot.style.backgroundColor = styles.buttonPickBot.backgroundColor;
            buttonPickBot.style.color = styles.buttonPickBot.color;
            buttonPickPlayer.style.backgroundColor = styles.buttonPickBot.backgroundColor;
            buttonPickPlayer.style.color = styles.buttonPickBot.color;
            playerPicture.src = styles.buttonPickBot.playerPictureSrc;
        }
    }
}

function setId() {
    let cards = document.querySelectorAll('.player');
    cards.forEach((card, id) => {
        let playWithBot = card.querySelector('.get-bot');
        let pickCard = card.querySelector('.get-player');
        let deleteBot = card.querySelector('.get-wait');

        if (playWithBot) {
            playWithBot.id = `get-bot-${id}`;
        }
        if (pickCard) {
            pickCard.id = `get-player-${id}`
        }
        if (deleteBot) {
            deleteBot.id = `get-wait-${id}`
        }
    })
}

function loadToMainPageLink() {
    let toMainPage = document.createElement("button");
    toMainPage.classList.add("logo");
    toMainPage.setAttribute('id', 'logo');
    loadHTML("src/assets/img/prism.svg", (html) => {
        toMainPage.innerHTML = html;
    });
    document.body.appendChild(toMainPage);
}

function initCardsEventListeners() {
    let buttonBot1 = document.getElementById('get-bot-0');
    let buttonBot2 = document.getElementById('get-bot-1');
    let buttonBot3 = document.getElementById('get-bot-2');
    let buttonBot4 = document.getElementById('get-bot-3');
    let buttonPlayer1 = document.getElementById('get-player-0');
    let buttonPlayer2 = document.getElementById('get-player-1');
    let buttonPlayer3 = document.getElementById('get-player-2');
    let buttonPlayer4 = document.getElementById('get-player-3');
    let buttonWait1 = document.getElementById('get-wait-0');
    let buttonWait2 = document.getElementById('get-wait-1');
    let buttonWait3 = document.getElementById('get-wait-2');
    let buttonWait4 = document.getElementById('get-wait-3');

    if (buttonBot1) {
        buttonBot1.addEventListener('click', onClickButtonBot1);
    }
    if (buttonBot2) {
        buttonBot2.addEventListener('click', onClickButtonBot2);
    }
    if (buttonBot3) {
        buttonBot3.addEventListener('click', onClickButtonBot3);
    }
    if (buttonBot4) {
        buttonBot4.addEventListener('click', onClickButtonBot4);
    }
    if (buttonPlayer1) {
        buttonPlayer1.addEventListener('click', onClickButtonPlayer1);
    }
    if (buttonPlayer2) {
        buttonPlayer2.addEventListener('click', onClickButtonPlayer2);
    }
    if (buttonPlayer3) {
        buttonPlayer3.addEventListener('click', onClickButtonPlayer3);
    }
    if (buttonPlayer4) {
        buttonPlayer4.addEventListener('click', onClickButtonPlayer4);
    }
    if (buttonWait1) {
        buttonWait1.addEventListener('click', onClickButtonWait1);
    }
    if (buttonWait2) {
        buttonWait2.addEventListener('click', onClickButtonWait2);
    }
    if (buttonWait3) {
        buttonWait3.addEventListener('click', onClickButtonWait3);
    }
    if (buttonWait4) {
        buttonWait4.addEventListener('click', onClickButtonWait4);
    }
}
function onClickButtonBot1() {
    socket.emit('addBotOnPosition', 0);
}
function onClickButtonBot2() {
    socket.emit('addBotOnPosition', 1);
}
function onClickButtonBot3() {
    socket.emit('addBotOnPosition', 2);
}
function onClickButtonBot4() {
    socket.emit('addBotOnPosition', 3);
}
function onClickButtonPlayer1() {
    socket.emit('changeLobbyPosition', 0);
}
function onClickButtonPlayer2() {
    socket.emit('changeLobbyPosition', 1);
}
function onClickButtonPlayer3() {
    socket.emit('changeLobbyPosition', 2);
}
function onClickButtonPlayer4() {
    socket.emit('changeLobbyPosition', 3);
}
function onClickButtonWait1() {
    socket.emit('removeBotFromPosition', 0)
}
function onClickButtonWait2() {
    socket.emit('removeBotFromPosition', 1)
}
function onClickButtonWait3() {
    socket.emit('removeBotFromPosition', 2)
}
function onClickButtonWait4() {
    socket.emit('removeBotFromPosition', 3)
}

function initEventListeners() {
    buttonLogo = document.getElementById('logo');
    centralPartMenu = document.getElementById('central-part-menu');
    buttonBot = document.getElementById('button-bot');
    buttonPlayer = document.getElementById('button-player');
    button1vs1 = document.getElementById('button-1vs1');
    button2vs2 = document.getElementById('button-2vs2');
    buttonLobby = document.getElementById('button-lobby');
    buttonConnect = document.getElementById('button-connect');
    buttonPlay = document.getElementById('button-play');
    buttonMenu = document.getElementById('button-menu');
    buttonLeave = document.getElementById('button-leave');
    inputRoomId = document.getElementById('input-code');
    cardBox = document.getElementById('card-container');

    if (buttonLogo) {
        buttonLogo.addEventListener('click', onClickButtonLogo);
    }

    if (buttonBot) {
        buttonBot.addEventListener('click', onClickButtonBot);
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', onClickButtonPlayer);
    }

    if (button1vs1) {
        button1vs1.addEventListener('click', onClickButton1vs1);
    }

    if (button2vs2) {
        button2vs2.addEventListener('click', onClickButton2vs2);
    }

    if (buttonLobby) {
        buttonLobby.addEventListener('click', onClickButtonLobby);
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', onClickButtonConnect);
    }

    if (inputRoomId) {
        inputRoomId.addEventListener('input', onInputRoomId);
    }

    if (cardBox) {
        console.log('зашли')
        for (let i = 0; i < 4; i++) {
            console.log(places[i].status)
            loadCard(places[i].status, i);
            setStyleCard(i);
        }
        setId();
        removeCardEventListeners();
        initCardsEventListeners();
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', onClickButtonPlay);
    }

    if (buttonLeave) {
        buttonLeave.addEventListener('click', onClickButtonLeave);
    }

    if (buttonMenu) {
        buttonMenu.addEventListener('click', onClickButtonMenu);
    }

    // window.addEventListener('beforeunload', function(e) {
    //     e.preventDefault(); // Предотвращаем стандартное поведение
    //     e.returnValue = ''; // Убираем сообщение о подтверждении
    //     // Здесь вы можете вызвать функцию для отправки уведомления на сервер
    //     socket.emit('pageRefreshed');
    // })

}
function onClickButtonLogo() {
    transitionToPage("menu.html");
}
function onClickButtonBot() {
    transitionToPage('with_bot.html')
}
function onClickButtonPlayer() {
    if (!(document.cookie.indexOf('userId') > -1)) {
        setCookie();
        sendCookie();
    }
    transitionToPage('with-player.html');
}
function onClickButton1vs1() {
    window.location.href = 'game.html';
}
function onClickButton2vs2() {
    transitionToPage('lobby.html');
}
function onClickButtonLobby() {
    socket.emit('createRoom');
            socket.on('requestForCookie', () => {
                sendCookie();
            })
            socket.on('joinedRoom', (roomId) => {
                // console.log("вызван button lobby")
                globalRoomId = roomId;
                transitionToPage('lobby.html');
            });
}
function onClickButtonConnect() {
    inputRoomId.classList.toggle("input-for-code");
}
function onInputRoomId() {
    inputRoomId.value = inputRoomId.value.replace(/\D/g, '');
    if (inputRoomId.value.length === 6) {
        let codeRoom = document.getElementById('input-code').value;
        socket.emit('joinRoom', codeRoom);
        socket.on('requestForCookie', () => {
            sendCookie();
        })
        socket.on('joinedRoom', (roomId) => {
            globalRoomId = roomId;
            transitionToPage('lobby.html');
        });
        socket.on('wrongId', () => {
            // добавить обработку несуществующего айди комнаты
        });
    }
    if (inputRoomId.value.length > 6) {
        inputRoomId.value = inputRoomId.value.slice(0, 6);
    }
}
function onClickButtonPlay() {
    buttonPlay.textContent = 'READY';
    socket.emit('playerIsReady');
    socket.on('roomIsReady', () => {
        window.location.href = "game.html";
    })
}
function onClickButtonLeave() {
    socket.emit('leaveRoom');
    transitionToPage("with-player.html");
}
function onClickButtonMenu() {
    transitionToPage('menu.html');
}
function removeEventListeners() {
    buttonLogo = document.getElementById('logo');
    centralPartMenu = document.getElementById('central-part-menu');
    buttonBot = document.getElementById('button-bot');
    buttonPlayer = document.getElementById('button-player');
    button1vs1 = document.getElementById('button-1vs1');
    button2vs2 = document.getElementById('button-2vs2');
    buttonLobby = document.getElementById('button-lobby');
    buttonConnect = document.getElementById('button-connect');
    buttonPlay = document.getElementById('button-play');
    buttonMenu = document.getElementById('button-menu');
    buttonLeave = document.getElementById('button-leave');
    inputRoomId = document.getElementById('input-code');
    cardBox = document.getElementById('card-container');

    if (buttonLogo) {
        buttonLogo.removeEventListener('click', onClickButtonLogo);
    }

    if (buttonBot) {
        buttonBot.removeEventListener('click', onClickButtonBot);
    }

    if (buttonPlayer) {
        buttonPlayer.removeEventListener('click', onClickButtonPlayer);
    }

    if (button1vs1) {
        button1vs1.removeEventListener('click', onClickButton1vs1);
    }

    if (button2vs2) {
        button2vs2.removeEventListener('click', onClickButton2vs2);
    }

    if (buttonLobby) {
        buttonLobby.removeEventListener('click', onClickButtonLobby);
    }

    if (buttonConnect) {
        buttonConnect.removeEventListener('click', onClickButtonConnect);
    }

    if (inputRoomId) {
        inputRoomId.removeEventListener('click', onInputRoomId);
    }

    if (buttonPlay) {
        buttonPlay.removeEventListener('click', onClickButtonPlay);
    }

    if (buttonLeave) {
        buttonLeave.removeEventListener('click', onClickButtonLeave);
    }

    if (buttonMenu) {
        buttonMenu.removeEventListener('click', onClickButtonMenu);
    }
}
function removeCardEventListeners() {
    let buttonBot1 = document.getElementById('get-bot-1');
    let buttonBot2 = document.getElementById('get-bot-2');
    let buttonBot3 = document.getElementById('get-bot-3');
    let buttonBot4 = document.getElementById('get-bot-4');
    let buttonPlayer1 = document.getElementById('get-player-1');
    let buttonPlayer2 = document.getElementById('get-player-2');
    let buttonPlayer3 = document.getElementById('get-player-3');
    let buttonPlayer4 = document.getElementById('get-player-4');
    let buttonWait1 = document.getElementById('get-wait-1');
    let buttonWait2 = document.getElementById('get-wait-2');
    let buttonWait3 = document.getElementById('get-wait-3');
    let buttonWait4 = document.getElementById('get-wait-4');

    if (buttonBot1) {
        buttonBot1.removeEventListener('click', onClickButtonBot1);
    }
    if (buttonBot2) {
        buttonBot2.removeEventListener('click', onClickButtonBot2);
    }
    if (buttonBot3) {
        buttonBot3.removeEventListener('click', onClickButtonBot3);
    }
    if (buttonBot4) {
        buttonBot4.removeEventListener('click', onClickButtonBot4);
    }
    if (buttonPlayer1) {
        buttonPlayer1.removeEventListener('click', onClickButtonPlayer1);
    }
    if (buttonPlayer2) {
        buttonPlayer2.removeEventListener('click', onClickButtonPlayer2);
    }
    if (buttonPlayer3) {
        buttonPlayer3.removeEventListener('click', onClickButtonPlayer3);
    }
    if (buttonPlayer4) {
        buttonPlayer4.removeEventListener('click', onClickButtonPlayer4);
    }
    if (buttonWait1) {
        buttonWait1.removeEventListener('click', onClickButtonWait1);
    }
    if (buttonWait2) {
        buttonWait2.removeEventListener('click', onClickButtonWait2);
    }
    if (buttonWait3) {
        buttonWait3.removeEventListener('click', onClickButtonWait3);
    }
    if (buttonWait4) {
        buttonWait4.removeEventListener('click', onClickButtonWait4);
    }
}
function updatePlaces(arrayFromServer, socketId) {
    places.forEach((place) => {
        place.status = 'waiting-template';
        const serverPositionInfo = findPositionFrom(arrayFromServer, place.position);
        if (serverPositionInfo) {
            if (place.position === serverPositionInfo.position) {
                if (socketId === serverPositionInfo.socketId) {
                    place.status = 'my-player-template'; // Карточка НАШЕГО ИГРОКА
                }
                if ('bot' === serverPositionInfo.socketId) {
                    place.status = 'bot-template'; // Карточка БОТА
                }
                if ('bot' !== serverPositionInfo.socketId && socketId !== serverPositionInfo.socketId) {
                    place.status = 'player-template'; // Карточка ИГРОКА
                }
            }
        }
    })
}
function findPositionFrom(positionsArray, position) {
    let foundPositionInfo = null;
    positionsArray.forEach((positionInfo) => {
        if (position === positionInfo.position) {
            foundPositionInfo = positionInfo;
        }
    })
    return foundPositionInfo;
}
function sendCookie() {
    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        ?.split('=')[1];
    // console.log(document.cookie, 'document.cookie');
    // Отправляем куки на сервер
    socket.emit('sentCookie', cookieValue);
}
function setCookie() {
    let now = new Date();
    now.setHours(now.getHours() + 2);
    const cookieValue = generateId();
    document.cookie = 'userId=' + cookieValue + '; expires=' + now.toUTCString() + '; path=/';
    // console.log(document.cookie, '   cookie set');
}
function generateId() {
    let code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    while (code < 100000) {
        code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }
    return code
}

loadHTML('menu.html', (html) => {
    callback(html);
    playMenuTheme();
    loadToMainPageLink();
    removeEventListeners();
    initEventListeners();

});

socket.on('updateLobby', (positionsArray) => {
    updatePlaces(positionsArray, socket.id);
    let cardContainer = document.getElementById("card-container");
    if (cardContainer) {
        removeCardEventListeners();
        cardContainer.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            loadCard(places[i].status, i);
            setStyleCard(i);
        }
        let countOfPlayers = document.querySelector('.lobby-count-players');
        countOfPlayers.textContent = `PLAYERS ${positionsArray.length}/4`;

        setId();

        initCardsEventListeners();
    }
})