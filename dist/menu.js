/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/additional/html-loader.js":
/*!**************************************!*\
  !*** ./js/additional/html-loader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   callback: () => (/* binding */ callback),\n/* harmony export */   loadHTML: () => (/* binding */ loadHTML),\n/* harmony export */   loadToMainPageLink: () => (/* binding */ loadToMainPageLink)\n/* harmony export */ });\n\r\nfunction loadHTML(filename, callback) {\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open(\"GET\", filename);\r\n    xhr.onload = () => {\r\n        callback(xhr.response);\r\n    }\r\n    xhr.send();\r\n}\r\n\r\nfunction callback(html) {\r\n    document.body.innerHTML = html;\r\n}\r\n\r\nfunction loadToMainPageLink() {\r\n    let toMainPage = document.createElement(\"a\");\r\n    toMainPage.classList.add(\"logo\");\r\n    toMainPage.href = \"menu_all.html\"; // Меняем на переход на новую страницу\r\n    loadHTML(\"src/img/prism.svg\", (html) => {\r\n        toMainPage.innerHTML = html;\r\n    });\r\n    document.body.appendChild(toMainPage);\r\n}\n\n//# sourceURL=webpack://prism/./js/additional/html-loader.js?");

/***/ }),

/***/ "./js/menu.js":
/*!********************!*\
  !*** ./js/menu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./additional/html-loader.js */ \"./js/additional/html-loader.js\");\n\r\n\r\n\r\n\r\nfunction transitionToPage(file) {\r\n    (0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadHTML)(file, (html) => {\r\n        (0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.callback)(html);\r\n        if (file === 'menu.html' || file === 'with_bot.html' || file === 'with-player.html') {\r\n            (0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadToMainPageLink)();\r\n        }\r\n        initEventListeners();\r\n    });\r\n}\r\n\r\n\r\nfunction initEventListeners() {\r\n    let buttonBot = document.getElementById('button-bot');\r\n    let buttonPlayer = document.getElementById('button-player');\r\n    let button1vs1 = document.getElementById('button-1vs1');\r\n    let button2vs2 = document.getElementById('button-2vs2');\r\n    let buttonLobby = document.getElementById('button-lobby');\r\n    let buttonConnect = document.getElementById('button-connect');\r\n    let buttonPlay = document.getElementById('button-play');\r\n    let buttonMenu = document.getElementById('button-menu');\r\n\r\n    if (buttonBot) {\r\n        buttonBot.addEventListener('click', () => { transitionToPage(\"with_bot.html\"); });\r\n    }\r\n\r\n    if (buttonPlayer) {\r\n        buttonPlayer.addEventListener('click', () => { transitionToPage(\"with-player.html\"); });\r\n    }\r\n\r\n    if (button1vs1) {\r\n        button1vs1.addEventListener('click', () => { window.location.href = \"index.html\"; });\r\n    }\r\n\r\n    if (button2vs2) {\r\n        button2vs2.addEventListener('click', () => { transitionToPage(\"lobby.html\"); });\r\n    }\r\n\r\n    if (buttonLobby) {\r\n        buttonLobby.addEventListener('click', () => { transitionToPage(\"lobby.html\"); });\r\n    }\r\n\r\n    if (buttonConnect) {\r\n        buttonConnect.addEventListener('click', () => {\r\n            let inputField = document.getElementById('input-code');\r\n            inputField.classList.toggle(\"input-for-code\")\r\n        });\r\n    }\r\n\r\n    if (buttonPlay) {\r\n        buttonPlay.addEventListener('click', () => { window.location.href = \"index.html\"; });\r\n    }\r\n\r\n    if (buttonMenu) {\r\n        buttonMenu.addEventListener('click', () => { transitionToPage(\"menu.html\"); });\r\n    }\r\n}\r\n\r\n// Initial load of the menu page\r\n(0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadHTML)('menu.html', (html) => {\r\n    (0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.callback)(html);\r\n    (0,_additional_html_loader_js__WEBPACK_IMPORTED_MODULE_0__.loadToMainPageLink)();\r\n    initEventListeners();\r\n});\r\n\n\n//# sourceURL=webpack://prism/./js/menu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/menu.js");
/******/ 	
/******/ })()
;