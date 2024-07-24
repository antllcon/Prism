import {playMenuTheme} from "./sound/menuThemeAudio";

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
        if (file === 'menu.html' || file === 'with_bot.html' || file === 'with-player.html') {
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
    if (template) {
        const cardContainer = document.getElementById('card-container');
        if (cardContainer) {
            let card = template.content.cloneNode(true);
            let cardNode = card.querySelector('.player');
            cardContainer.appendChild(card);
            return cardNode;
        }
    }
}

function setStyleCard(index) {
    let cardBackgrounds = document.getElementsByClassName('player');

    if (index < cardBackgrounds.length) {
        let cardBackground = cardBackgrounds[index];

        let namePlayer = cardBackground.querySelector('.player-count');
        let nameCharacter =  cardBackground.querySelector('.player-name');
        let navigationArrowLeft = cardBackground.querySelector('.arrow-left');
        let navigationArrowRight = cardBackground.querySelector('.arrow-right');
        let buttonPickBot = cardBackground.querySelector('.get-bot');
        let buttonPickPlayer = cardBackground.querySelector('.get-player');
        let buttonPickWait = cardBackground.querySelector('.get-wait');

        let playerPicture = cardBackground.querySelector('.player-img');

        let styles = cardStyles[index];

        cardBackground.style.backgroundColor = styles.backgroundColor;
        namePlayer.style.color = styles.namePlayerColor;
        if (nameCharacter) {
            nameCharacter.textContent = styles.nameCharacter.value;
            nameCharacter.style.color = styles.nameCharacter.color;
            navigationArrowLeft.style.borderRight = styles.nameCharacter.borderRight;
            navigationArrowRight.style.borderLeft = styles.nameCharacter.borderLeft;
            playerPicture.src = styles.nameCharacter.src;
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

function addBot(button) {
    const waitingCard = button.closest('.player');
    const botTemplate = document.getElementById('bot-template');
    if (botTemplate && waitingCard) {
        const botCard = botTemplate.content.cloneNode(true);

        let card = botCard.querySelector(".player")
        waitingCard.replaceWith(botCard);

        setTimeout(() => {
            setStyleCard(0);
            setStyleCard(1);
            setStyleCard(2);
            setStyleCard(3);
        }, 0);

        return card;
    }
}

function addPlayer(button) {
    let buttonGetWait = currentPlayerCard.querySelector('.get-wait');
    let card = addWait(buttonGetWait);
    initCardEventListener(card);

    const playerTemplate = document.getElementById('player-template');
    const waitingCard = button.closest('.player');
    if (playerTemplate && waitingCard) {
        const playerCard = playerTemplate.content.cloneNode(true);

        let card = playerCard.querySelector(".player")
        waitingCard.replaceWith(playerCard);

        setTimeout(() => {
            setStyleCard(0);
            setStyleCard(1);
            setStyleCard(2);
            setStyleCard(3);
        }, 0);

        return card;
    }
}

function addWait(button) {
    const tempCard = button.closest('.player');
    const waitTemplate = document.getElementById('waiting-template');
    if (waitTemplate && tempCard) {
        const waitCard = waitTemplate.content.cloneNode(true);

        let card = waitCard.querySelector(".player");
        tempCard.replaceWith(waitCard);

        setTimeout(() => {
            setStyleCard(0);
            setStyleCard(1);
            setStyleCard(2);
            setStyleCard(3);
        }, 0);

        return card;
    }
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

function initCardEventListeners() {
    let playerCards = document.querySelectorAll('.player');

    playerCards.forEach(initCardEventListener);
}

function initCardEventListener(card, indexCount) {
    let navigationArrowLeft = card.querySelector('.button-left');
    let navigationArrowRight = card.querySelector('.button-right');
    let buttonGetWait = card.querySelector('.get-wait');
    let buttonGetBot = card.querySelector('.get-bot');
    let buttonGetPlayer = card.querySelector('.get-player');

    if (buttonGetBot) {
        buttonGetBot.addEventListener('click', function () {
            let botCard = addBot(buttonGetBot);

            if (botCard) {
                initCardEventListener(botCard, indexCount);
            }
        });
    }

    if (buttonGetPlayer) {
        buttonGetPlayer.addEventListener('click', function () {
            currentPlayerCard = addPlayer(buttonGetPlayer);

            if (currentPlayerCard) {
                initCardEventListener(currentPlayerCard, indexCount);
            }
        });
    }

    if (buttonGetWait) {
        buttonGetWait.addEventListener('click', function() {
            let card = addWait(buttonGetWait);
            initCardEventListener(card);
        });
    }

    navigationArrowLeft.addEventListener('click', () => {
        cardStyles[indexCount].nameCharacter.character--;
        if (cardStyles[indexCount].nameCharacter.character < 0) {
            cardStyles[indexCount].nameCharacter.character = playerImages.length-1;
        }
        setStyleCard(indexCount);
    });

    navigationArrowRight.addEventListener('click', () => {
        cardStyles[indexCount].nameCharacter.character++;
        if (cardStyles[indexCount].nameCharacter.character > playerImages.length-1) {
            cardStyles[indexCount].nameCharacter.character = 0;
        }
        setStyleCard(indexCount);
    });
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
        buttonLogo.addEventListener('click', () => { transitionToPage("menu.html"); });
    }

    if (buttonBot) {
        buttonBot.addEventListener('click', () => {transitionToPage("with_bot.html")});
    }

    if (buttonPlayer) {
        buttonPlayer.addEventListener('click', () => {
            if (!(document.cookie.indexOf('userId') > -1)) {
                setCookie();
                sendCookie();
            }
            transitionToPage("with-player.html");
        });
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
            socket.on('requestForCookie', () => {
                sendCookie();
            })
            socket.on('joinedRoom', (roomId) => {
                globalRoomId = roomId;
                transitionToPage("lobby.html");
            });
        });
    }

    if (buttonConnect) {
        buttonConnect.addEventListener('click', () => {
            inputRoomId.classList.toggle("input-for-code");
        });
    }

    if (inputRoomId) {
        inputRoomId.addEventListener('input', () => {
            inputRoomId.value = inputRoomId.value.replace(/\D/g, '');
            if (inputRoomId.value.length === 6) {
                let codeRoom = document.getElementById('input-code').value;
                socket.emit('joinRoom', codeRoom);
                socket.on('requestForCookie', () => {
                    sendCookie();
                })
                socket.on('joinedRoom', (roomId) => {
                    globalRoomId = roomId;
                    transitionToPage("lobby.html");
                });
                socket.on('wrongId', () => {
                    // добавить обработку несуществующего айди комнаты
                });
            }
            if (inputRoomId.value.length > 6) {
                inputRoomId.value = inputRoomId.value.slice(0, 6);
            }
        });
    }

    if (cardBox) {
        currentPlayerCard = loadCard('player-template');
        loadCard('waiting-template');
        loadCard('waiting-template');
        loadCard('waiting-template');

        setTimeout(() => {
            setStyleCard(0);
            setStyleCard(1);
            setStyleCard(2);
            setStyleCard(3);
        }, 0);

        initCardEventListeners();
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => {
            buttonPlay.textContent = 'READY';
            socket.emit('playerIsReady');
            socket.on('roomIsReady', () => {
                window.location.href = "game.html";
            })
            setTimeout(() => {
                window.location.href = "game.html";
            }, 1000);
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

    // window.addEventListener('beforeunload', function(e) {
    //     e.preventDefault(); // Предотвращаем стандартное поведение
    //     e.returnValue = ''; // Убираем сообщение о подтверждении
    //     // Здесь вы можете вызвать функцию для отправки уведомления на сервер
    //     socket.emit('pageRefreshed');
    // })

}

function sendCookie() {
    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        ?.split('=')[1];
    // Отправляем куки на сервер
    socket.emit('sentCookie', cookieValue);
}
function setCookie() {
    let now = new Date();
    now.setHours(now.getHours() + 2);
    const cookieValue = generateId();
    document.cookie = 'userId=' + cookieValue + '; expires=' + now.toUTCString() + '; path=/';
}
function generateId() {
    let uniqueId = Math.random().toString().slice(-6);
    uniqueId = parseInt(uniqueId);
    return uniqueId;
}

loadHTML('menu.html', (html) => {
    callback(html);
    playMenuTheme();
    loadToMainPageLink();
    initEventListeners();
});