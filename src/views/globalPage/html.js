var header = require('../../components/header/header.ejs');
var footer = require('../../components/footer/footer.ejs');
var index = require('./index.ejs');

var axios = require('axios');

module.exports = function({ htmlWebpackPlugin }) {
    return new Promise(function(resolve, reject) {
        var data = require('../../../public/data/'+htmlWebpackPlugin.options.lang+'/globalPage.json');
        
        var html = index({
            header:header({
                header: data.header
            }),
            title: data.title,
            content: data.content,
            footer: footer({
                footer: data.footer
            })
        })
        resolve(html)
    });
};