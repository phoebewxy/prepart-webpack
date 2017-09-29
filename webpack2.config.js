const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const viewsPath = './src/views';
const pages = require('./build/static');

var htmlPlugins = [];
pages.forEach((item) => {
    const htmlPlugin = new htmlWebpackPlugin({
        filename: 'html/'+item.lang+'/'+item.page+'.html',
        template: './src/views/'+item.page+'/html.js',
        chunks:[item.page],
        lang: item.lang
    });
    htmlPlugins.push(htmlPlugin);
})

const extractLess = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
});

module.exports = {
    entry : {
        globalPage: './src/views/globalPage/index.js',
        hotelPage: './src/views/hotelPage/index.js',
        cityPage: './src/views/cityPage/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    plugins: [
        extractLess
    ].concat(htmlPlugins),
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