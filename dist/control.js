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

/***/ "./js/additional/key-codes.js":
/*!************************************!*\
  !*** ./js/additional/key-codes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   KEY_CODES: () => (/* binding */ KEY_CODES)\n/* harmony export */ });\nconst KEY_CODES = {\r\n    32: 'SPACE',\r\n    37: 'LEFT',\r\n    38: 'UP',\r\n    39: 'RIGHT',\r\n    40: 'DOWN'\r\n};\r\n\n\n//# sourceURL=webpack://prism/./js/additional/key-codes.js?");

/***/ }),

/***/ "./js/control.js":
/*!***********************!*\
  !*** ./js/control.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _additional_key_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./additional/key-codes */ \"./js/additional/key-codes.js\");\n\r\n\r\n(function() {\r\n    document.addEventListener('keydown', (e) => setKey(e, true)) \r\n    document.addEventListener('keyup', (e) => setKey(e, false)) \r\n    window.addEventListener('blur', () => clearPressedKeys()) \r\n    function setKey({ keyCode }, status) {\r\n        let key = _additional_key_codes__WEBPACK_IMPORTED_MODULE_0__.KEY_CODES[keyCode] || String.fromCharCode(keyCode)\r\n        setPressedKey(key, status) \r\n    }\r\n    function setPressedKey(key, status) {\r\n        pressedKeys.set(key.toUpperCase(), status) \r\n    }\r\n    function clearPressedKeys() {\r\n        pressedKeys.clear() \r\n    }\r\n    let pressedKeys = new Map() \r\n    window.input = {\r\n        isDown: (key) => pressedKeys.has(key.toUpperCase()) && pressedKeys.get(key.toUpperCase()),\r\n    }\r\n})()\r\n\n\n//# sourceURL=webpack://prism/./js/control.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/control.js");
/******/ 	
/******/ })()
;