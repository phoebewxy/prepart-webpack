var fs = require('fs');


fs.writeFile('./test.json',JSON.stringify(a), function(err) {
    if (err) {
        return console.error(err);
    }
})


