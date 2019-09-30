
$.ajax({
      type:"POST",
      url:"../../service/apps/profile/profile-get.php",
      data:{},
      success:function(data){
        let response = JSON.parse(data);
        $("#my-profile-name").text(response["login"]);
        // $("#my-stg-email").text($("#my-stg-email").text() + response["email"]);
        // console.log("!!!AAAAAAAA", response["follows"]);
      }
})
