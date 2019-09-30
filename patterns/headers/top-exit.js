let previos = $("#top-exit").text();
console.log(previos);
$("#top-exit").on("click",function(event) {
  event.preventDefault();
  $.ajax({
    type:"POST",
    url:"../../service/apps/exit/top_exit.php",
    success:function(){
      // $(location).attr('href',"https://puzzlefortwo.000webhostapp.com/pages/entrance/entrance.php");
      $(location).attr('href',"../../pages/main_page/main_page.php");
    }
  });
});
$("#top-exit").on("mouseover",function(){
  $(this).text("Выход");
});
$("#top-exit").on("mouseleave",function(){
  $(this).text(previos);
});
