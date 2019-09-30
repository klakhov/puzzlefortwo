field = $("#input-id")
field.keyup(function(e) {
  if (e.keyCode === 13) {
    other_nick = field.val()
    console.log(other_nick);
    $.ajax({
      type: "POST",
      url: "../../service/apps/find-by-nick/find-by-nick.php",
      data: {
        'login': other_nick
      },
      success: function(data) {
        console.log(data);
        let response = JSON.parse(data);
        if (response["response"] == "you") {
          $("#find-profile-error").html("Вы указываете на свой аккаунт");
        } else if (response["response"] == "false") {
          $("#find-profile-error").html("Такого игрока не существует");
        } else {
          openOtherProfile(
            response["login"],
            response["email"],
            response["inFollow"],
            response["follows"]
          );
        }
      }
    })
  }
})
