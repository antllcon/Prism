function loadHTML(filename, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", filename);
    xhr.onload = () => {
        callback(xhr.response);
    }
    xhr.send();
}

function callback(html) {
    // Действия, которые необходимо выполнить после загрузки файла
    document.body.innerHTML += html;
}

loadHTML('menu.html', (html) => {
    callback(html)

    loadToMainPageLink();

    buttonBot = document.getElementById('button-bot');
    buttonPlayer = document.getElementById('button-player');
    initEventListeners();
});

let buttonBot;
let buttonPlayer;

function initEventListeners () {
    buttonBot.addEventListener('click', () => {transitionToPage("with_bot.html")});

    buttonPlayer.addEventListener('click', () => {transitionToPage("with-player.html");});
}

//----------------------------------------------------------------------------------------------------------------------
let codeRoom = 0;
const minCodeRoom = 100000
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createPageMenu() {
    // Создание элементов
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.href = '';

    const nameGame = document.createElement('div');
    nameGame.className = 'name-game';
    const nameGameTitle = document.createElement('h1');
    nameGameTitle.className = 'name-game__title';
    nameGameTitle.textContent = 'PRISM';
    nameGame.appendChild(nameGameTitle);

    const centralPart = document.createElement('div');
    centralPart.className = 'central-part';
    const centralPartMenu = document.createElement('div');
    centralPartMenu.className = 'central-part__menu';
    const menuTitle = document.createElement('h1');
    menuTitle.className = 'menu__title';
    menuTitle.textContent = 'PLAY';
    const buttonBot = document.createElement('button');
    buttonBot.className = 'menu__button';
    buttonBot.id = 'button-bot';
    buttonBot.textContent = 'WITH BOT';
    const buttonPlayer = document.createElement('button');
    buttonPlayer.className = 'menu__button player';
    buttonPlayer.id = 'button-player';
    buttonPlayer.textContent = 'WITH PLAYER';
    centralPartMenu.appendChild(menuTitle);
    centralPartMenu.appendChild(buttonBot);
    centralPartMenu.appendChild(buttonPlayer);
    centralPart.appendChild(centralPartMenu);

    const containerName = document.createElement('div');
    containerName.className = 'container-name';
    const containerNameChapterMenu = document.createElement('div');
    containerNameChapterMenu.className = 'container-name__name-chapter-menu';
    const nameChapterTitle = document.createElement('h1');
    nameChapterTitle.className = 'name-chapter__title';
    nameChapterTitle.textContent = 'MAIN MENU';
    containerNameChapterMenu.appendChild(nameChapterTitle);
    containerName.appendChild(containerNameChapterMenu);

    // Добавление элементов на страницу
    document.body.appendChild(logo);
    document.body.appendChild(nameGame);
    document.body.appendChild(centralPart);
    document.body.appendChild(containerName);

    buttonPlayer.addEventListener('click', () => {transitionToPage(createPagePlayer)});
    buttonBot.addEventListener('click', () => {transitionToPage(createPageBot)});
}

function createPageBot() {
    // Создание элементов страницы
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.href = '';

    const nameGame = document.createElement('div');
    nameGame.className = 'name-game';
    const nameGameTitle = document.createElement('h1');
    nameGameTitle.className = 'name-game__title';
    nameGameTitle.textContent = 'PRISM';
    nameGame.appendChild(nameGameTitle);

    const centralPart = document.createElement('div');
    centralPart.className = 'central-part';
    const centralPartBot = document.createElement('div');
    centralPartBot.className = 'central-part__bot';
    const button1vs1 = document.createElement('button');
    button1vs1.className = 'bot__button';
    button1vs1.id = 'button-1vs1';
    button1vs1.textContent = '1 vs 1';
    const button2vs2 = document.createElement('button');
    button2vs2.className = 'bot__button player connect';
    button2vs2.id = 'button-2vs2';
    button2vs2.textContent = '2 vs 2';
    centralPartBot.appendChild(button1vs1);
    centralPartBot.appendChild(button2vs2);
    centralPart.appendChild(centralPartBot);

    const containerName = document.createElement('div');
    containerName.className = 'container-name';
    const containerNameChapterBot = document.createElement('div');
    containerNameChapterBot.className = 'container-name__name-chapter-bot';
    const nameChapterTitle = document.createElement('h1');
    nameChapterTitle.className = 'name-chapter__title';
    nameChapterTitle.textContent = 'WITH BOT';
    containerNameChapterBot.appendChild(nameChapterTitle);
    containerName.appendChild(containerNameChapterBot);

    // Добавление элементов на страницу
    document.body.appendChild(logo);
    document.body.appendChild(nameGame);
    document.body.appendChild(centralPart);
    document.body.appendChild(containerName);

    button1vs1.addEventListener('click', () => {window.location.href = "index.html"});
    button2vs2.addEventListener('click', () => {transitionToPage(createPagePlayer)});
}

// Функция анимации


// Функция создания страницы игрока
function createPagePlayer() {
    // Создание элементов
    const logo= document.createElement('a');
    logo.className = 'logo';
    logo.href = '';

    const nameGame= document.createElement('div');
    nameGame.className = 'name-game';
    const nameGameTitle = document.createElement('h1');
    nameGameTitle.className = 'name-game__title';
    nameGameTitle.textContent = 'PRISM';
    nameGame.appendChild(nameGameTitle);

    const centralPart = document.createElement('div');
    centralPart.className = 'central-part';
    const centralPartPlayer = document.createElement('div');
    centralPartPlayer.className = 'central-part__player';
    const buttonLobby = document.createElement('button');
    buttonLobby.className = 'player__button';
    buttonLobby.id = 'button-lobby';
    buttonLobby.textContent = 'CREATE LOBBY';
    const buttonConnect = document.createElement('button');
    buttonConnect.className = 'player__button player connect';
    buttonConnect.id = 'button-connect';
    buttonConnect.textContent = 'CONNECT';
    const label = document.createElement('label');
    const inputCode = document.createElement('input');
    inputCode.className = 'non-visible';
    inputCode.placeholder = 'ENTER CODE';
    label.appendChild(inputCode);
    centralPartPlayer.appendChild(buttonLobby);
    centralPartPlayer.appendChild(buttonConnect);
    centralPartPlayer.appendChild(label);
    centralPart.appendChild(centralPartPlayer);

    const containerName = document.createElement('div');
    containerName.className = 'container-name';
    const containerNameChapterPlayer = document.createElement('div');
    containerNameChapterPlayer.className = 'container-name__name-chapter-player';
    const nameChapterTitle = document.createElement('h1');
    nameChapterTitle.className = 'name-chapter__title';
    nameChapterTitle.textContent = 'WITH PLAYER';
    containerNameChapterPlayer.appendChild(nameChapterTitle);
    containerName.appendChild(containerNameChapterPlayer);

    // Добавление элементов на страницу
    document.body.appendChild(logo);
    document.body.appendChild(nameGame);
    document.body.appendChild(centralPart);
    document.body.appendChild(containerName);

    buttonLobby.addEventListener("click", () => {
        transitionToPage(createPageLobby);
    });

    buttonConnect.addEventListener("click", () => {
        inputCode.classList.add('player__input')
    });

    codeRoom = 0;
    inputCode.addEventListener('input', (event) => {
        // Удаляем все нецифровые символы
        inputCode.value = inputCode.value.replace(/\D/g, '');

        codeRoom = codeRoom + inputCode.value;
        // Проверяем длину введенного кода
        if (inputCode.value.length === 6) {
            transitionToPage(createPageLobby);
        }
    });
}

function createPageLobby() {
    // Создание элементов страницы
    const nameGame = document.createElement('div');
    nameGame.className = 'name-game-lobby';
    const nameGameTitle = document.createElement('h1');
    nameGameTitle.className = 'name-game__title';
    nameGameTitle.textContent = 'PRISM';
    const nameGameCountPlayers = document.createElement('h2');
    nameGameCountPlayers.className = 'name-game__count-players';
    nameGameCountPlayers.textContent = 'PLAYERS 3/4';
    nameGame.appendChild(nameGameTitle);
    nameGame.appendChild(nameGameCountPlayers);

    const centralPart = document.createElement('div');
    centralPart.className = 'central-part';
    const centralPartPlayer = document.createElement('div');
    centralPartPlayer.className = 'central-part__bot';
    const buttonPlay = document.createElement('button');
    buttonPlay.className = 'bot__button';
    buttonPlay.id = 'button-play';
    buttonPlay.textContent = 'PLAY';
    const buttonMenu = document.createElement('button');
    buttonMenu.className = 'bot__button player connect';
    buttonMenu.id = 'button-menu';
    buttonMenu.textContent = 'MENU';
    centralPartPlayer.appendChild(buttonPlay);
    centralPartPlayer.appendChild(buttonMenu);
    centralPart.appendChild(centralPartPlayer);

    const containerName = document.createElement('div');
    containerName.className = 'container-name-lobby';
    const nameChapterCode = document.createElement('h1');
    nameChapterCode.className = 'name-chapter__code';
    codeRoom = 0;
    if (codeRoom === 0) {
        while (codeRoom < minCodeRoom) {
            codeRoom = getRandomInt(1000000);
            if (codeRoom >= minCodeRoom) {
                nameChapterCode.textContent = codeRoom
            }
        }
    }
    else {
        nameChapterCode.textContent = 1;
    }
    const containerNameChapterLobby = document.createElement('div');
    containerNameChapterLobby.className = 'container-name__name-chapter-lobby';
    const nameChapterTitle = document.createElement('h1');
    nameChapterTitle.className = 'name-chapter__title';
    nameChapterTitle.textContent = 'LOBBY';
    containerNameChapterLobby.appendChild(nameChapterTitle);
    containerName.appendChild(nameChapterCode);
    containerName.appendChild(containerNameChapterLobby);

    // Добавление элементов на страницу
    document.body.appendChild(nameGame);
    document.body.appendChild(centralPart);
    document.body.appendChild(containerName);

    buttonPlay.addEventListener("click", () => {window.location.href = "index.html"});
    buttonMenu.addEventListener("click", () => {transitionToPage(createPageMenu)})
}

function loadToMainPageLink() {
    let toMainPage = document.createElement("a");
    toMainPage.classList.add("logo");
    toMainPage.href = "";
    loadHTML("src/img/prism.svg", (html) => {
        toMainPage.innerHTML = html;
    })
    document.body.appendChild(toMainPage);
}

// Вызов функции для отрисовки страницы
function transitionToPage(file) {
    document.body.innerHTML = '';

    loadHTML(file, (html) => {
        callback(html);
        loadToMainPageLink();
    });
}
// createPageMenu();

