
function hideAllrooms() {
  let switchers = $(".room-menu-switcher-li");
  let contents = $(".room-switcher");

  for(let i=0;i<contents.length;i++){
    contents[i].classList.add("hidden");
    switchers[i].classList.remove("room-menu-switcher-li-active");
  }
};
function addEvent(index) {
  let switchers = $(".room-menu-switcher-li");
  let contents = $(".room-switcher");

  switchers[index].addEventListener("click",function(){
    hideAllrooms();
    contents[index].classList.remove("hidden");
    switchers[index].classList.add("room-menu-switcher-li-active");
  });
};
for(let i=0;i<2;i++){
  addEvent(i);
};
