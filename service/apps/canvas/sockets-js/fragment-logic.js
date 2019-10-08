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

  context.beginPath();
  context.rect(
    CanvasCharacteristic.firstX,
    CanvasCharacteristic.firstY,
    CanvasCharacteristic.width,
    CanvasCharacteristic.height
  );
  // console.log(FragmentsGeneralCharacteristic.widthScale);
  // console.log(FragmentsGeneralCharacteristic.heightScale * 4);
  context.lineWidth = "10";
  context.strokeStyle = "green";
  context.stroke();
  for (i = 0; i < arr.length; i++) {
    arr[i].draw();
  }
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
function getRandomArbitary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

// При загрузке экрана
var lastDownTarget = null;
var shouldConnect = false;
window.onload = function() {
  canvas = document.getElementById("canvas-puzzle");
  context = canvas.getContext('2d');

  // Заполнение массива изображениями
  for (i = 0; i < countImages; i++) {
    x = i % imagesX;
    y = Math.floor(i / imagesY);

    leftId = i % imagesX - 1; // ИСПРАВЛЕНИЕ БАГА в todoist (leftId = i - 1;)
    topId = i - imagesY;

    console.log(i, x, y, leftId, topId);
    // console.log(getRandomArbitary(0, 1900));
    //getRandomArbitary(320,1520), getRandomArbitary(280,880),
    let newX = getRandomArbitary(320,1520);
    let newY =getRandomArbitary(280,880);
    arr.push(
      new Fragment(
        DIRECTORY + (i + 1) + '.png',
        0, 0, i,
        (leftId >= 0 ? arr[i - 1] : null), (topId >= 0 ? arr[topId] : null)
      )
    );
    //заполняем массив координат функции см в socket-additional-functions.js
    // fragmentPositionsInitialize(i, 0, 0);
  }


  // Отслеживать перемещение курсора мыши
  canvas.onmousemove = function(e) {
    var loc = getCoords(canvas, e.clientX, e.clientY);
    if (SelectFragmentHelper.translatedFragmentId >= 0) {
      sendNewFragmentPostion(SelectFragmentHelper.translatedFragmentId,
        loc.x - SelectFragmentHelper.deltaX, loc.y - SelectFragmentHelper.deltaY, "no-smooth");
      arr[SelectFragmentHelper.translatedFragmentId].move(loc.x - SelectFragmentHelper.deltaX,
        loc.y - SelectFragmentHelper.deltaY);

    }

  };

  // Отслеживать нажатие на кнопки мыши
  canvas.onmousedown = function(e) {
    shouldConnect = true;
    for (i = arr.length - 1; i >= 0; i--) {
      var loc = getCoords(canvas, e.clientX, e.clientY);
      if (arr[i].isHadPoint(loc.x, loc.y)) {
        ranges = arr[i].rangeToStartImage(loc.x, loc.y);
        SelectFragmentHelper.deltaX = ranges.x;
        SelectFragmentHelper.deltaY = ranges.y;
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

      // координатный номер пазла
      i = SelectFragmentHelper.translatedFragmentId;
      x = i % imagesX;
      y = Math.floor(i / imagesY);
      if (shouldConnect) {
        try {
          // console.log(selectedFragment);
        } catch {}
        if (x == 0 && y == 0 && arr[i].rangeFromLeftTop(CanvasCharacteristic.firstX, CanvasCharacteristic.firstY) <= FragmentsGeneralCharacteristic.connectRange) {
          let tmpX = CanvasCharacteristic.firstX - FragmentsGeneralCharacteristic.third_x;
          let tmpY = CanvasCharacteristic.firstY - FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (x == imagesX - 1 && y == 0 && arr[i].rangeFromRightTop(CanvasCharacteristic.lastX, CanvasCharacteristic.firstY) <= FragmentsGeneralCharacteristic.connectRange) {
          let tmpX = CanvasCharacteristic.lastX + FragmentsGeneralCharacteristic.third_x - FragmentsGeneralCharacteristic.widthScale;
          let tmpY = CanvasCharacteristic.firstY - FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (x == imagesX - 1 && y == imagesY - 1 && arr[i].rangeFromRightBottom(CanvasCharacteristic.lastX, CanvasCharacteristic.lastY) <= FragmentsGeneralCharacteristic.connectRange) {
          let tmpX = CanvasCharacteristic.lastX + FragmentsGeneralCharacteristic.third_x - FragmentsGeneralCharacteristic.widthScale;
          let tmpY = CanvasCharacteristic.lastY + FragmentsGeneralCharacteristic.third_y - FragmentsGeneralCharacteristic.heightScale;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (x == 0 && y == imagesY - 1 && arr[i].rangeFromLeftBottom(CanvasCharacteristic.firstX, CanvasCharacteristic.lastY) <= FragmentsGeneralCharacteristic.connectRange) {
          let tmpX = CanvasCharacteristic.firstX - FragmentsGeneralCharacteristic.third_x;
          let tmpY = CanvasCharacteristic.lastY + FragmentsGeneralCharacteristic.third_y - FragmentsGeneralCharacteristic.heightScale;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (topFragment != null && topFragment.canConnectBottomFragment()) {
          coords = topFragment.leftBot();
          x = coords.x;
          y = coords.y;
          let tmpX = x - FragmentsGeneralCharacteristic.third_x;
          let tmpY = y - FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (leftFragment != null && leftFragment.canConnectRightFragment()) {
          console.log("canConnectRightFragment");
          coords = leftFragment.rightTop();
          x = coords.x;
          y = coords.y;

          let tmpX = x - FragmentsGeneralCharacteristic.third_x;
          let tmpY = y - FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (bottomFragment != null && bottomFragment.canConnectTopFragment()) {
          console.log("canConnectTopFragment");
          coords = bottomFragment.leftTop();
          x = coords.x;
          y = coords.y;
          let tmpX = x - FragmentsGeneralCharacteristic.third_x;
          let tmpY = y - FragmentsGeneralCharacteristic.heightScale + FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        } else if (rightFragment != null && rightFragment.canConnectLeftFragment()) {
          coords = rightFragment.leftTop();
          x = coords.x;
          y = coords.y;
          let tmpX = x - FragmentsGeneralCharacteristic.widthScale + FragmentsGeneralCharacteristic.third_x;
          let tmpY = y - FragmentsGeneralCharacteristic.third_y;
          sendNewFragmentPostion(selectedFragment.id, tmpX, tmpY, "smooth");
          selectedFragment.smoothMove(tmpX, tmpY);
        }
      }

      SelectFragmentHelper.translatedFragmentId = -1;

    }
  }

  document.addEventListener('mousedown', function(event) {
    lastDownTarget = event.target;
  }, false);

  document.addEventListener('keydown', function(event) {
    if (lastDownTarget == canvas) {
      if (event.keyCode == 32) {
        if (shouldConnect)
          shouldConnect = false;
        else shouldConnect = true;
        console.log("shouldConnect is", shouldConnect);
      }
    }
  }, false);

  // Анимация с определённой частотой для обновления экрана
  setInterval(update, 1000 / FRAMES);

}

// Функция для анимации с определённой частотой для обновления экрана
function update() {
  drawAll();
}
