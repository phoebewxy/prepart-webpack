var express = require('express');
var router = express.Router();
var axios = require('axios');
var path = require('path');

router.get('/', function(req, res, next) {
  res.redirect('/en/globalPage');
});

router.get('/:lang/:page', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../dist/html/'+req.params.lang+'/'+req.params.page+'.html'));
})

router.get('/:lang/orderPage/order', function(req, res, next) {  
  axios.get('http://localhost:3000/data/'+req.params.lang+'/orderPage.json')
    .then(function(response) {
      res.render('dynamic/orderPage/orderPage', response.data);
    })
    .catch(function(err) {
      console.log(err);
    })
})

router.get('/:lang/:hotel/hotelPage', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../dist/html/'+req.params.lang+'/'+req.params.hotel+'/'+'hotelPage.html'));
})

module.exports = router;
