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

eval("(function() {\r\n    let pressedKeys = {};\r\n\r\n    function setKey(event, status) {\r\n        let code = event.keyCode;\r\n        let key;\r\n\r\n        switch(code) {\r\n            case 32:\r\n                key = 'SPACE'; break;\r\n            case 37:\r\n                key = 'LEFT'; break;\r\n            case 38:\r\n                key = 'UP'; break;\r\n            case 39:\r\n                key = 'RIGHT'; break;\r\n            case 40:\r\n                key = 'DOWN'; break;\r\n            default:\r\n                // Convert ASCII codes to letters\r\n                key = String.fromCharCode(code);\r\n        }\r\n\r\n        pressedKeys[key] = status;\r\n    }\r\n\r\n    document.addEventListener('keydown', function(e) {\r\n        setKey(e, true);\r\n    });\r\n\r\n    document.addEventListener('keyup', function(e) {\r\n        setKey(e, false);\r\n    });\r\n\r\n    window.addEventListener('blur', function() {\r\n        pressedKeys = {};\r\n    });\r\n\r\n    window.input = {\r\n        isDown: function(key) {\r\n            return pressedKeys[key.toUpperCase()];\r\n        }\r\n    };\r\n})();\n\n//# sourceURL=webpack://prism/./js/control.js?");

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