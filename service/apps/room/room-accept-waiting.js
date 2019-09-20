function acceptWaiting() {
  $.ajax({
    type:'POST',
    url:'../../service/apps/room/room-accept-waiting.php',
    data:{'uid':uid},
    success:function(data){
      result = JSON.parse(data);
      if(result.status == 'playing'){
        stg = $(".quick-settings");
        stg_back = $(".settings-back");
        stg.toggleClass("opened-settings");
        stg_back.toggleClass("opened-settings-back");
      }else if (result.status == 'closed') {
        $("#modal-message").text('room closed');
      }else if (result.status == 'waiting'){
        $("#timer").css({'display':'block'});
        $("#timer").text("Осталось времени: "+result.time_remain);
        setTimeout(acceptWaiting, 1000);
      };
    }
  });
}

stg = $(".quick-settings");
stg_back = $(".settings-back");
stg.toggleClass("opened-settings");
stg_back.toggleClass("opened-settings-back");
acceptWaiting();
