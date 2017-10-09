var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../webpack2.config');
var htmlWebpackPlugin = require('html-webpack-plugin');
var absPath = (dir) => { return path.resolve(__dirname, dir) };


// 读取语言包
// global 函数
new Promise(function(resolve, reject) {
    fs.readdir(absPath('../src/views/static'), function(err, staticPages) {
        resolve(staticPages);
    })
}).then(staticPages => {
    return new Promise(function(resolve, reject) {
        fs.readdir(absPath('../public/data'), function(err, langFiles) {
            resolve(langFiles)
        });
    });
}).then(langFiles => {
    let result = [];
    langFiles.forEach(lang => {
        result.push(new Promise(function(resolve, reject) {
            fs.readdir(absPath('../public/data/'+lang), function(err, jsonFiles) {
                let jsonArr = [];
                if(err) { return; }
                for (var json of jsonFiles) {
                    var jsonName = json.slice(0,-5);
                    var pageName = jsonName.split('_')[0],
                        hotelName = jsonName.split('_')[1];
                    if(pageName && hotelName) {
                        jsonArr.push({
                            page: pageName,
                            lang: lang,
                            hotel: hotelName
                        });
                    } else {
                        jsonArr.push({
                            page: pageName,
                            lang: lang,
                            hotel: ''
                        });
                    }
                }
                resolve(jsonArr);
            });
        }));
    });
    return Promise.all(result);
}).then(result => {
    var pages = [],htmlPlugins = [];
    result.forEach(function(inArr) {
        inArr.forEach(function(obj) {
            pages.push(obj);
        })
    });
    pages.forEach((item) => {
        var hotel = item.hotel? item.hotel+'/' : '';
        const htmlPlugin = new htmlWebpackPlugin({
            filename: 'html/'+item.lang+'/'+hotel+item.page+'.html',
            template: './src/views/static/'+item.page+'/html.js',
            chunks:[item.page],
            lang: item.lang,
            hotel: item.hotel
        });
        htmlPlugins.push(htmlPlugin);
    });
    webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);
    webpack(webpackConfig, function(err, stat) {
        (err && console.log('error', err));
    });
});
