const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        filename: './src/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script.js',
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