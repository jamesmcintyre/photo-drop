'use strict';

$().ready(function(){

  $('#login').submit(loginUser);

});


var $alertTemplate = $('#regAlert').clone().removeClass('template').addClass('animated headShake');

function loginUser(e){
  e.preventDefault();

  var loginUser = {
    email: $('#email').val(),
    password: $('#password').val()
  }

  $.post('/users/login', loginUser)
    .success(function(){
      window.location.href = '/users/profile';
    })
    .fail(function(err){
      console.log(err);
      var errMsg = err.responseText;
      $alertTemplate.find('#errmsg').text(errMsg);
      $('#login').prepend($alertTemplate);
    })

}
