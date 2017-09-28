
var langs = ['en', 'zh'];
var views = ['globalPage', 'hotelPage'];
var pages = (function() {
    var pagesArr = [];
    views.forEach(function(page, index) {
        langs.forEach(function(lang, index) {
            pagesArr.push({
                page: page,
                lang: lang
            })
        })
    })
    return pagesArr;
})(langs)

module.exports = pages;