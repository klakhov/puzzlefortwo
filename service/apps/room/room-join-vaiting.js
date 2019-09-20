function timeCheck(uid) {
  $.ajax({
    type:"POST",
    url:"../../service/apps/room/user1-timecheck.php",
    data:{'uid':uid},
    success:function(data){
      result = JSON.parse(data);
      if(result.status == 'waiting'){
        uid = result.uid;
        $("#timer").css({'display':'block'});
        $("#timer").text("Осталось времени: "+result.time_remain);
        setTimeout(function(){
          timeCheck(uid)
        },1000);
      }else if (result.status == 'closed'){
        $("#timer").css({'display':'none'});
        $("#modal-message").text('Время вышло');
      }else{

      }
    }
  })
}


function roomAccepted() {
  $.ajax({
    type:"POST",
    url:"../../service/apps/room/room-join-vaiting.php",
    success:function(data){
      result = JSON.parse(data);
      message = $("#modal-message");
      console.log(result.success);
      if(result.success == 'roomFull'){

        message.text("К вашей комнате присоеденился игрок " + result['opponentNick']);
        stg = $(".quick-settings");
        stg_back = $(".settings-back");
        stg.toggleClass("opened-settings");
        stg_back.toggleClass("opened-settings-back");

        acceptForm = $("#second-player-accept");
        acceptForm.children("#room-uid").val(result['room-uid'])
        acceptButton = $("#modal-accept-room-join");
        acceptButton.css({'display':'block'});
        timeCheck(result['room-uid']);
      }else{
        setTimeout(roomAccepted, 1000);
      }

    }
  });
}
roomAccepted();
