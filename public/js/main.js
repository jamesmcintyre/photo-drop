$().ready(function(){


  $.getScript( "/lib/bootstrap/dist/js/bootstrap.min.js", function( data, textStatus, jqxhr ) {
    if(jqxhr.status !== 200) console.log('failed to load ripples');
    console.log('bootstrap js')
  });


  $.getScript( "/lib/bootstrap-material-design/dist/js/material.min.js", function( data, textStatus, jqxhr ) {
    if(jqxhr.status !== 200) console.log('failed to load material');
    $.material.init()
    console.log('material')
  });

  $.getScript( "/lib/bootstrap-material-design/dist/js/ripples.min.js", function( data, textStatus, jqxhr ) {
    if(jqxhr.status !== 200) console.log('failed to load ripples');
    console.log('ripples')
  });

  $('#addAlbum').on('click', addAlbumModal);

  $('#newAlbumButton').on('click', addAlbum)

  getAlbums();



})






function getAlbums(){

  //var $imgTemplate = $('.albumTemplate').clone().removeClass('imgTemplate');
  var userId = $('#newAlbumButton').attr('data-id').replace(/"/g, '');
  var getURL = '/albums/'+userId;
  var $albumsToAppend= [];


  $.get(getURL, function(albums){

    console.log(albums);
    albums.forEach(function(album, index, array){

      console.log(album);

      var albumLink = '/albums/view/' + album._id;
      var $imgTemplate = $('.albumTemplate').clone().removeClass('albumTemplate');

      $imgTemplate.find('.folderLink').attr('href', albumLink);
      $imgTemplate.find('.titleLink').attr('href', albumLink);
      $imgTemplate.find('.descLink').attr('href', albumLink);
      $imgTemplate.find('.albumTitle').text(album.title).attr('href', albumLink);
      $imgTemplate.find('.albumDescription').text(album.description).attr('href', albumLink);

      //$('#albumsList').append($imgTemplate);
      $albumsToAppend.push($imgTemplate)
    });

    console.log($albumsToAppend);


    $('#albumsList').empty().append($albumsToAppend);


  })
}





function addAlbumModal(){
  $('#addAlbumModal').modal('show');
}




function addAlbum(){

  var userId = $(this).attr('data-id').replace(/"/g, '');

  var newAlbum = {
    description: $('#description').val(),
    owner: userId,
    title: $('#albumTitle').val()
    }

  $.post('/albums/', newAlbum, function(err, data){
    if(err) console.log('new album error: ',err);
    $('#addAlbumModal').modal('hide');
    getAlbums();
  })

}