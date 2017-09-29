
var langs = ['en', 'zh'];
var views = ['globalPage', 'hotelPage', 'cityPage'];
var hotels = ['slbj', 'slhk'];
var pages = (function() {
    var pagesArr = [];
    views.forEach(function(page, index) {
        langs.forEach(function(lang, index) {
            if(page == 'hotelPage') {
                hotels.forEach(function(hotel, index) {
                    pagesArr.push({
                        page: page,
                        lang: lang,
                        hotel: hotel
                    })
                })
            }  else {
                pagesArr.push({
                    page: page,
                    lang: lang,
                    hotel: ''
                })
            }
        })
    })
    return pagesArr;
})(langs)

module.exports = pages;