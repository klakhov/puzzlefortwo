let slideIndex = 0;
let imgBlock = document.getElementById('slider');
function slide() {
  switch (slideIndex) {
    case 0:
      imgBlock.style.backgroundImage="url(../../patterns/sliders/main-page/img/img_nature_wide.jpg)";
      break;
    case 1:
      imgBlock.style.backgroundImage="url(../../patterns/sliders/main-page/img/img_mountains_wide.jpg)";
      break;
  }
  console.log('1');
  slideIndex++;
  if(slideIndex > 1){
    slideIndex = 0;
  }
  setTimeout(slide, 5000);
}
slide();
