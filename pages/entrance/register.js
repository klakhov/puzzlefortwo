function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
$("#register-submit").on("click",function(){
  let login = $("#register-login-text").val();
  let password = $("#register-password-text").val();
  let email = $("#register-email-text").val();

  let errorLog = $("#register-error-type");

  if((login == "") || (password == "") || (email == "")){
    errorLog.text("Заполните все поля!");
    errorLog.css({'display':'block'});
  }else if ((login.length < 3) || (password.length <6) || !validateEmail(email)) {
    errorLog.text("Проверте Размеры логина(3 и более символов)/пароля(6 и более символов)/правильность email");
    errorLog.css({'display':'block','color':'red'});
  }
  else{
    $.ajax({
      type:"POST",
      url:'../../service/apps/entrance/register.php',
      data:{'login':login,'password':password,'email':email},
      success:function(response){
        let result = JSON.parse(response);
        switch (result["result"]) {
          case "LoginExists":
            errorLog.text("Логин уже существует!");
            errorLog.css({'display':'block'});
            break;
          case "EmailExists":
            errorLog.text("Email уже зарегистрирован!");
            errorLog.css({'display':'block'});
            break;
          case "UserCreated":
            errorLog.text("Аккаунт успешно создан!");
            errorLog.css({'display':'block','color':'green'});
            break;
        }
      }
    });
  }
});
