function refreshStatus() {
  $.ajax({
    type:'POST',
    url:'../../service/apps/online-check/online-check.php',
    success: function(){
      setTimeout(refreshStatus, 5000);
    }
  })
};
refreshStatus();
