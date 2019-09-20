
function goToMyProfile() {
  function updateProfileDinamicElements() {
    $.ajax({
          type:"POST",
          url:"../../service/apps/profile/profile-follows.php",
          data:{},
          success:function(data){
            let response = JSON.parse(data);
            console.log(response["response"]);
            $("#follows-overflow").html("");
            response["response"].forEach(function(item, i, arr) {
              $("#follows-overflow").html($("#follows-overflow").html() + item);
            })
          }
    });
  }

  let myProfile = $("#my-profile");
  let otherProfile = $("#other-profile");
  myProfile.toggleClass("hidden");
  otherProfile.toggleClass("hidden");
  updateProfileDinamicElements();
}

function connect() {
    console.log("connect");
}

function invite() {
  console.log("invite");
}

function follow() {
  console.log("follow");
  $.ajax({
      type:"POST",
      url:"../../service/apps/other-profiles/follow.php",
      data:{},
      success:function(data){
        console.log(data);
          let response = JSON.parse(data);
          console.log(response);
          if(response["response"] == 'yes') {
            $("#follow-profile").css("color", "darkred");
            $("#follow-profile").text("Отписаться");
          }
          else if(response["response"] == 'no') {
            $("#follow-profile").css("color", "darkgreen");
            $("#follow-profile").text("Подписаться");
          }
//                console.log(response);
      }
  })


}

$("#to-my-profile").click(goToMyProfile);

//$("#edit-profile").click()

$("#follow-profile").click(follow);

$("#invite-profile").click(invite);

$("#connect-profile").click(connect);
