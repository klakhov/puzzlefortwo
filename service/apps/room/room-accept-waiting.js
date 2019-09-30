function acceptWaiting() {
  $.ajax({
    type:'POST',
    url:'../../service/apps/room/room-accept-waiting.php',
    success:function(data){
      result = JSON.parse(data);
      if(result.status == 'playing'){
        stg = $(".quick-settings-unhideble");
        stg_back = $(".settings-back-unhideble");
        stg.toggleClass("opened-settings");
        stg_back.toggleClass("opened-settings-back");
      }else if (result.status == 'closed') {
        $("#modal-message").text('room closed');
        $("#timer").css({'display':'none'});
      }else if (result.status == 'waiting'){
        $("#timer").css({'display':'block'});
        $("#timer").text("Осталось времени: "+result.time_remain);
        setTimeout(acceptWaiting, 1000);
      };
    }
  });
}

stg = $(".quick-settings-unhideble");
stg_back = $(".settings-back-unhideble");
stg.toggleClass("opened-settings");
stg_back.toggleClass("opened-settings-back");
acceptWaiting();
