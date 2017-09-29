var header = require('../../components/header/header.ejs');
var footer = require('../../components/footer/footer.ejs');
var index = require('./index.ejs');

var axios = require('axios');

module.exports = function({ htmlWebpackPlugin }) {
    return new Promise(function(resolve, reject) {
        var data = require('../../../public/data/'+htmlWebpackPlugin.options.lang+'/cityPage.json');
        
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

        // axios.get('http://127.0.0.1:3000/data/en/cityPage.json')
        // .then(function(response) {
        //     var html = index({
        //         header:header({
        //             header: response.data.header
        //         }),
        //         title: response.data.title,
        //         content: response.data.content,
        //         footer: footer({
        //             footer: response.data.footer
        //         })
        //     })
        //     resolve(html)
        // })
        // .catch(function(err) {
        //   console.log(err);
        // })

    });
};