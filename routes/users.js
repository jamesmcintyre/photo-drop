var express = require('express');
var router = express.Router();

var User = require('../models/user');


//REGISTER USER

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, savedUser) {
    if(err){
      res.status(400).send(err)
    } else{
      res.redirect('/login');
    }
  });
});

//LOGIN USER

router.post('/login', function(req, res, next){
  User.login(req.body, function(err, token){
    if(err) {
      res.status(400).send(err);
    }
    else{
      console.log(token);
      res.cookie('userToken', token).redirect('/users/profile');
    }
  });
});



//GET USER PROFILE

router.get('/profile', User.isLoggedIn, function(req, res){

  User.findById(req.token._id, function(err, user){
      console.log('user:   ',user);
      res.render('profile', {userData: user});
  });
});





module.exports = router;
