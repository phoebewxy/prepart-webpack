const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const viewsPath = './src/views';

const extractLess = new ExtractTextPlugin({
    filename: "./static/css/[name].[contenthash].css",
});

module.exports = {
    entry : {
        globalPage: './src/views/globalPage/index.js',
        hotelPage: './src/views/hotelPage/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './static/js/[name].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin(Object.assign({
            filename: 'html/globalPage.html',
            template: path.resolve(__dirname, 'src/views/globalPage/index.ejs'),
            chunks:['globalPage']
        },require('./data/en/globalPage/globalPage.json'))),
        new htmlWebpackPlugin(Object.assign({
            filename: 'html/hotelPage.html',
            template: path.resolve(__dirname, 'src/views/hotelPage/index.ejs'),
            chunks:['hotelPage']
        },require('./data/en/globalPage/globalPage.json'))),
        extractLess
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
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader" 
                })
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    }
}