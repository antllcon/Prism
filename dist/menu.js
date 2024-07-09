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

eval("var centralPartMenu;\nvar buttonBot;\nvar buttonPlayer;\nvar button1vs1;\nvar button2vs2;\nvar buttonLobby;\nvar buttonConnect;\nvar buttonPlay;\nvar buttonMenu;\nvar audioThemeMenu = new Audio();\naudioThemeMenu.preload = 'auto';\naudioThemeMenu.src = '../src/sound/menu_theme.MP3';\nfunction loadHTML(filename, callback) {\n  var xhr = new XMLHttpRequest();\n  xhr.open(\"GET\", filename);\n  xhr.onload = function () {\n    callback(xhr.response);\n  };\n  xhr.send();\n}\nfunction callback(html) {\n  document.body.innerHTML = html;\n}\nfunction transitionToPage(file) {\n  loadHTML(file, function (html) {\n    callback(html);\n    if (file === 'menu.html' || file === 'with_bot.html' || file === 'with-player.html') {\n      loadToMainPageLink();\n    }\n    initEventListeners();\n  });\n}\nfunction loadToMainPageLink() {\n  var toMainPage = document.createElement(\"a\");\n  toMainPage.classList.add(\"logo\");\n  toMainPage.href = \"\";\n  loadHTML(\"src/img/prism.svg\", function (html) {\n    toMainPage.innerHTML = html;\n  });\n  document.body.appendChild(toMainPage);\n}\nfunction initEventListeners() {\n  // audioThemeMenu.play();\n  centralPartMenu = document.getElementById('central-part-menu');\n  buttonBot = document.getElementById('button-bot');\n  buttonPlayer = document.getElementById('button-player');\n  button1vs1 = document.getElementById('button-1vs1');\n  button2vs2 = document.getElementById('button-2vs2');\n  buttonLobby = document.getElementById('button-lobby');\n  buttonConnect = document.getElementById('button-connect');\n  buttonPlay = document.getElementById('button-play');\n  buttonMenu = document.getElementById('button-menu');\n  if (buttonBot) {\n    buttonBot.addEventListener('click', function () {\n      centralPartMenu.classList.add(\"central-part__menu-animate-out\");\n      setTimeout(function () {\n        return transitionToPage(\"with_bot.html\");\n      }, 2000);\n    });\n  }\n  if (buttonPlayer) {\n    buttonPlayer.addEventListener('click', function () {\n      transitionToPage(\"with-player.html\");\n    });\n  }\n  if (button1vs1) {\n    button1vs1.addEventListener('click', function () {\n      window.location.href = \"index.html\";\n    });\n  }\n  if (button2vs2) {\n    button2vs2.addEventListener('click', function () {\n      transitionToPage(\"lobby.html\");\n    });\n  }\n  if (buttonLobby) {\n    buttonLobby.addEventListener('click', function () {\n      transitionToPage(\"lobby.html\");\n    });\n  }\n  if (buttonConnect) {\n    buttonConnect.addEventListener('click', function () {\n      var inputField = document.getElementById('input-code');\n      inputField.classList.toggle(\"input-for-code\");\n    });\n  }\n  if (buttonPlay) {\n    buttonPlay.addEventListener('click', function () {\n      window.location.href = \"index.html\";\n    });\n  }\n  if (buttonMenu) {\n    buttonMenu.addEventListener('click', function () {\n      transitionToPage(\"menu.html\");\n    });\n  }\n}\n\n// Initial load of the menu page\nloadHTML('menu.html', function (html) {\n  callback(html);\n  loadToMainPageLink();\n  initEventListeners();\n});\n\n//# sourceURL=webpack:///./js/menu.js?");

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