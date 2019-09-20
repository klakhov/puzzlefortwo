let content = document.getElementsByClassName('left_menu_switcher');
let buttons = document.getElementsByClassName('left-menu-li');

function hideAll(divs) {
  for(let i=0;i<divs.length;i++){
    divs[i].classList.add('hidden');
  };
};

function unselectAll(items) {
  for(let i=0;i<items.length;i++){
    items[i].classList.remove('left-menu-active');
  };
};

function setListener(item,index) {
  item.addEventListener('click',function(){
    hideAll(content);
    content[index].classList.remove('hidden');

    if(index == 0) {
      updateProfileDinamicElements();
    }

    unselectAll(buttons);
    item.classList.add('left-menu-active');
  });
};

function updateProfileDinamicElements() {
  $.ajax({
        type:"POST",
        url:"../../service/apps/profile/profile-follows.php",
        data:{},
        success:function(data){
          let response = JSON.parse(data);
          console.log(response["response"]);
          $("#follows-overflow").html("");
          response["response"].forEach(function(item, i, arr) {
            $("#follows-overflow").html($("#follows-overflow").html() + item);
          })
        }
  })

}

for(let i=0;i<buttons.length;i++){
  setListener(buttons[i],i);
};
