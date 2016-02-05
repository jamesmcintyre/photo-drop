'use strict'

var mongoose = require('mongoose');
// var jwt = require('jwt-simple');
// var moment = require('moment');

// var JWT_SECRET = process.env.JWT_SECRET;


var Album;

var albumSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: { type: String},
  title: { type: String }
});


//TODO CREATE NEW ALBUM method

//TODO DELETE ALBUM METHOD (MIGHT NOT NEED, CAN BE DONE IT ROUTE)


Album = mongoose.model('Album', albumSchema);

module.exports = Album;
