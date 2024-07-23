const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        control: './js/control.js',
        menu: './js/menu.mjs',
        script: './js/script.mjs',
        sprite: './js/sprite.mjs',
        //server: './js/server/server.mjs',
    },
    output: {
        filename: '[name].js', // [name] будет заменен на ключ из entry
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs'],
        fallback: {
            "querystring": require.resolve("querystring-es3"),
            "path": require.resolve("path-browserify"),
            "zlib": false,
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url/"),
            "timers": require.resolve("timers-browserify"),
            "express": false,
            "fs": false,
            "net": false,
            "tls": false,
            "dgram": false,
            "async_hooks": false,
            "vm": false,
            "child_process": false
        },
    },
    plugins: [],
    devServer: {
        static: './dist',
        port: 8096,
        proxy: {
            '/': {
                target: 'http://localhost:3000', // Прокси для серверного кода
                secure: false,
            },
        },
    },
};