'use strict';


$().ready(function(){

  console.log('album script loaded!');

  getPhotos();

});






function getPhotos(){

  //var $imgTemplate = $('.albumTemplate').clone().removeClass('imgTemplate');
  var albumId = $('#albumId').attr('value').replace(/"/g, '');
  var getURL = '/photos/album/'+albumId;
  var $photosToAppend= [];

  console.log(getURL);

  $.get(getURL, function(photos){

    console.log(photos);
    photos.forEach(function(photo, index, array){

      console.log(photo);

      var photoLink = '/photos/view/' + photo._id;
      var $imgTemplate = $('.imgThumbTemplate').clone().removeClass('imgThumbTemplate');

      $imgTemplate.find('.imgtile').attr('src', photo.url);
      $imgTemplate.find('.imageName').text( photo.name );
      // $imgTemplate.find('.descLink').attr('href', photoLink);
      // $imgTemplate.find('.photoTitle').text(photo.title).attr('href', photoLink);
      // $imgTemplate.find('.photoDescription').text(photo.description).attr('href', albumLink);

      //$('#albumsList').append($imgTemplate);
      $photosToAppend.push($imgTemplate)
    });

    console.log($photosToAppend);


    $('#albumPhotoList').empty().append($photosToAppend);


  })
}
