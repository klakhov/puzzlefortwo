window.onbeforeunload = function(){
  return "Вы уверены что хотите покинуть комнату? Возвращение невозможно";
};
let topLinks = document.getElementsByClassName('header-links');
stg = document.getElementById('quick-settings-unhideble');
stg.style.display = 'block';
for (var i = 0; i < topLinks.length; i++) {
  topLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    stg = $(".quick-settings-unhideble");
    stg_back = $(".settings-back-unhideble");
    stg.toggleClass("opened-settings");
    stg_back.toggleClass("opened-settings-back");
  })
}
