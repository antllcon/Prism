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

/***/ "./js/sprite.js":
/*!**********************!*\
  !*** ./js/sprite.js ***!
  \**********************/
/***/ (() => {

eval("\r\n(function() {\r\n    function Sprite(url, pos, size, speed, frames, dir, once) {\r\n        this.pos = pos;\r\n        this.size = size;\r\n        this.speed = typeof speed === 'number' ? speed : 0;\r\n        this.frames = frames;\r\n        this._index = 0;\r\n        this.url = url;\r\n        this.dir = dir || 'horizontal';\r\n        this.once = once;\r\n    }\r\n\r\n    Sprite.prototype = {\r\n        render: function(canvasContext, resources) {\r\n            let frame;\r\n\r\n            if(this.speed > 0) {\r\n                let max = this.frames.length;\r\n                let idx = Math.floor(this._index);\r\n                frame = this.frames[idx % max];\r\n\r\n                if(this.once && idx >= max) {\r\n                    return;\r\n                }\r\n            }\r\n            else {\r\n                frame = 0;\r\n            }\r\n\r\n\r\n            let x = this.pos[0];\r\n            let y = this.pos[1];\r\n\r\n            if(this.dir === 'vertical') {\r\n                y += frame * this.size[1];\r\n            }\r\n            else {\r\n                x += frame * this.size[0];\r\n            }\r\n\r\n            canvasContext.drawImage(resources.get(this.url),\r\n                          x, y,\r\n                          this.size[0], this.size[1],\r\n                          0, 0,\r\n                          this.size[0], this.size[1]);\r\n        }\r\n    };\r\n\r\n    window.Sprite = Sprite;\r\n})();\n\n//# sourceURL=webpack://prism/./js/sprite.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/sprite.js"]();
/******/ 	
/******/ })()
;