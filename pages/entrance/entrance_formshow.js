$("#form-link-login").on("click",function(){
  $("#register").css({'display':'grid'});
  $("#login").css({'display':'none'});
});
$("#form-link-register").on("click",function(){
  $("#register").css({'display':'none'});
  $("#login").css({'display':'grid'});
})
