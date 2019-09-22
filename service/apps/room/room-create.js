$("#room-create-submit").on("click",function(){
  imgName = $("#room-create-img").val();
  desctiption = $("#room-create-desctiption").val();
  message = $("#modal-message");
  console.log(message);
  if(desctiption == ''){
    message.text("Заполните описание комнаты!");
    stg = $(".quick-settings");
    stg_back = $(".settings-back");
    stg.toggleClass("opened-settings");
    stg_back.toggleClass("opened-settings-back");
    stg_back.toggleClass("closed-settings-back");
  }else{
    $.ajax({
      type:"POST",
      url:"../../service/apps/room/room-create.php",
      data:{'img-name':imgName,'desctiption':desctiption},
      success:function(data){
        let response = JSON.parse(data);
        if(response.success == 'roomCreated'){
          message.text("Комнaта создана!");
        }else if (response.success == 'roomAlreadySet') {
          message.text("Вы уже создали комнату!");
        }else{
          message.text("Undentified error");
        }

        stg = $(".quick-settings");
        stg_back = $(".settings-back");
        stg.toggleClass("opened-settings");
        stg_back.toggleClass("opened-settings-back");
        stg_back.toggleClass("closed-settings-back");
      }
    })
  }
});
