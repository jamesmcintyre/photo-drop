var express = require('express');
var router = express.Router();

var Album = require('../models/album');
var User = require('../models/user');



//---------------GET ROUTES----------------

//GET ALBUM DETAIL VIEW
router.get('/view/:albumId', User.isLoggedIn, function(req, res, next){

  Album.findById(req.params.albumId, function(err, album){
    if(err) res.status(400).send(err);
      res.render('album', {album: album});
  });

});

//GET USER ALBUMS
router.get('/:userId', User.isLoggedIn, function(req, res, next){

  Album.find({owner: req.params.userId}, function(err, albums){
    console.log('album get error:  ', err)
    if(err) res.status(400).send(err);
    res.send(albums);
      //res.render('albums', {albums: albums});
  });

});




//---------------POST ROUTES----------------

//POST NEW ALBUM
router.post('/', User.isLoggedIn, function(req, res, next) {
  Album.create(req.body, function(err, newAlbum){
    if(err) res.status(400).send(err);
    res.send();
  });
});



//---------------DELETE ROUTES----------------

//DELETE ALBUM
router.delete('/:albumId', User.isLoggedIn, function(req, res, next){
  Album.deleteAlbum(req.params.albumId, function(err){
    res.status(err ? 400 : 200).send(err || 'Album deleted.');
  });
});


//---------------UPDATE ROUTES----------------

//TODO add put update route


module.exports = router;
