import {playMenuTheme} from "./sound/menuThemeAudio";

const socket = io();

let globalRoomId;

let centralPartMenu;
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
            const card = template.content.cloneNode(true);
            cardContainer.appendChild(card);
        }
    }
}

function setStyleCard(index) {
    let cardBackgrounds = document.getElementsByClassName('player');
    let namePlayers = document.getElementsByClassName('player-count');
    let nameCharacters =  document.getElementsByClassName('player-name');
    let navigationArrowsLeft = document.getElementsByClassName('arrow-left');
    let navigationArrowsRight = document.getElementsByClassName('arrow-right');
    let buttonsPickBot = document.getElementsByClassName('player-get-bot');
    let playersPicture = document.getElementsByClassName('player-img');

    if (index < cardBackgrounds.length) {
        let cardBackground = cardBackgrounds[index];
        let namePlayer = namePlayers[index];
        let nameCharacter = nameCharacters[index];
        let navigationArrowLeft = navigationArrowsLeft[index];
        let navigationArrowRight = navigationArrowsRight[index];
        let buttonPickBot = buttonsPickBot[index-1];
        let playerPicture = playersPicture[index];

        if (index === 0) {
            cardBackground.style.backgroundColor = "#6000C1";
            namePlayer.style.color = "#E9D3FF";
            if (nameCharacter) {
                nameCharacter.style.color = "#E9D3FF";
                navigationArrowLeft.style.borderRight = "12px solid #E9D3FF";
                navigationArrowRight.style.borderLeft = "12px solid #E9D3FF";
                playerPicture.src = "src/assets/img/kandinsky-download-1719222086261%201.svg";
            }
            if (buttonPickBot) {
                buttonPickBot.style.backgroundColor = "#3A0272";
                buttonPickBot.style.color = "#EFCEFF";
                playerPicture.style.backgroundColor = "#3A0272";
                playerPicture.src = "src/assets/img/card-background-dark-purple.png";
            }
        }

        if (index === 1) {
            namePlayer.style.color = "#EFCEFF";
            if (nameCharacter) {
                nameCharacter.style.color = "#EFCEFF";
                navigationArrowLeft.style.borderRight = "12px solid #EFCEFF";
                navigationArrowRight.style.borderLeft = "12px solid #EFCEFF";
                playerPicture.src = "src/assets/img/kandinsky-download-1719222086261%201.svg";
            }
            if (buttonPickBot) {
                buttonPickBot.style.backgroundColor = "#8323B0";
                buttonPickBot.style.color = "#EFCEFF";
                playerPicture.style.backgroundColor = "#8323B0";
                playerPicture.src = "src/assets/img/card-background-purple.png";
            }
        }

        if (index === 2) {
            cardBackground.style.backgroundColor = "#FBFF35";
            namePlayer.style.color = "#818414";
            if (nameCharacter) {
                nameCharacter.style.color = "#818414";
                navigationArrowLeft.style.borderRight  = "12px solid #818414";
                navigationArrowRight.style.borderLeft = "12px solid #818414";
                playerPicture.src = "src/assets/img/kandinsky-download-1719222086261%201.svg";
            }
            if (buttonPickBot) {
                buttonPickBot.style.backgroundColor = "#FDFFA3";
                buttonPickBot.style.color = "#AAAC1D";
                playerPicture.style.backgroundColor = "#FDFFA3";
                playerPicture.src = "src/assets/img/card-background-yellow.png";
            }
        }

        if (index === 3) {
            cardBackground.style.backgroundColor = "#FFC635";
            namePlayer.style.color = "#a18122";
            if (nameCharacter) {
                nameCharacter.style.color = "#a18122";
                navigationArrowLeft.style.borderRight = "12px solid #a18122";
                navigationArrowRight.style.borderLeft = "12px solid #a18122";
                playerPicture.src = "src/assets/img/kandinsky-download-1719222086261%201.svg";
            }
            if (buttonPickBot) {
                buttonPickBot.style.backgroundColor = "#FFDA7B"
                buttonPickBot.style.color = "#CFA333";
                playerPicture.style.backgroundColor = "#FFDA7B";
                playerPicture.src = "src/assets/img/card-background-dark-yellow.png";
            }
        }

    } else {
        console.error('Invalid index:', index);
    }
}

function addBot(button) {
    const waitingCard = button.closest('.player');
    const botTemplate = document.getElementById('bot-template');
    if (botTemplate && waitingCard) {
        const botCard = botTemplate.content.cloneNode(true);
        waitingCard.replaceWith(botCard);
    }

    setTimeout(() => {
        setStyleCard(0);
        setStyleCard(1);
        setStyleCard(2);
        setStyleCard(3);
    }, 0);
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

function initCardEventListeners() {
    buttonGetBot = document.querySelectorAll('.player-get-bot'); // выбираем все кнопки

    buttonGetBot.forEach(function(button) {
        button.addEventListener('click', function() {
            addBot(button);
        });
    });
}

function initEventListeners() {
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

    if (buttonBot) {
        buttonBot.addEventListener('click', () => {
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
        loadCard('player-template');
        loadCard('waiting-template');
        loadCard('waiting-template');
        loadCard('waiting-template');

        setTimeout(() => {
            setStyleCard(0);
            setStyleCard(1);
            setStyleCard(2);
            setStyleCard(3);
        }, 0);

        initCardEventListeners(); // Инициализируем события для добавленных карточек
    }

    if (buttonPlay) {
        buttonPlay.addEventListener('click', () => {
            buttonPlay.textContent = 'READY';
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
}

// Initial load of the menu page
loadHTML('menu.html', (html) => {
    callback(html);
    playMenuTheme();
    loadToMainPageLink();
    initEventListeners();
});