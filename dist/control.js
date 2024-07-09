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

/***/ "./js/control.js":
/*!***********************!*\
  !*** ./js/control.js ***!
  \***********************/
/***/ (() => {

eval("(function () {\n  var pressedKeys = {};\n  function setKey(event, status) {\n    var code = event.keyCode;\n    var key;\n    switch (code) {\n      case 32:\n        key = 'SPACE';\n        break;\n      case 37:\n        key = 'LEFT';\n        break;\n      case 38:\n        key = 'UP';\n        break;\n      case 39:\n        key = 'RIGHT';\n        break;\n      case 40:\n        key = 'DOWN';\n        break;\n      default:\n        // Convert ASCII codes to letters\n        key = String.fromCharCode(code);\n    }\n    pressedKeys[key] = status;\n  }\n  document.addEventListener('keydown', function (e) {\n    setKey(e, true);\n  });\n  document.addEventListener('keyup', function (e) {\n    setKey(e, false);\n  });\n  window.addEventListener('blur', function () {\n    pressedKeys = {};\n  });\n  window.input = {\n    isDown: function isDown(key) {\n      return pressedKeys[key.toUpperCase()];\n    }\n  };\n})();\n\n//# sourceURL=webpack:///./js/control.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/control.js"]();
/******/ 	
/******/ })()
;