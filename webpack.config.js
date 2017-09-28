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
        index: './src/views/globalPage/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/globalPage'),
        filename: './static/js/[name].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin(Object.assign({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/views/globalPage/index.ejs'),
        },require('./public/data/en/index.json'))),
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
            }
        ]
    }
}