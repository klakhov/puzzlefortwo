let block1 = document.getElementById('block1');
let block2 = document.getElementById('block2');
let blockZone = document.getElementById('block1-zone');
let zone1 = document.getElementById('zone1');
let offX;
let offY;


class Zone {
  constructor(id) {
    let zone = document.getElementById(id);
    this.obj = zone.getBoundingClientRect();

    this.zoneXleft = this.obj.x;
    this.zoneYtop = this.obj.y;
    this.zoneXright = this.obj.x + this.obj.width;
    this.zoneYbottom = this.obj.y + this.obj.height;

  }

  dotInZone(x, y) {
    if((x > this.zoneXleft)&&(x < this.zoneXright)&&(y > this.zoneYtop)&&(y < this.zoneYbottom)){
      return true;
    }else {
      return false;
    }
  }

  blockInZone(dotX,dotY, dotX2, dotY2) {
    if(this.dotInZone(dotX,dotY) && this.dotInZone(dotX, dotY2) && this.dotInZone(dotX2, dotY) && this.dotInZone(dotX2, dotY2)){
      return true;
    }else{
      return false;
    }
  }
}

function blockUpdate(num, top, left) {
  $.ajax({
    type:"POST",
    url:"../../service/apps/room/canvas-update.php",
    data:{'top':top, 'left':left, 'block':num},
    success:function () {
      alert("Block data updated");
    }
  })
}

zone1.addEventListener("click",function (event) {
  console.log(event.pageX, event.pageY);
})

block1.addEventListener("dragstart",function (event) {
  offX = event.offsetX;
  offY = event.offsetY;
  this.style.opacity = 0.001;
});

block1.addEventListener("dragend",function(event) {
  console.log(event.pageX, event.pageY);
  zone1 = new Zone('zone1');
  let dotY = event.pageY - offY;
  let dotX = event.pageX - offX;
  let dotY2 = dotY + 100;
  let dotX2 = dotX + 100;

  if(zone1.blockInZone(dotX, dotY, dotX2, dotY2)){
    let top = (event.pageY - 100 - offY) + 'px';
    let left = (event.pageX - 100 - offX) + 'px';
    block1.style.top = top;
    block1.style.left = left;
    blockUpdate(1, top, left);
    block1.style.opacity = 1;
  }else{
    this.style.opacity = 1;
  };
});


block2.addEventListener("dragstart",function (event) {
  offX = event.offsetX;
  offY = event.offsetY;
  this.style.opacity = 0.001;
});

block2.addEventListener("dragend",function(event) {
  console.log(event.pageX, event.pageY);
  zone1 = new Zone('zone2');
  let dotY = event.pageY - offY;
  let dotX = event.pageX - offX;
  let dotY2 = dotY + 100;
  let dotX2 = dotX + 100;

  if(zone1.blockInZone(dotX, dotY, dotX2, dotY2)){
    let top = (event.pageY - 100 - offY) + 'px';
    let left = (event.pageX - 100 - offX) + 'px';
    block2.style.top = top;
    block2.style.left = left;
    blockUpdate(2, top, left);
    block2.style.opacity = 1;
  }else{
    this.style.opacity = 1;
  };

});
