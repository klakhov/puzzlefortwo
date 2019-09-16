function roomView() {
    let roomList = $("#room-list");
    let roomExamples = roomList.children().length;

    $.ajax({
    type:"POST",
    url:"../../service/apps/room/room-get.php",
    success:function(data){
      result = JSON.parse(data);
      var roomCanvas = $("#room");
      if(result.number-roomExamples>0){
        for(var i=roomExamples; i<result.number; i++){
          let roomExample = roomCanvas.clone();
          roomExample.children("#room-nick-1").text(result['rows'][i]['nick1']);
          roomExample.children("#room-desctiption").text(result['rows'][i]['description']);
          roomExample.children("#room-img").text(result['rows'][i]['img']);
          roomList.append(roomExample);
          roomExample.css({'display':'grid'});
        }
      }
      setTimeout(roomView, 3000);
    }
  });
}
roomView();
