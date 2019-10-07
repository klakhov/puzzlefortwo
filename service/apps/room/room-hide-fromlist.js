function roomHide() {
    let roomListContainer = $("#room-list");
    // let roomExamples = roomList.children().length;
    let roomList = document.getElementsByClassName('room');

    $.ajax({
      type:"POST",
      url:"../../service/apps/room/room-hide-fromlist.php",
      success:function (data) {
        let result = JSON.parse(data);
        rows = result['number'];

        let uids = new Array();
        for(var i = 0; i<=rows; i++){
          uids[i] = result['room-uids'][i];
        }

        for (var i = 0; i < roomList.length; i++) {
          let currentId = roomList[i].lastElementChild.value;
          uids.forEach(function (uid) {
            if(currentId == uid){
              roomList[i].style.display = "none";
            }
          })
        }
        setTimeout(roomHide,2500);
      }
    })
}
roomHide();
