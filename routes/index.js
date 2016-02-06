var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Photo Drop', login: false });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Photo Drop', login: false});
})

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Photo Drop', login: false});
})


module.exports = router;
