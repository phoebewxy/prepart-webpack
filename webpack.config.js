const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractLess = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
});

module.exports = {
    entry : {
        globalPage: './src/views/static/globalPage/index.js',
        hotelPage: './src/views/static/hotelPage/index.js',
        cityPage: './src/views/static/cityPage/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    plugins: [
        extractLess
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[hash].[ext]'
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