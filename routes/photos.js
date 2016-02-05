var express = require('express');
var router = express.Router();

var Photo = require('../models/photo');
var multer = require('multer');

var upload = multer({storage: multer.memoryStorage() });



//---------------GET ROUTES----------------

//GET ALL USER IMAGES
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  Photo.find({owner: userId}, function(err, photos){
    if(err) res.status(400).send(err);
    //var userId = req.token._id;
    res.send(photos);
  })
});



//GET ALL ALBUM IMAGES
router.get('/:albumId', function(req, res, next) {

  var albumId = req.params.albumId;

  Photo.find({album: albumId}, function(err, photos){
    if(err) res.status(400).send(err);
    //var userId = req.token._id;
    res.send(photos);
  })
});


//TODO GET IMAGES BY TAGS





//---------------POST ROUTES----------------

//POST NEW PHOTO
router.post('/', upload.array('photos'), function(req, res, next) {
  Photo.addPhoto(req.files, function(err, addedPhotos){
    res.status(err ? 400 : 200).send(err || addedPhotos);
  });
});



//---------------UPDATE ROUTES----------------

//PUT SHOULD ALLOW -IN MODEL - RETRIEVE VIA ID AND UPDATE VIA MONGOOSE



//---------------DELETE ROUTES----------------

router.delete('/:photoId', function(req, res, next){
  Photo.deletePhoto(req.params.photoId, function(err){
    res.status(err ? 400 : 200).send(err || 'Photo deleted.');
  });
});



module.exports = router;
