var arr = require('./resource')();


var page = function() {
    return new Promise(function(resolve, reject) {
        arr.then(result => {
            resolve(result)
        })
    })
}



