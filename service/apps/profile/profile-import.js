function goToMyProfile() {

  let myProfile = $("#my-profile");
  let otherProfile = $("#other-profile");
  myProfile.toggleClass("hidden");
  otherProfile.toggleClass("hidden");
  $("#find-profile-error").html("");

  updateProfileDynamicElements(); // prfile-import.js
}


function openOtherProfile(login_arg, email_arg, inFollow_arg, follows_arg) {
  let myProfile = $("#my-profile");
  let otherProfile = $("#other-profile");

  if(!(myProfile.hasClass("hidden"))) {
    myProfile.toggleClass("hidden");
  }
  if(otherProfile.hasClass("hidden")) {
    otherProfile.toggleClass("hidden");
  }

  $("#other-profile-name").text(login_arg);
  if (inFollow_arg == "true") {
    $("#follow-profile").css("color", "darkred");
    $("#follow-profile").text("Отписаться");
  } else {
    $("#follow-profile").css("color", "darkgreen");
    $("#follow-profile").text("Подписаться");
  }

  let other_follows = $("#other-profile-follows-overflow");
  other_follows.html("");
  follows_arg.forEach(function(item, i, arr) {
    other_follows.html(other_follows.html() + item["div"]);
  })

  follows_arg.forEach(function(item, i, arr) {
    $("#other-friend-main-" + (i + 1)).click(function() {
      $.ajax({
        type: "POST",
        url: "../../service/apps/find-by-nick/find-by-nick.php",
        data: {
          'login': item["name"]
        },
        success: function(data) {
          let response = JSON.parse(data);
          console.log(response);
          if(response["response"] == "you") {
            goToMyProfile();
          }
          else {
            openOtherProfile(
              response["login"],
              response["email"],
              response["inFollow"],
              response["follows"]
            );
          }
        }
      })
    })
  })

  TODO();
}

function updateProfileDynamicElements() {
  $.ajax({
    type: "POST",
    url: "../../service/apps/profile/profile-follows.php",
    data: {},
    success: function(data) {
      let response = JSON.parse(data);
      // console.log(response["response"]);
      $("#profile-follows-overflow").html("");
      response["response"].forEach(function(item, i, arr) {
        $("#profile-follows-overflow").html($("#profile-follows-overflow").html() + item["div"]);
      })

      // не ебу зачем нужен второй такой же вызов, почему не сделать в одном. Есть только догадки
      response["response"].forEach(function(item, i, arr) {
        $("#friend-main-" + (i + 1)).click(function() {
          $.ajax({
            type: "POST",
            url: "../../service/apps/find-by-nick/find-by-nick.php",
            data: {
              'login': item["name"]
            },
            success: function(data) {
              let response = JSON.parse(data);
              console.log(response);
              openOtherProfile(
                response["login"],
                response["email"],
                response["inFollow"],
                response["follows"]
              );
            }
          })
        })
      })
    }
  });
  TODO();
}
