var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.redirect('/en/index');
});

router.get('/:lang/index', function(req, res, next) {  
  axios.get('http://localhost:3000/data/'+req.params.lang+'/index.json')
    .then(function(response) {
      res.render('index', response.data);
    })
    .catch(function(err) {
      console.log(err);
    })
})

router.get('/:lang/second', function(req, res, next) {
  axios.get('http://localhost:3000/data/'+req.params.lang+'/second.json')
    .then(function(response) {
      res.render('index', response.data);
    })
    .catch(function(err) {
      console.log(err);
    })
})

module.exports = router;
