
$.ajax({
      type:"POST",
      url:"../../service/apps/profile/profile-get.php",
      data:{},
      success:function(data){
        let response = JSON.parse(data);
        $("#stg_email").text($("#stg_email").text() + response["email"]);
      }
})