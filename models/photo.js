'use strict'

var mongoose = require('mongoose');
var async = require('async');
var uuid = require('node-uuid');
var aws = require('aws-sdk');


var s3 = new aws.S3();
var Photo;

//PHOTO SCHEMA

var photoSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  description: { type: String},
  location: {type: String},
  tags: [{type: String}],
  url: {type: String}
});



//ADD PHOTO METHOD

photoSchema.statics.addPhoto = function(imageFiles, cb){

  async.each(imageFiles, function(imageFile, cb){

    var imageBuffer = imageFile.buffer;
    var filename = imageFile.originalname;
    var key = uuid.v1();

    //TODO capture image description and tags

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,  //name of file on s3
      Body: imageBuffer  //buffer of file
    };

    s3.putObject(params, function(err, data){  //uploads to s3
      if(err) console.log(err);
      console.log('success to aws:  ', data);

      var match = filename.match(/\.\w$/);
      var ext = match ? match[0] : "";
      var url = process.env.AWS_URL + process.env.AWS_BUCKET + "/" + key + ext;

      var photo = new Photo({
        url: url
      });

      photo.save(function(err){
        if(err) return console.log(err);
        console.log('url: ', url);
      });

    });


  }, function(){ //async completion callback
    res.status(200).send('images added!');
  });//close of async

}//close of method





//DELETE PHOTO METHOD

photoSchema.statics.deletePhoto = function(photoId, cb){
  Photo.findByIdAndRemove(photoId, function(err){
    if(err) return res.status(400).send(err);
    return;
  });
}



Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
