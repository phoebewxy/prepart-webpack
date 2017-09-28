const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const viewsPath = './src/views';

module.exports = {
    entry : {
        index: './src/views/globalPage/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/globalPage'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin(Object.assign({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/views/globalPage/index.ejs'),
        },require('./public/data/en/index.json')))
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: './static/img/[hash].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/
            }
        ]
    }
}