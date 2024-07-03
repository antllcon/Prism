/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/menu.js":
/*!********************!*\
  !*** ./js/menu.js ***!
  \********************/
/***/ (() => {

eval("let buttonBot;\r\nlet buttonPlayer;\r\nlet button1vs1;\r\nlet button2vs2;\r\nlet buttonLobby;\r\nlet buttonConnect;\r\nlet buttonPlay;\r\nlet buttonMenu;\r\n\r\nfunction loadHTML(filename, callback) {\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open(\"GET\", filename);\r\n    xhr.onload = () => {\r\n        callback(xhr.response);\r\n    }\r\n    xhr.send();\r\n}\r\n\r\nfunction callback(html) {\r\n    document.body.innerHTML = html;\r\n}\r\n\r\nfunction transitionToPage(file) {\r\n    loadHTML(file, (html) => {\r\n        callback(html);\r\n        if (file === 'menu.html' || file === 'with_bot.html'\r\n            || file === 'with-player.html') {\r\n            loadToMainPageLink();\r\n        }\r\n        initEventListeners();\r\n    });\r\n}\r\n\r\nfunction loadToMainPageLink() {\r\n    let toMainPage = document.createElement(\"a\");\r\n    toMainPage.classList.add(\"logo\");\r\n    toMainPage.href = \"menu_all.html\"; // Меняем на переход на новую страницу\r\n    loadHTML(\"src/img/prism.svg\", (html) => {\r\n        toMainPage.innerHTML = html;\r\n    });\r\n    document.body.appendChild(toMainPage);\r\n}\r\n\r\nfunction initEventListeners() {\r\n    buttonBot = document.getElementById('button-bot');\r\n    buttonPlayer = document.getElementById('button-player');\r\n    button1vs1 = document.getElementById('button-1vs1');\r\n    button2vs2 = document.getElementById('button-2vs2');\r\n    buttonLobby = document.getElementById('button-lobby');\r\n    buttonConnect = document.getElementById('button-connect');\r\n    buttonPlay = document.getElementById('button-play');\r\n    buttonMenu = document.getElementById('button-menu');\r\n\r\n    if (buttonBot) {\r\n        buttonBot.addEventListener('click', () => { transitionToPage(\"with_bot.html\"); });\r\n    }\r\n\r\n    if (buttonPlayer) {\r\n        buttonPlayer.addEventListener('click', () => { transitionToPage(\"with-player.html\"); });\r\n    }\r\n\r\n    if (button1vs1) {\r\n        button1vs1.addEventListener('click', () => { window.location.href = \"index.html\"; });\r\n    }\r\n\r\n    if (button2vs2) {\r\n        button2vs2.addEventListener('click', () => { transitionToPage(\"lobby.html\"); });\r\n    }\r\n\r\n    if (buttonLobby) {\r\n        buttonLobby.addEventListener('click', () => { transitionToPage(\"lobby.html\"); });\r\n    }\r\n\r\n    if (buttonConnect) {\r\n        buttonConnect.addEventListener('click', () => {\r\n            let inputField = document.getElementById('input-code');\r\n            inputField.classList.toggle(\"input-for-code\")\r\n        });\r\n    }\r\n\r\n    if (buttonPlay) {\r\n        buttonPlay.addEventListener('click', () => { window.location.href = \"index.html\"; });\r\n    }\r\n\r\n    if (buttonMenu) {\r\n        buttonMenu.addEventListener('click', () => { transitionToPage(\"menu.html\"); });\r\n    }\r\n}\r\n\r\n// Initial load of the menu page\r\nloadHTML('menu.html', (html) => {\r\n    callback(html);\r\n    loadToMainPageLink();\r\n    initEventListeners();\r\n});\r\n\n\n//# sourceURL=webpack://prism/./js/menu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/menu.js"]();
/******/ 	
/******/ })()
;