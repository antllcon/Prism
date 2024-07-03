const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        script: './js/script.js',
        sprite: './js/sprite.js',
        control: './js/control.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: false
    },
    devServer:{
        port: 9000,
        compress: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    }
}