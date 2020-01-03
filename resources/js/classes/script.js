function drawAll(canvas, context) {
  context.lineWidth = "1";

  context.clearRect(0,
    0,
    canvas.canvas.width,
    canvas.canvas.height
  );
  canvas.panel.drawFragments(context);
  var lastSeenObject = FragmentList.firstVisualObject;
  do {
    lastSeenObject.value.draw(context);
    lastSeenObject = lastSeenObject.next;
  } while (lastSeenObject != null)

  canvas.drawBlank(context);
  canvas.draw(context);
}

function initializeFragmentList(arr) {
  for (i = 0; i < countImages; i++) {
    var x = i % imagesX;
    var y = Math.floor(i / imagesY);

    var leftId = i % imagesX - 1;
    var topId = i - imagesY;

    arr.push(
      new Fragment(
        i,
        DIRECTORY + (i + 1) + '.png',
        DIRECTORY + (i + 1) + '_.png',
        100, 100,
        (leftId >= 0 ? arr[i - 1] : null), (topId >= 0 ? arr[topId] : null),
        i
      )
    );

    canvas.panel.fragments[i] = i;

    if (FragmentList.lastVisualObject == null) {
      FragmentList.lastVisualObject = new FragmentList(arr[arr.length - 1], null);
      FragmentList.firstVisualObject = FragmentList.lastVisualObject;
    } else {
      FragmentList.lastVisualObject = new FragmentList(arr[arr.length - 1], FragmentList.lastVisualObject);
    }
  }
}

function initializeSizes(fragment, img) {

  canvas.field.all_width = canvas.canvas.width * FIELD_WIDTH;
  canvas.field.all_height = canvas.canvas.height * FIELD_HEIGHT;

  fragment.init(img);

  canvas.field.init();
  canvas.panel.init();

  canvas.left_menu.init();
  canvas.right_menu.init();

  canvas.createBlankZones();
}

window.onload = function() {

  console.log("Started");
  canvas = new Canvas("canvas-puzzle", countImages);
  canvas.initElements();
  initializeFragmentList(arr);

  canvas.canvas.onmousemove = function(e) {
    var loc = canvas.getCoords(e.clientX, e.clientY);
    if (SelectFragmentHelper.translatedFragmentId >= 0) {
      if (canvas.isInZones(loc.x, loc.y)) {
        var newX = loc.x - SelectFragmentHelper.deltaX;
        var newY = loc.y - SelectFragmentHelper.deltaY;
        if (arr[SelectFragmentHelper.translatedFragmentId].group == null) {
          arr[SelectFragmentHelper.translatedFragmentId].move(newX, newY);

        } else if (arr[SelectFragmentHelper.translatedFragmentId].group != null) {
          arr[SelectFragmentHelper.translatedFragmentId].group.move(
            newX, newY,
            arr[SelectFragmentHelper.translatedFragmentId]
          );
        }
      }
    }

    canvas.panel.onmousemove(loc.x, loc.y);
    canvas.left_menu.onmousemove(loc.x, loc.y);
    canvas.right_menu.onmousemove(loc.x, loc.y);
  };

  canvas.canvas.onmousedown = function(e) {
    var loc = canvas.getCoords(e.clientX, e.clientY);
    shouldConnect = true;
    var loc = canvas.getCoords(e.clientX, e.clientY);
    if (canvas.panel.onmousedown(loc)) {
      return;
    }

    var lastSeenObject = FragmentList.lastVisualObject;
    do {
      var value = lastSeenObject.value;
      var objInCoords = value.isHadPoint(loc.x, loc.y); // у группы или фрагмента
      if (value instanceof Fragment) {
        if (objInCoords) {
          if (!value.smoothing && !value.isConnecting) {
            // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
            if (value.onBottomPanel) {
              value.onBottomPanel = false;
              value.moveToPanel();
            }
            ranges = value.rangeToStartImage(loc.x, loc.y);
            SelectFragmentHelper.deltaX = ranges.x;
            SelectFragmentHelper.deltaY = ranges.y;
            SelectFragmentHelper.translatedFragmentId = value.ind;
            lastSeenObject.replaceToTop(); // отображать поверх других объектов
            break;
          }
        }
      } else if (value instanceof FragmentGroup) {
        if (objInCoords > -1) {
          if (!value.smoothing && !value.isConnecting) {
            // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
            ranges = arr[objInCoords].rangeToStartImage(loc.x, loc.y);
            SelectFragmentHelper.deltaX = ranges.x;
            SelectFragmentHelper.deltaY = ranges.y;
            SelectFragmentHelper.translatedFragmentId = objInCoords;
            lastSeenObject.replaceToTop(); // отображать поверх других объектов
            break;
          }
        }
      }
      lastSeenObject = lastSeenObject.prev;
    } while (lastSeenObject != null)
  }


  canvas.canvas.onmouseup = function(e) {
    if (SelectFragmentHelper.translatedFragmentId >= 0) {
      if (canvas.onMenuZone()) {

      }

      var loc = canvas.getCoords(e.clientX, e.clientY);
      var selectedFragment = arr[SelectFragmentHelper.translatedFragmentId];

      if (selectedFragment.group != null) {
        selectedFragment.group.editMenuCoords(selectedFragment);
      } else {
        selectedFragment.editMenuCoords();
      }

      if (selectedFragment.group == null && canvas.panel.isHadPoint(loc.x, loc.y)) {
        selectedFragment.onBottomPanel = true;
      }

      if (shouldConnect) {
        FragmentList.lastVisualObject.value.connectTo();
      }
      SelectFragmentHelper.translatedFragmentId = -1;
    }
  }

  document.addEventListener('mousedown', function(event) {
    // if (lastDownTarget != event.target) {
    //   showSilhouette = false;
    // }
    // lastDownTarget = event.target;
  }, false);

  document.addEventListener('keydown', function(event) {
    if (event.keyCode == KEY_shouldConnect) {
      if (shouldConnect)
        shouldConnect = false;
      else shouldConnect = true;
      console.log("shouldConnect is", shouldConnect);
    }
    if (event.keyCode == KEY_showSilhouette) {
      showSilhouette = true;
    }
    if (event.keyCode == 49) {
      var lastSeenObject = FragmentList.lastVisualObject;
      do {
        console.log(lastSeenObject);
        lastSeenObject = lastSeenObject.prev;
      } while (lastSeenObject != null)
      console.log("\nEND\n")
    }

    if (event.keyCode == 50) {
      console.log(canvas.blank_zones);
    }
  }, false);

  document.addEventListener('keyup', function(event) {
    if (event.keyCode == KEY_showSilhouette) {
      showSilhouette = false;
    }
  }, false);

  // Анимация с определённой частотой для обновления экрана
  setInterval(update, 1000 / FRAMES);

}

// Обновление экрана
function update() {
  drawAll(canvas, canvas.context);
}
