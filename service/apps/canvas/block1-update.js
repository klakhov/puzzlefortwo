
function block1Update() {
  $.ajax({
    type:"POST",
    url:"../../service/apps/room/block1-update.php",
    success:function (data) {
      result = JSON.parse(data);
      let newTopSub = result['top'];
      let newLeftSub = result['left'];
      block1.style.top = newTopSub;
      block1.style.left = newLeftSub;
      console.log(block2.getBoundingClientRect());
      // let newTop = "";
      // let newLeft = "";
      // for(let i = 0; i<newTopSub.length-2; i++){
      //     newTop += newTopSub[i];
      // };
      // for(let i = 0; i<newLeftSub.length-2; i++){
      //     newLeft += newLeftSub[i];
      // };
      // newLeft = Number(newLeft);
      // block2.style.top = newTop + "px";
      // block2.style.left = newLeft + "px";
      //
      // newTop = Number(newTop);
      // newLeft = Number(newLeft);
      //
      // obj = block2.getBoundingClientRect();
      //
      //
      // let oldTop = obj.y;
      // let oldLeft = obj.x;
      // const time = 600;
      // const rate = 20;
      // let tact = time/rate;
      //
      // let xDict = newLeft - oldLeft;
      // let yDict = newTop - oldTop;
      //
      // let xt = xDict/tact;
      // let yt = xDict/tact;
      // console.log(xt, yt);
      // let currentTact = 1;
      // function upd() {
      //   obj = block2.getBoundingClientRect();
      //   let currentTop = obj.y;
      //   let currentLeft = obj.x;
      //   currentTop += yt;
      //   currentLeft += xt;
      //   block2.style.top = currentTop + "px";
      //   block2.style.left = currentLeft + "px";
      //   if(currentTact < tact){
      //     currentTact += 1;
      //     setTimeout(upd, rate);
      //   };
      // };
      // upd();

      setTimeout(block1Update,100);
    }
  })
};
block1Update();
