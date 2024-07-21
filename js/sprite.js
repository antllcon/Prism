(function () {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    }

    Sprite.prototype = {
        render: function (canvasContext, resources) {
            let frame;

            if (this.speed > 0) {
                const max = this.frames.length;
                const idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if (this.once && idx >= max) {
                    return;
                }
            } else {
                frame = 0;
            }

            let x = this.pos[0];
            let y = this.pos[1];

            if (this.dir === 'vertical') {
                y += frame * this.size[1];
            } else {
                x += frame * this.size[0];
            }

            canvasContext.drawImage(
                resources.get(this.url),
                x,
                y,
                this.size[0],
                this.size[1],
                0,
                0,
                this.size[0],
                this.size[1]
            );
        },
    };

    window.Sprite = Sprite;
})();
