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

/***/ "./js/singlePlayer.js":
/*!****************************!*\
  !*** ./js/singlePlayer.js ***!
  \****************************/
/***/ (() => {

eval("var canvasWidth = 1820;\nvar canvasHeight = 1024;\nvar red = \"#f8df5c\";\nvar green = \"#8f23dc\";\nvar gray = \"#666\";\nvar dark = \"#333\";\nvar black = \"#111\";\nvar white = \"#FFF\";\nvar GAME_STATES = {\n  START: \"start\",\n  PLAY: \"play\",\n  VICTORY: \"victory\",\n  PAUSE: \"pause\"\n};\nvar PLAYER_STATES = {\n  ACTIVE: 'active',\n  STUNNED: 'stunned',\n  DEAD: 'dead'\n};\nvar BOT_STATES = {\n  ACTIVE: 'active',\n  STUNNED: 'stunned',\n  DEAD: 'dead'\n};\nvar POINT_STATES = {\n  ACTIVE: 'active',\n  INACTIVE: 'inactive',\n  INVISIBLE: 'invisible'\n};\nvar POINT_TYPES = {\n  LINE: \"line\",\n  TRIGRAPH: \"trigraph\",\n  CROSS: \"cross\"\n};\nvar TEAM_STATES = {\n  NONE: \"none\",\n  PURPLE: \"purple\",\n  YELLOW: \"yellow\"\n};\nvar SCORE = {\n  color: white,\n  team1: 0,\n  team2: 0\n};\nvar DEFAULT_POINTS = [{\n  id: 0,\n  x: 910,\n  // canvasWidth / 2\n  y: 20,\n  // topLinePointDistance\n  width: 10,\n  height: 10,\n  size: 1000,\n  type: POINT_TYPES.LINE,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INACTIVE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 1,\n  x: 910,\n  // canvasWidth / 2\n  y: 1004,\n  // canvasHeight - bottomLinePointDistance\n  width: 10,\n  height: 10,\n  size: 1000,\n  type: POINT_TYPES.LINE,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INACTIVE,\n  speed: 0,\n  direction: Math.PI\n}, {\n  id: 2,\n  x: 455,\n  // canvasWidth / 4\n  y: 512,\n  // canvasHeight / 2\n  width: 10,\n  height: 10,\n  size: 350,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 150,\n  direction: 0\n}, {\n  id: 3,\n  x: 1365,\n  // canvasWidth / 4 * 3\n  y: 512,\n  // canvasHeight / 2\n  width: 10,\n  height: 10,\n  size: 350,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 150,\n  direction: Math.PI\n}, {\n  id: 4,\n  x: 910,\n  // canvasWidth / 2\n  y: 512,\n  // canvasHeight / 2\n  width: 10,\n  height: 10,\n  size: 2100,\n  type: POINT_TYPES.CROSS,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 5,\n  x: 1592.5,\n  // canvasWidth * (7 / 8)\n  y: 804,\n  // canvasHeight - bottomPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 6,\n  x: 227.5,\n  // canvasWidth * (1 / 8)\n  y: 804,\n  // canvasHeight - bottomPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 7,\n  x: 682.5,\n  // canvasWidth * (3 / 8)\n  y: 804,\n  // canvasHeight - bottomPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 8,\n  x: 1137.5,\n  // canvasWidth * (5 / 8)\n  y: 804,\n  // canvasHeight - bottomPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 9,\n  x: 1592.5,\n  // canvasWidth * (7 / 8)\n  y: 210,\n  // topPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 10,\n  x: 227.5,\n  // canvasWidth * (1 / 8)\n  y: 210,\n  // topPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 11,\n  x: 682.5,\n  // canvasWidth * (3 / 8)\n  y: 210,\n  // topPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}, {\n  id: 12,\n  x: 1137.5,\n  // canvasWidth * (5 / 8)\n  y: 210,\n  // topPointCrossDistance\n  width: 10,\n  height: 10,\n  size: 500,\n  type: POINT_TYPES.TRIGRAPH,\n  team: TEAM_STATES.NONE,\n  color: gray,\n  angle: 0,\n  existTime: 10000,\n  state: POINT_STATES.INVISIBLE,\n  speed: 0,\n  direction: 0\n}];\nvar canvas = document.getElementById(\"canvas\");\nvar gameTime = 0;\nvar lastTime;\nvar countdownAudio = new Audio();\ncountdownAudio.preload = 'auto';\ncountdownAudio.src = '../src/sound/countdown.MP3';\nvar gameThemeAudio = new Audio();\ngameThemeAudio.preload = 'auto';\ngameThemeAudio.src = '../src/sound/game_theme.MP3';\ngameThemeAudio.loop = true;\ngameThemeAudio.autoplay = true;\nfunction playLaserSound() {\n  var laserSound = new Audio('../src/sound/laser_appearance.MP3');\n  laserSound.play();\n}\nvar scoreAlpha = 0.2;\nvar botStartX = canvasWidth - 50;\nvar botStartY = canvasHeight / 2;\nvar playerStartX = 50;\nvar playerStartY = canvasHeight / 2;\nvar GAME = {\n  width: canvasWidth,\n  height: canvasHeight,\n  background: dark,\n  state: GAME_STATES.PLAY\n};\nvar PLAYER = {\n  x: 30,\n  y: 30,\n  size: 10,\n  speed: 300,\n  team: TEAM_STATES.PURPLE,\n  color: black,\n  state: PLAYER_STATES.ACTIVE\n};\nvar BOT = {\n  x: 200,\n  y: 200,\n  size: 10,\n  color: red,\n  speed: 300,\n  team: TEAM_STATES.YELLOW,\n  state: BOT_STATES.ACTIVE,\n  side: 'enemy'\n};\nvar POINTS = DEFAULT_POINTS.map(createPoint);\nfunction createPoint(point) {\n  return {\n    id: point.id,\n    x: point.x,\n    y: point.y,\n    width: point.width,\n    height: point.height,\n    size: point.size,\n    type: point.type,\n    team: point.team,\n    color: point.color,\n    angle: point.angle,\n    existTime: point.existTime,\n    activationTime: null,\n    state: point.state,\n    speed: point.speed,\n    direction: point.direction\n  };\n}\nfunction resetPoint(point, index) {\n  var defaultPoint = DEFAULT_POINTS[index];\n  point.id = defaultPoint.id;\n  point.y = defaultPoint.y;\n  point.width = defaultPoint.width;\n  point.height = defaultPoint.height;\n  point.size = defaultPoint.size;\n  point.type = defaultPoint.type;\n  point.team = defaultPoint.team;\n  point.color = defaultPoint.color;\n  point.existTime = defaultPoint.existTime;\n  point.activationTime = null;\n  point.state = POINT_STATES.INACTIVE;\n  point.speed = defaultPoint.speed;\n}\nfunction respawnPoint(point) {\n  if (point.id !== 0 && point.id !== 1) {\n    point.state = POINT_STATES.INVISIBLE;\n  }\n  point.team = TEAM_STATES.NONE;\n  point.activationTime = null;\n  point.color = gray;\n  point.height = 10;\n}\nvar ctx = canvas.getContext(\"2d\");\ncanvas.width = GAME.width;\ncanvas.height = GAME.height;\nfunction drawBackground() {\n  ctx.fillStyle = GAME.background;\n  ctx.fillRect(0, 0, GAME.width, GAME.height);\n}\nfunction drawScore() {\n  ctx.save();\n  ctx.globalAlpha = scoreAlpha;\n  ctx.fillStyle = SCORE.color;\n  ctx.font = \"100px Font Over\";\n  ctx.fillText(\"\".concat(SCORE.team1, \":\").concat(SCORE.team2), 50, 100);\n  ctx.restore();\n}\nfunction drawFinalScore() {\n  ctx.save();\n  ctx.globalAlpha = scoreAlpha;\n  ctx.fillStyle = SCORE.color;\n  ctx.font = \"700px Font Over\";\n  ctx.fillText(\"\".concat(SCORE.team1, \":\").concat(SCORE.team2), 270, 750);\n  ctx.restore();\n}\nfunction drawBot() {\n  if (BOT.team === TEAM_STATES.PURPLE) {\n    PLAYER.color = red;\n  }\n  if (PLAYER.team === TEAM_STATES.YELLOW) {\n    PLAYER.color = green;\n  }\n  if (BOT.state === BOT_STATES.ACTIVE) {\n    ctx.fillStyle = BOT.color;\n    ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);\n  }\n  if (BOT.state === BOT_STATES.DEAD) {\n    setTimeout(function () {\n      BOT.color = red;\n      BOT.x = botStartX;\n      BOT.y = botStartY;\n      BOT.state = BOT_STATES.ACTIVE;\n    }, 1000);\n  }\n}\nfunction drawPlayer() {\n  if (PLAYER.state === PLAYER_STATES.ACTIVE) {\n    if (PLAYER.team === TEAM_STATES.PURPLE) {\n      PLAYER.color = green;\n    }\n    if (PLAYER.team === TEAM_STATES.YELLOW) {\n      PLAYER.color = red;\n    }\n    ctx.fillStyle = PLAYER.color;\n    ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);\n  }\n  if (PLAYER.state === PLAYER_STATES.DEAD) {\n    setTimeout(function () {\n      PLAYER.color = green;\n      PLAYER.x = 10;\n      PLAYER.y = 10;\n      PLAYER.state = PLAYER_STATES.ACTIVE;\n    }, 1000); // Changed delay to 1000ms\n  }\n}\nfunction drawPoints() {\n  POINTS.forEach(function (point) {\n    if (point.state === POINT_STATES.ACTIVE) {\n      if (point.type === POINT_TYPES.CROSS) {\n        point.angle += Math.PI / 180;\n        ctx.save();\n        ctx.translate(point.x, point.y);\n        ctx.rotate(point.angle);\n        ctx.strokeStyle = point.color;\n        ctx.lineWidth = 5;\n        ctx.beginPath();\n        ctx.moveTo(-point.size / 2, 0);\n        ctx.lineTo(point.size / 2, 0);\n        ctx.moveTo(0, -point.size / 2);\n        ctx.lineTo(0, point.size / 2);\n        ctx.stroke();\n        ctx.restore();\n      }\n      if (point.type === POINT_TYPES.TRIGRAPH) {\n        point.angle += Math.PI / 180;\n        ctx.save();\n        ctx.translate(point.x, point.y);\n        ctx.rotate(point.angle);\n        ctx.strokeStyle = point.color;\n        ctx.lineWidth = 5;\n        ctx.beginPath();\n        ctx.moveTo(point.size / 2, 0);\n        ctx.lineTo(0, 0);\n        ctx.moveTo(0, 0);\n        ctx.lineTo(-point.size / 2 * Math.cos(Math.PI / 3), -point.size / 2 * Math.sin(Math.PI / 3));\n        ctx.moveTo(0, 0);\n        ctx.lineTo(-point.size / 2 * Math.cos(-Math.PI / 3), -point.size / 2 * Math.sin(-Math.PI / 3));\n        ctx.stroke();\n        ctx.restore();\n      }\n      if (point.type === POINT_TYPES.LINE) {\n        ctx.save();\n        ctx.translate(point.x, point.y);\n        ctx.strokeStyle = point.color;\n        ctx.lineWidth = 5;\n        ctx.beginPath();\n        ctx.moveTo(point.size, 0);\n        ctx.lineTo(-point.size, 0);\n        ctx.stroke();\n        ctx.restore();\n      }\n    }\n    if (point.state === POINT_STATES.INACTIVE) {\n      point.angle += Math.PI / 180;\n      ctx.save();\n      ctx.translate(point.x + point.width / 2, point.y + point.height / 2);\n      ctx.rotate(point.angle);\n      ctx.fillStyle = point.color;\n      ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);\n      ctx.restore();\n    }\n    if (point.state === POINT_STATES.INVISIBLE) {}\n  });\n}\nfunction fadeOutScore() {\n  // Уменьшаем уровень прозрачности каждые 100 миллисекунд\n  var fadeOutInterval = setInterval(function () {\n    scoreAlpha -= 0.02; // Регулируйте значение для изменения скорости исчезания\n\n    // Останавливаем интервал, когда прозрачность достигает или падает ниже нуля\n    if (scoreAlpha <= 0) {\n      clearInterval(fadeOutInterval);\n      scoreAlpha = 0; // Убедитесь, что значение не станет отрицательным\n    }\n  }, 30); // Интервал времени в миллисекундах\n}\nfunction render() {\n  ctx.clearRect(0, 0, GAME.width, GAME.height);\n  drawBackground();\n  drawScore();\n  drawPoints();\n  drawPlayer();\n  drawBot();\n}\nfunction resetLevel() {\n  gameTime = -4.2;\n  cordInit(); // Сбрасываем координаты игрока и бота\n\n  // Сбрасываем параметры игрока\n  PLAYER.state = PLAYER_STATES.ACTIVE;\n  PLAYER.x = playerStartX;\n  PLAYER.y = playerStartY;\n  PLAYER.speed = 300; // сброс скорости, если она менялась\n  PLAYER.team = TEAM_STATES.PURPLE; // сброс команды, если это актуально\n\n  // Сбрасываем параметры бота\n  BOT.state = BOT_STATES.ACTIVE;\n  BOT.x = botStartX;\n  BOT.y = botStartY;\n  BOT.speed = 300; // сброс скорости, если она менялась\n  BOT.team = TEAM_STATES.YELLOW; // сброс команды, если это актуально\n\n  scoreAlpha = 0.2; // Сброс прозрачности счёта\n\n  // Сбрасываем параметры всех точек\n  POINTS.forEach(function (point, index) {\n    respawnPoint(point, index);\n  });\n  setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта\n  // countdown(); // Запускаем анимацию и звук отсчёта\n}\nfunction init() {\n  cordInit();\n  drawBackground();\n  drawScore();\n  drawPoints();\n  drawPlayer();\n  drawBot();\n  countdown();\n}\nfunction countdown() {\n  // let inputTime = Date.now();\n  var background = document.createElement(\"div\");\n  var countdownGif = document.createElement(\"img\");\n  document.body.appendChild(background);\n  background.classList.add('background-countdown');\n  background.appendChild(countdownGif);\n  countdownGif.src = \"src/img/cat.gif\";\n  countdownAudio.play();\n  setTimeout(function () {\n    gameThemeAudio.play();\n    background.remove();\n    countdownGif.remove();\n    lastTime = Date.now();\n    main();\n  }, 4200);\n}\nfunction cordInit() {\n  PLAYER.x = playerStartX;\n  PLAYER.y = playerStartY;\n  BOT.x = botStartX;\n  BOT.y = botStartY;\n}\nfunction main() {\n  var now = Date.now();\n  var dt = (now - lastTime) / 1000.0;\n  if (SCORE.team1 < 3 && SCORE.team2 < 3) {\n    update(dt);\n    render();\n  } else {\n    drawBackground();\n    drawFinalScore();\n    setTimeout(function () {\n      window.location.href = 'menu_all.html';\n    }, 1500);\n  }\n  lastTime = now;\n  requestAnimFrame(main);\n}\nfunction update(dt) {\n  gameTime += dt;\n  botMovement(dt);\n  handleInput(dt);\n  checkCollisions();\n  updateEntities(dt);\n}\nfunction botMovement(dt) {\n  var loopIndexInactive = 0;\n  var loopIndexActive = 0;\n  var idInactive;\n  var dxMinInactive;\n  var dyMinInactive;\n  var hypMinInactive;\n  var idActive;\n  var dxMinActive;\n  var dyMinActive;\n  var hypMinActive;\n  var inRangeOfLaser;\n  var dxInactive;\n  var dxActive;\n  var dyInactive;\n  var dyActive;\n  findNearestPoint(POINTS);\n  if (inRangeOfLaser) {\n    moveBotOutOfLaserSpiral(); // заносит в dxActive и dyActive приращение для убегания по спирали\n  }\n  moveBotToLaser(); // заносит в dxInactive и dyInactive приращение для движения к цели\n  getRightDirection(); // дает приоритет убеганию, контролирует предельную скорость\n\n  function findNearestPoint(POINTS) {\n    POINTS.forEach(function (point) {\n      findInactivePointAndCompare(point);\n      findActivePointInArea(point);\n    });\n  }\n  function findInactivePointAndCompare(point) {\n    if (point.state === POINT_STATES.INACTIVE) {\n      if (loopIndexInactive === 0) {\n        idInactive = 0;\n        dxMinInactive = point.x - BOT.x;\n        dyMinInactive = point.y - BOT.y;\n        hypMinInactive = Math.sqrt(Math.pow(dxMinInactive, 2) + Math.pow(dyMinInactive, 2));\n      }\n      var dy;\n      var dx;\n      if (Math.abs(point.y + (GAME.height - BOT.y)) < Math.abs(point.y - BOT.y)) {\n        dy = point.y + (GAME.height - BOT.y);\n      } else {\n        dy = point.y - BOT.y;\n      }\n      if (Math.abs(point.x + (GAME.width - BOT.x)) < Math.abs(point.x - BOT.x)) {\n        dx = point.x + (GAME.width - BOT.x);\n      } else {\n        dx = point.x - BOT.x;\n      }\n      var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n      if (hyp < hypMinInactive) {\n        idInactive = point.id;\n        dxMinInactive = dx;\n        dyMinInactive = dy;\n        hypMinInactive = hyp;\n      }\n      loopIndexInactive++;\n    }\n  }\n  function findActivePointInArea(point) {\n    if (point.state === POINT_STATES.ACTIVE) {\n      if (loopIndexActive === 0) {\n        idInactive = 0;\n        dxMinActive = point.x - BOT.x;\n        dyMinActive = point.y - BOT.y;\n        hypMinActive = Math.sqrt(Math.pow(dxMinActive, 2) + Math.pow(dyMinActive, 2));\n      }\n      var dx = point.x - BOT.x;\n      var dy = point.y - BOT.y;\n      var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n      if (hyp < hypMinActive) {\n        idActive = point.id;\n        dxMinActive = dx;\n        dyMinActive = dy;\n        hypMinActive = hyp;\n      }\n      inRangeOfLaser = hypMinActive - BOT.size * Math.sqrt(2) < point.size / 2;\n      loopIndexActive++;\n    }\n  }\n  function moveBotToLaser() {\n    dxInactive = BOT.speed * dxMinInactive / hypMinInactive * dt;\n    dyInactive = BOT.speed * dyMinInactive / hypMinInactive * dt;\n  }\n  function moveBotOutOfLaserSpiral() {\n    // Определяем угол между ботом и точкой\n    var angle = Math.atan2(dyMinActive, dxMinActive);\n\n    // Радиальная скорость (от центра прочь)\n    var radialSpeed = BOT.speed * dt;\n\n    // Угловая скорость (по окружности)\n    var angularSpeed = BOT.speed * dt / hypMinActive;\n    // Обновляем координаты бота\n    dxActive = angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);\n    dyActive = -1 * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);\n  }\n  function getRightDirection() {\n    if (inRangeOfLaser) {\n      if (dxActive * dxInactive >= 0 && dyActive * dyInactive >= 0) {\n        if (Math.sqrt(Math.pow(dxActive + dxInactive, 2) + Math.pow(dyActive + dyInactive, 2)) < BOT.speed * dt) {\n          BOT.x += dxActive + dxInactive;\n          BOT.y += dyActive + dyInactive;\n        } else {\n          var angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);\n          BOT.x += BOT.speed * dt * Math.cos(angle);\n          BOT.y += BOT.speed * dt * Math.sin(angle);\n        }\n      }\n      if (dxActive * dxInactive >= 0 && dyActive * dyInactive < 0) {\n        if (Math.sqrt(Math.pow(dxActive + dxInactive, 2) + Math.pow(dyActive, 2)) < BOT.speed * dt) {\n          BOT.x += dxActive + dxInactive;\n          BOT.y += dyActive;\n        } else {\n          var _angle = Math.atan2(dyActive, dxActive + dxInactive);\n          BOT.x += BOT.speed * dt * Math.cos(_angle);\n          BOT.y += BOT.speed * dt * Math.sin(_angle);\n        }\n      }\n      if (dxActive * dxInactive < 0 && dyActive * dyInactive >= 0) {\n        if (Math.sqrt(Math.pow(dxActive, 2) + Math.pow(dyActive + dyInactive, 2)) < BOT.speed * dt) {\n          BOT.x += dxActive;\n          BOT.y += dyActive + dyInactive;\n        } else {\n          var _angle2 = Math.atan2(dyActive + dyInactive, dxActive);\n          BOT.x += BOT.speed * dt * Math.cos(_angle2);\n          BOT.y += BOT.speed * dt * Math.sin(_angle2);\n        }\n      }\n      if (dxActive * dxInactive < 0 && dyActive * dyInactive < 0) {\n        if (Math.sqrt(Math.pow(dxActive, 2) + Math.pow(dyActive, 2)) < BOT.speed * dt) {\n          BOT.x += dxActive;\n          BOT.y += dyActive;\n        } else {\n          var _angle3 = Math.atan2(dyActive, dxActive);\n          BOT.x += BOT.speed * dt * Math.cos(_angle3);\n          BOT.y += BOT.speed * dt * Math.sin(_angle3);\n        }\n      }\n    } else {\n      BOT.x += dxInactive;\n      BOT.y += dyInactive;\n    }\n  }\n}\nfunction handleInput(dt) {\n  if (input.isDown('LEFT') || input.isDown('a')) {\n    PLAYER.x -= PLAYER.speed * dt;\n  }\n  if (input.isDown('RIGHT') || input.isDown('d')) {\n    PLAYER.x += PLAYER.speed * dt;\n  }\n  if (input.isDown('DOWN') || input.isDown('s')) {\n    PLAYER.y += PLAYER.speed * dt;\n  }\n  if (input.isDown('UP') || input.isDown('w')) {\n    PLAYER.y -= PLAYER.speed * dt;\n  }\n}\nfunction checkCollisions() {\n  checkBorderGameBounds();\n  checkLaserBounds();\n}\nfunction checkBorderGameBounds() {\n  // Проход через границы поля для ИГРОКА\n  if (PLAYER.x < 0) {\n    PLAYER.x = GAME.width - PLAYER.size;\n  } else if (PLAYER.x + PLAYER.size > GAME.width) {\n    PLAYER.x = 0;\n  }\n  if (PLAYER.y < 0) {\n    PLAYER.y = GAME.height - PLAYER.size;\n  } else if (PLAYER.y + PLAYER.size > GAME.height) {\n    PLAYER.y = 0;\n  }\n  // Проход через границы поля БОТА\n  if (BOT.x < 0) {\n    BOT.x = GAME.width - BOT.size;\n  } else if (BOT.x + BOT.size > GAME.width) {\n    BOT.x = 0;\n  }\n  if (BOT.y < 0) {\n    BOT.y = GAME.height - BOT.size;\n  } else if (BOT.y + BOT.size > GAME.height) {\n    BOT.y = 0;\n  }\n}\nfunction checkLaserBounds() {\n  POINTS.forEach(function (point) {\n    var sin = Math.sin(point.angle);\n    var cos = Math.cos(point.angle);\n    var playerCorners = [{\n      x: PLAYER.x,\n      y: PLAYER.y\n    }, {\n      x: PLAYER.x + PLAYER.size,\n      y: PLAYER.y\n    }, {\n      x: PLAYER.x,\n      y: PLAYER.y + PLAYER.size\n    }, {\n      x: PLAYER.x + PLAYER.size,\n      y: PLAYER.y + PLAYER.size\n    }];\n    var botCorners = [{\n      x: BOT.x,\n      y: BOT.y\n    }, {\n      x: BOT.x + BOT.size,\n      y: BOT.y\n    }, {\n      x: BOT.x,\n      y: BOT.y + BOT.size\n    }, {\n      x: BOT.x + BOT.size,\n      y: BOT.y + BOT.size\n    }];\n    var _loop = function _loop() {\n      var corner = _playerCorners[_i];\n      // рассчитываем удаленность угловой точки игрока от центра лазера\n      var dx = corner.x - point.x;\n      var dy = corner.y - point.y;\n\n      // переводим удаленность в систему координат вращения лазера\n      var rotatedX = cos * dx + sin * dy;\n      var rotatedY = -sin * dx + cos * dy;\n\n      // смотрим на положение, делаем выводы относительно каждого состояния лазера\n      // и так ищем коллизию игрока с лазером\n\n      // Если точка принимает неактивное состояние\n      if (point.state === POINT_STATES.INACTIVE && rotatedX > -point.width / 2 && rotatedX < point.width / 2 && rotatedY > -point.height / 2 && rotatedY < point.height / 2) {\n        playLaserSound();\n        point.state = POINT_STATES.ACTIVE;\n        point.team = PLAYER.team; // Убедитесь, что присваивается команда игрока\n        point.activationTime = Date.now();\n      }\n\n      // Проверка коллизий с лазерами\n      if (point.state === POINT_STATES.ACTIVE) {\n        if (point.type === POINT_TYPES.CROSS && point.team !== PLAYER.team) {\n          // Крест\n          if (Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2 || Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2) {\n            PLAYER.state = PLAYER_STATES.DEAD;\n          }\n        }\n        if (point.type === POINT_TYPES.TRIGRAPH && point.team !== PLAYER.team) {\n          // Три-радиус\n          var angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы\n\n          angles.forEach(function (angle) {\n            var angleSin = Math.sin(angle);\n            var angleCos = Math.cos(angle);\n            var rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;\n            var rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;\n            if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {\n              PLAYER.state = PLAYER_STATES.DEAD;\n            }\n          });\n        }\n        if (point.type === POINT_TYPES.LINE && point.team !== PLAYER.team) {\n          // Прямая линия (горизонтальная)\n          if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 && corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {\n            PLAYER.state = PLAYER_STATES.DEAD;\n          }\n        }\n      }\n    };\n    for (var _i = 0, _playerCorners = playerCorners; _i < _playerCorners.length; _i++) {\n      _loop();\n    }\n    var _loop2 = function _loop2() {\n      var corner = _botCorners[_i2];\n      // рассчитываем удаленность угловой точки игрока от центра лазера\n      var dx = corner.x - point.x;\n      var dy = corner.y - point.y;\n\n      // переводим удаленность в систему координат вращения лазера\n      var rotatedX = cos * dx + sin * dy;\n      var rotatedY = -sin * dx + cos * dy;\n\n      // смотрим на положение, делаем выводы относительно каждого состояния лазера\n      // и так ищем коллизию игрока с лазером\n\n      // Если точка принимает неактивное состояние\n      if (point.state === POINT_STATES.INACTIVE && rotatedX > -point.width / 2 && rotatedX < point.width / 2 && rotatedY > -point.height / 2 && rotatedY < point.height / 2) {\n        playLaserSound();\n        point.state = POINT_STATES.ACTIVE;\n        point.team = BOT.team; // Убедитесь, что присваивается команда бота\n        point.activationTime = Date.now();\n      }\n\n      // Проверка коллизий с лазерами\n      if (point.state === POINT_STATES.ACTIVE) {\n        if (point.type === POINT_TYPES.CROSS && point.team !== BOT.team) {\n          // Крест\n          if (Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2 || Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2) {\n            BOT.state = BOT_STATES.DEAD;\n          }\n        }\n        if (point.type === POINT_TYPES.TRIGRAPH && point.team !== BOT.team) {\n          // Три-радиус\n          var angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы\n\n          angles.forEach(function (angle) {\n            var angleSin = Math.sin(angle);\n            var angleCos = Math.cos(angle);\n            var rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;\n            var rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;\n            if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {\n              BOT.state = BOT_STATES.DEAD;\n            }\n          });\n        }\n        if (point.type === POINT_TYPES.LINE && point.team !== BOT.team) {\n          // Прямая линия (горизонтальная)\n          if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 && corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {\n            BOT.state = BOT_STATES.DEAD;\n          }\n        }\n      }\n    };\n    for (var _i2 = 0, _botCorners = botCorners; _i2 < _botCorners.length; _i2++) {\n      _loop2();\n    }\n  });\n}\nfunction updateEntities(dt) {\n  POINTS.forEach(function (point) {\n    if (point.state === POINT_STATES.ACTIVE) {\n      if (Date.now() - point.activationTime < point.existTime) {\n        if (point.team === PLAYER.team) {\n          point.color = PLAYER.color;\n          point.height = 5;\n        }\n        if (point.team === BOT.team) {\n          point.color = BOT.color;\n          point.height = 5;\n        }\n      } else {\n        point.state = POINT_STATES.INACTIVE;\n        resetPoint(point, POINTS.indexOf(point));\n      }\n    }\n    if (point.state === POINT_STATES.INACTIVE) {}\n    if (point.state === POINT_STATES.INVISIBLE) {\n      updateVisibilityPoints(point);\n    }\n    if (point.state === POINT_STATES.ACTIVE || point.state === POINT_STATES.INACTIVE) {\n      movePoint(point, dt);\n    }\n  });\n  if (PLAYER.state === PLAYER_STATES.STUNNED) {\n    PLAYER.x = 30;\n    PLAYER.y = 30;\n  }\n  if (PLAYER.state === PLAYER_STATES.DEAD) {\n    SCORE.team2 += 1;\n    resetLevel();\n  }\n  if (BOT.state === BOT_STATES.DEAD) {\n    SCORE.team1 += 1;\n    resetLevel();\n  }\n}\nfunction movePoint(point, dt) {\n  if (point.id === 2 || point.id === 3) {\n    if (point.x <= 50) {\n      point.direction = 0; // угол 0 радиан означает движение вправо\n    }\n    if (point.x >= 1760) {\n      point.direction = Math.PI; // угол PI радиан означает движение влево\n    }\n  }\n  point.x += Math.cos(point.direction) * point.speed * dt;\n}\nfunction updateVisibilityPoints(point) {\n  if (point.type === POINT_TYPES.TRIGRAPH) {\n    if (5 <= point.id && point.id <= 12 && gameTime > 3) {\n      point.state = POINT_STATES.INACTIVE;\n    }\n    if (2 <= point.id && point.id <= 3 && gameTime > 6) {\n      point.state = POINT_STATES.INACTIVE;\n    }\n  }\n  if (point.type === POINT_TYPES.CROSS && gameTime > 15) {\n    point.state = POINT_STATES.INACTIVE;\n  }\n}\n\n// Определение requestAnimFrame\nwindow.requestAnimFrame = window.requestAnimationFrame || function (callback) {\n  window.setTimeout(callback, 1000 / 60);\n};\nsetTimeout(fadeOutScore, 6800);\ninit();\n\n//# sourceURL=webpack:///./js/singlePlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/singlePlayer.js"]();
/******/ 	
/******/ })()
;