'use strict';

$().ready(function(){

  $('#register').submit(registerUser);

});


var $alertTemplate = $('#regAlert').clone().removeClass('template').addClass('animated headShake');

function registerUser(e){
  e.preventDefault();

  var password1 = $('#password').val();
  var password2 = $('#password2').val();

  if(password1 !== password2){

    $alertTemplate.find('#errmsg').text('Passwords do not match!');
    return $('#register').prepend($alertTemplate);
  }

  var newUser = {
    name: $('#name').val(),
    email: $('#email').val(),
    password: password1
  }

  $.post('/users/register', newUser)
    .success(function(){
      window.location.href = '/login';
    })
    .fail(function(err){
      console.log(err);
      var errMsg = JSON.parse(err.responseText).code;
      $alertTemplate.find('#errmsg').text(errMsg);
      $('#register').prepend($alertTemplate);
    })

}
