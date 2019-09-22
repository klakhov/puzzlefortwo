

field = $("#input-id")
field.keyup(function(e) {
    if(e.keyCode === 13) {
        other_nick = field.val()
        console.log(other_nick);
        $.ajax({
            type:"POST",
            url:"../../service/apps/find-by-nick/find-by-nick.php",
            data:{'login': other_nick},
            success:function(data){
              console.log(data);
                let response = JSON.parse(data);
                if(response["response"] == "you") {
                    // Написать что пользователь ищет сам себя
                }
                else if(response["response"] == "false") {
                    // Вызвать ошибку в наборе Ника
                }
                else {
                    let myProfile = $("#my-profile");
                    let otherProfile = $("#other-profile");
                    myProfile.toggleClass("hidden");
                    otherProfile.toggleClass("hidden");

                    $("#other-profile-name").text(response["login"]);
                    $("#other-stg-email").text($("#other-stg-email").text() + response["email"]);
                    // console.log(response["inFollow"]);
                    if(response["inFollow"] == "true") {
                      $("#follow-profile").css("color", "darkred");
                      $("#follow-profile").text("Отписаться");
                    }
                    else {
                      $("#follow-profile").css("color", "darkgreen");
                      $("#follow-profile").text("Подписаться");
                    }
                }
//                console.log(response);
            }
        })
    }
}
)
