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

eval("(function () {\n  function Sprite(url, pos, size, speed, frames, dir, once) {\n    this.pos = pos;\n    this.size = size;\n    this.speed = typeof speed === 'number' ? speed : 0;\n    this.frames = frames;\n    this._index = 0;\n    this.url = url;\n    this.dir = dir || 'horizontal';\n    this.once = once;\n  }\n  Sprite.prototype = {\n    render: function render(canvasContext, resources) {\n      var frame;\n      if (this.speed > 0) {\n        var max = this.frames.length;\n        var idx = Math.floor(this._index);\n        frame = this.frames[idx % max];\n        if (this.once && idx >= max) {\n          return;\n        }\n      } else {\n        frame = 0;\n      }\n      var x = this.pos[0];\n      var y = this.pos[1];\n      if (this.dir === 'vertical') {\n        y += frame * this.size[1];\n      } else {\n        x += frame * this.size[0];\n      }\n      canvasContext.drawImage(resources.get(this.url), x, y, this.size[0], this.size[1], 0, 0, this.size[0], this.size[1]);\n    }\n  };\n  window.Sprite = Sprite;\n})();\n\n//# sourceURL=webpack:///./js/sprite.js?");

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