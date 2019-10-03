const FRAMES = 45;
const imagesX = 4;
const imagesY = 4;

const DIRECTORY = "images/"

let SCALE = -1;


// Вспомогательный объект, который необходим при удержании изображения мышью
// Способен определить индекс изображения в массиве, а так же запомнить
// Разницу между координатами курсора мыши и началом изображения в левом верхнем
// углу из метода "rangeToStartImage(x, y)" класса "Fragment"
var SelectFragmentHelper = {
  translatedFragmentId: -1,
  deltaX: 0,
  deltaY: 0
};


// Массив для изображений
arr = [];

// Функция для очистки экрана и вывода всех элементов
// Работает с определённой частотой
function drawAll() {
  context.clearRect(0,
    0,
    canvas.width,
    canvas.height
  );
  for (i = 0; i < arr.length; i++) {
    arr[i].draw();
  }
}

// Не рабочая функция
function getColor(x, y) {
  context.getImageData(x, y, 1, 1).data
}

// Определяет координаты пользователя в границах canvas
function getCoords(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: (x - bbox.left) * (canvas.width / bbox.width),
    y: (y - bbox.top) * (canvas.height / bbox.height)
  };
}
//рандом чисел
function getRandomArbitary(min,max) {
  return Math.ceil(Math.random()*(max-min)+min);
}

// Бесполезная функция
function downloadImage() {
  base_image = new Image();
  base_image.src = 'i.png';
  base_image.onload = function() { // can  not work without this function
    console.log("Download");
    context.drawImage(base_image, 0, 0, base_image.width * 0.5, base_image.height * 0.5);
    //setInterval(update, 1000/30);
  }
}

// При загрузке экрана
window.onload = function() {

  console.log("Started");
  canvas = document.getElementById("canvas-puzzle");
  context = canvas.getContext('2d');

  // Определяет размер каждого изображения
  SCALE = Math.floor(Math.min(canvas.width / imagesX, canvas.height / imagesY));
  console.log("Size:", canvas.width + "x" + canvas.height);

  // Заполнение массива изображениями
  for (i = 0; i < imagesX * imagesY; i++) {
    x = i % imagesX;
    y = Math.floor(i / imagesY);

    leftId = i - 1;
    topId = i - imagesY;

    //console.log(i, x, y);
    // console.log(getRandomArbitary(0, 1900));
    //getRandomArbitary(320,1520), getRandomArbitary(280,880),
    arr.push(new Fragment(DIRECTORY + (i + 1) + '.png',
    getRandomArbitary(320,1520), getRandomArbitary(280,880), 1, (leftId >= 0 ? arr[leftId] : null),
    (topId >= 0 ? arr[topId] : null)));
  }

  // Отслеживать перемещение курсора мыши
  canvas.onmousemove = function(e) {
    var loc = getCoords(canvas, e.clientX, e.clientY);
    //console.log(loc.x, loc.y);
    if (SelectFragmentHelper.translatedFragmentId >= 0) {
      arr[SelectFragmentHelper.translatedFragmentId].move(loc.x - SelectFragmentHelper.deltaX,
        loc.y - SelectFragmentHelper.deltaY);
    }
  };
  //downloadImage();

  // Отслеживать нажатие на кнопки мыши
  canvas.onmousedown = function(e) {
    //alert("!");
    for (i = arr.length - 1; i >= 0; i--) {
      var loc = getCoords(canvas, e.clientX, e.clientY);
      if (arr[i].isHadPoint(loc.x, loc.y)) {
        ranges = arr[i].rangeToStartImage(loc.x, loc.y);
        SelectFragmentHelper.deltaX = ranges.x;
        SelectFragmentHelper.deltaY = ranges.y;
        //console.log(true, i);
        SelectFragmentHelper.translatedFragmentId = i;
        console.log("Image number", SelectFragmentHelper.translatedFragmentId);
        break;
      }
    }
  }


  // Отслеживать отжатие кнопок мыши
  canvas.onmouseup = function(e) {
    if (SelectFragmentHelper.translatedFragmentId >= 0) {
      selectedFragment = arr[SelectFragmentHelper.translatedFragmentId];
      leftFragment = selectedFragment.left;
      rightFragment = selectedFragment.right;
      topFragment = selectedFragment.top;
      bottomFragment = selectedFragment.bottom;

      if(topFragment != null && topFragment.canConnectBottomFragment()){
          coords = topFragment.leftBot();
          x = coords.x;
          y = coords.y;
          selectedFragment.smoothMove(x - selectedFragment.third, y - selectedFragment.third);
      }else if (leftFragment != null && leftFragment.canConnectRightFragment()) {
          coords = leftFragment.rightTop();
          x = coords.x;
          y = coords.y;
          selectedFragment.smoothMove(x - selectedFragment.third, y - selectedFragment.third);
      }else if (bottomFragment != null && bottomFragment.canConnectTopFragment()) {
          coords = bottomFragment.leftTop();
          x = coords.x;
          y = coords.y;
          selectedFragment.smoothMove(x - selectedFragment.third, y - SCALE + selectedFragment.third);
      }else if(rightFragment != null && rightFragment.canConnectLeftFragment()){
          coords = rightFragment.leftTop();
          x = coords.x;
          y = coords.y;
          selectedFragment.smoothMove(x - SCALE + selectedFragment.third, y - selectedFragment.third);

      }

      SelectFragmentHelper.translatedFragmentId = -1;

    }
  }

  // Анимация с определённой частотой для обновления экрана
  setInterval(update, 1000 / FRAMES);

}

// Функция для анимации с определённой частотой для обновления экрана
function update() {
  drawAll();
}
