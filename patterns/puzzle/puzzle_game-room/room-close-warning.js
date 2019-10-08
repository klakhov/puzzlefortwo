window.onbeforeunload = function(){
  return 0;
};
let topLinks = document.getElementsByClassName('header-links');

for (var i = 0; i < topLinks.length; i++) {
  topLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    stg = $(".quick-settings");
    stg_back = $(".settings-back");
    stg.toggleClass("opened-settings");
    stg_back.toggleClass("opened-settings-back");
    stg_back.toggleClass("closed-settings-back");
  })
}
$(".settings-back").on("click", function () {
  stg = $(".quick-settings");
  stg_back = $(".settings-back");
  stg.toggleClass("opened-settings");
  stg_back.toggleClass("opened-settings-back");
  stg_back.toggleClass("closed-settings-back");
})
$("#user-room-exit").on("click",function () {
  $(location).attr('href',"../../pages/main_page/main_page.php");
})
