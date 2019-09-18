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
        acceptForm.children("#opponent-nick").val(result['opponentNick']);
        acceptForm.children("#player-number").val(1);
        acceptForm.children("#image-playing").val(result['imagePlaying']);
        acceptButton = $("#modal-accept-room-join");
        acceptButton.css({'display':'block'});
      }else{
        setTimeout(roomAccepted, 1000);
      }

    }
  });
}
// roomAccepted();
