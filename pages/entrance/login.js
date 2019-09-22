$("#login-submit").on("click",function(){
  let login = $("#login-login-text").val();
  let password = $("#login-password-text").val();

  let errorLog = $("#login-error-type");
  if((login == "") || (password == "")){
    errorLog.text("Заполните все поля!");
    errorLog.css({'display':'block'});
  }
  else{
    $.ajax({
      type:"POST",
      url:"../../service/apps/entrance/login.php",
      data:{'login':login,'password':password},
      success:function(response) {
        let result = JSON.parse(response);
        if(result['status'] == "SuccessfulLogin"){
        //$(location).attr('href',"https://puzzlefortwo.000webhostapp.com/pages/main_page/main_page.php");
          $(location).attr('href',"http://puzzlefortwo/pages/main_page/main_page.php");
        }
        else if(result['status'] == "UnsuccessfulLogin"){
          errorLog.text("Неверный логин/пароль");
          errorLog.css({'display':'block'});
        }
      }
    });
  }
});
