function goToMyProfile() {

  let myProfile = $("#my-profile");
  let otherProfile = $("#other-profile");
  myProfile.toggleClass("hidden");
  otherProfile.toggleClass("hidden");
  $("#find-profile-error").html("");

  updateProfileDynamicElements(); // prfile-import.js
}

function connect() {
  $.ajax({
    type: "POST",
    url: "../../service/apps/profile/profile-rooms.php",
    data: {},
    success: function(data) {
      let response = JSON.parse(data);
      if (response["response"] == "yes") {
        var form = $('<form action="../../pages/game-room/game-room.php" method="post"></form>');
        var input =$('<input type="hidden" name="room-uid" value="'+response['uid']+'"/>');
        form.append(input);
        $(document.body).append(form);
        form.submit();
      } else {
        alert("Вы не можете присоединиться");
      }
    }
  })
}

function invite() {
  console.log("invite");
  alert("Приглашение ещё не работает");
}

function follow() {
  console.log("follow");
  $.ajax({
    type: "POST",
    url: "../../service/apps/other-profiles/follow.php",
    data: {},
    success: function(data) {
      let response = JSON.parse(data);
      if (response["response"] == 'yes') {
        console.log("Теперь Вы подписаны на игрока")
        $("#follow-profile").css("color", "darkred");
        $("#follow-profile").text("Отписаться");
      } else if (response["response"] == 'no') {
        console.log("Теперь Вы подписаны на игрока")
        $("#follow-profile").css("color", "darkgreen");
        $("#follow-profile").text("Подписаться");
      }
    }
  })


}

function edit() {
  console.log("edit");
  alert("Изменение профиля ещё не работает =(");
}

$("#to-my-profile").click(goToMyProfile);

$("#edit-profile").click(edit);

$("#follow-profile").click(follow);

$("#invite-profile").click(invite);

$("#connect-profile").click(connect);
