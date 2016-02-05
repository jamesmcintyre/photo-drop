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

})
