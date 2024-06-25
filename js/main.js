function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    drawPlayer();
    lastTime = now;
    requestAnimFrame(main);
}
