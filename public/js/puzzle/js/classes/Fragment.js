// Возможно стоит убрать подключение к smoothing объекту. а то проблем слишком дохуя??
// на заметку, потом посмотрим


var hello = 4;
class Fragment {
  static SCALE = -1;
  static downloadedImages = 0;
  static width = -1;
  static height = -1;
  static widthScale = -1;
  static heightScale = -1;
  static third_x = -1;
  static third_y = -1;
  static connectRange = -1;

  static widthPanel = -1;
  static heightPanel = -1;
  static third_xPanel = -1;
  static third_yPanel = -1;
  static widthWithoutSpacesPanel = -1;
  static heightWithoutSpacesPanel = -1;


  constructor(ind, src, srcBorder, x, y, left, top, bottomInd) {
    this.src = src;
    this.srcB = srcBorder; // путь до изображения с границами изображения
    this.x = x;
    this.y = y;
    this.menuDX = 0;
    this.menuDY = 0;
    this.img = new Image();
    this.imgB = new Image(); // image-border

    this.mainFragment = this;

    this.downloadImage();

    this.img.src = this.src;
    this.imgB.src = this.srcB;
    this.ind = ind;
    this.onBottomPanel = true;
    this.onMenu = false;
    this.onMenuLast = false;
    this.bottomPanelInd = bottomInd;

    this.smoothing = false; // для ограничения движения объекта во время анимации
    this.isConnecting = false; // объект конектит другой, а потому не может быть выбран. Необходим int, т.к. можно подключать несколько сразу
    // После первого isConnecting станет false, хотя подключается ещё второй объект, а потому будет


    Fragment.third_x = Fragment.SCALE / 5;
    Fragment.third_y = Fragment.SCALE / 5;
    Fragment.connectRange = Fragment.third_x * 2; // ВРЕМЕННО

    this.left = left;
    this.top = top;
    this.right = null;
    this.bottom = null;
    if (this.left != null)
      this.left.right = this;
    if (this.top != null)
      this.top.bottom = this;

    this.group = null;
    this.listElem = null; // заполняется
  }

  init(img) {
    Fragment.width = img.width;
    Fragment.height = img.height;

    Fragment.SCALE = (
      Math.min(
        canvas.field.all_width / (imagesX / 5 * 3) / Fragment.width,
        canvas.field.all_height / (imagesY / 5 * 3) / Fragment.height
      )
    );
    Fragment.widthScale = Math.floor(Fragment.SCALE * Fragment.width);
    Fragment.heightScale = Math.floor(Fragment.SCALE * Fragment.height);

    Fragment.third_x = Fragment.widthScale / 5;
    Fragment.third_y = Fragment.heightScale / 5;
    Fragment.widthWithoutSpaces = Fragment.widthScale - 2 * Fragment.third_x;
    Fragment.heightWithoutSpaces = Fragment.heightScale - 2 * Fragment.third_y;

    Fragment.connectRange = 2.5 * Math.min(
      Fragment.third_x,
      Fragment.third_y
    );
  }

  downloadImage() {
    var fr = this;
    this.img.onload = function() {
      Fragment.downloadedImages++;
      if (Fragment.downloadedImages == 1) {
        initializeSizes(fr, this)
      }
    }
  }

  // Отображает изображение в заданных координатах
  draw(context) {
    if (!showSilhouette) {
      if (!this.onBottomPanel) {
        // изобразить элемент, если он не на панели
        let selected = (this.group != null) ? this.group : this;
        if (selected.onMenu) {
          // Menu
          context.drawImage(
            this.img,
            selected.mainFragment.x + this.menuDX + Fragment.third_xPanel,
            selected.mainFragment.y + this.menuDY + Fragment.third_yPanel,
            Fragment.widthPanel,
            Fragment.heightPanel
          );
        } else {
          // Обычное расположение на поле
          context.drawImage(
            this.img,
            this.x,
            this.y,
            Fragment.widthScale,
            Fragment.heightScale
          );
          context.drawImage(
            this.imgB,
            this.x,
            this.y,
            Fragment.widthScale,
            Fragment.heightScale
          );
        }
      }
    } else {
      // изобразить силуэт
      let selected = (this.group != null) ? this.group : this;
      if (selected.onMenu) {
        context.beginPath();
        context.rect(
          selected.mainFragment.x + this.menuDX + 2 * Fragment.third_xPanel,
          selected.mainFragment.y + this.menuDY + 2 * Fragment.third_yPanel,
          Fragment.widthPanel - 2 * Fragment.third_xPanel,
          Fragment.heightPanel - 2 * Fragment.third_yPanel
        );
        context.lineWidth = "3";
        context.strokeStyle = "black";
        context.stroke();
      } else if (!this.onBottomPanel) {
        context.beginPath();
        context.rect(
          this.x + Fragment.third_x,
          this.y + Fragment.third_y,
          Fragment.widthScale - 2 * Fragment.third_x,
          Fragment.heightScale - 2 * Fragment.third_y
        );
        context.lineWidth = "5";
        context.strokeStyle = "black";
        context.stroke();
      }
    }
  }

  // Проверяет, есть ли в границах изображения заданная точка или нет
  // Нужно для проверки наведения курсора мыши на изображение
  isHadPoint(x, y) {
    if (this.onBottomPanel) {
      return (
        canvas.panel.fragmentsCount * (canvas.panel.list - 1) <= this.bottomPanelInd &&
        this.bottomPanelInd < canvas.panel.fragmentsCount * canvas.panel.list &&
        x >= (canvas.panel.firstX + canvas.panel.buttonWidth + canvas.panel.paddingX + (canvas.panel.fragmentSpace + Fragment.widthPanel) * (
          this.bottomPanelInd % canvas.panel.fragmentsCount)) &&
        x <= (canvas.panel.firstX + canvas.panel.buttonWidth + canvas.panel.paddingX + (canvas.panel.fragmentSpace + Fragment.widthPanel) * (
          this.bottomPanelInd % canvas.panel.fragmentsCount) + Fragment.widthPanel) &&
        y >= canvas.panel.firstY + canvas.panel.paddingY &&
        y <= canvas.panel.firstY + canvas.panel.paddingY + Fragment.heightPanel
      )
    }

    let selected = (this.group != null) ? this.group : this;
    if (selected.onMenu) {
      console.log(Fragment.third_xPanel);
      var tmp = (
        x >= (selected.mainFragment.x + this.menuDX + 2 * Fragment.third_xPanel) &&
        x <= (selected.mainFragment.x + this.menuDX + Fragment.widthPanel + 2 * Fragment.third_xPanel) &&
        y >= (selected.mainFragment.y + this.menuDY + Fragment.third_yPanel) &&
        y <= (selected.mainFragment.y + this.menuDY + Fragment.heightPanel - Fragment.third_yPanel)
      )
      // console.log("!", tmp, this.src);
      // console.log(selected.mainFragment.x + this.menuDX + 2 * Fragment.third_xPanel, x,
      //   (selected.mainFragment.x + this.menuDX + Fragment.widthPanel - Fragment.third_xPanel)
      // )
      return (
        x >= (selected.mainFragment.x + this.menuDX + 2 * Fragment.third_xPanel) &&
        x <= (selected.mainFragment.x + this.menuDX + Fragment.widthPanel) &&
        y >= (selected.mainFragment.y + this.menuDY + 2 * Fragment.third_yPanel) &&
        y <= (selected.mainFragment.y + this.menuDY + Fragment.heightPanel)

      )
    }

    return (
      x >= this.x + Fragment.third_x &&
      x <= (this.x + Fragment.widthScale - Fragment.third_x) &&
      y >= (this.y + Fragment.third_y) &&
      y <= (this.y + Fragment.heightScale - Fragment.third_y)

    )
  }

  editMenuCoords() {
    this.menuDX = Fragment.third_x;
    this.menuDY = Fragment.third_y;
  }


  setMenuD(dl) {
    // вызывается только из группы и 1 раз за onmouseup. В проверке нет необходимости

    if (dl) {
      // поставить в зависимости от главного, в меню
      this.menuDX = Fragment.third_x + (
        (this.x - this.group.mainFragment.x) / Fragment.widthScale * Fragment.widthPanel
      );
      this.menuDY = Fragment.third_y + (
        (this.y - this.group.mainFragment.y) / Fragment.heightScale * Fragment.heightPanel
      );
    } else {
      this.menuDX = Fragment.third_x;
      this.menuDY = Fragment.third_y;
    }
  }

  // Расстояниме от курсора мыши до старта изображения в левом верхнем углу в пикселях.
  // Если это расстояние не учитывать, то изображение при его взятии будет телепортировано
  // Левым верхним углом к положению курсора, а так к тому положению прибавляется разница
  // в координатах, обеспечивая тем самым отсутствие рывков
  rangeToStartImage(x, y) {
    return {
      x: x - this.x,
      y: y - this.y
    };
  }

  moveToPanel() {
    // edit
    var x = (canvas.panel.firstX + canvas.panel.buttonWidth + canvas.panel.paddingX + (canvas.panel.fragmentSpace + Fragment.widthPanel) * (
      this.bottomPanelInd % canvas.panel.fragmentsCount)) + Fragment.widthPanel / 2 - Fragment.widthScale / 2;
    var y = canvas.panel.firstY + canvas.panel.paddingY + Fragment.heightPanel / 2 - Fragment.heightScale / 2;
    this.move(x, y);
  }

  workGroups(selected, other) {
    if (selected.group == null) {
      if (other.group == null) {
        // создание группы
        selected.group = new FragmentGroup();
        other.group = selected.group;
        selected.group.fragments.add(selected);
        selected.group.fragments.add(other);
        selected.group.mainFragment = this;

        selected.listElem.value = selected.group; // ссылка на фрагмент заменяется на ссылку на группу
        selected.listElem.src = null; // убрать путь до картинки, а то некрасиво
        selected.group.listElemGroup = selected.listElem;
        other.listElem.remove(); // удаление "лишнего" объекта из очереди на запись, т.к. он уже отрисовывается в группе

      } else {
        // selected - not group;
        // other - group

        selected.group = other.group;
        selected.group.fragments.add(selected);

        selected.listElem.remove();

      }
    } else {
      if (other.group == null) {
        other.group = selected.group;
        selected.group.fragments.add(other);

        selected.listElem.value = selected.group; // ссылка на фрагмент заменяется на ссылку на чужую группу
        other.listElem.remove();

      } else {
        selected.group.listElemGroup.remove();
        selected.group.changeGroup(other.group);
      }
    }
  }

  rightTop() {
    return {
      x: this.x + Fragment.widthScale - Fragment.third_x,
      y: this.y + Fragment.third_y
    }
  }

  leftTop() {
    return {
      x: this.x + Fragment.third_x,
      y: this.y + Fragment.third_y
    }
  }

  rightBot() {
    return {
      x: this.x + Fragment.widthScale - Fragment.third_x,
      y: this.y + Fragment.heightScale - Fragment.third_y
    }
  }

  leftBot() {
    return {
      x: this.x + Fragment.third_x,
      y: this.y + Fragment.heightScale - Fragment.third_y
    }
  }

  canConnectRightFragment() {
    var leftTopOfRightFragment = this.right.leftTop();
    var tmpRes = this.rangeFromRightTop(leftTopOfRightFragment.x, leftTopOfRightFragment.y);
    if (tmpRes <= Fragment.connectRange)
      return {
        res: true,
        range: tmpRes
      };
    return {
      res: false
    };
  }

  rangeFromRightTop(x, y) {
    var rT = this.rightTop()
    return Math.sqrt((rT.y - y) * (rT.y - y) +
      (rT.x - x) * (rT.x - x))
  }

  canConnectLeftFragment() {
    var rightTopOfLeftFragment = this.left.rightTop();
    var tmpRes = this.rangeFromLeftTop(rightTopOfLeftFragment.x, rightTopOfLeftFragment.y);
    if (tmpRes <= Fragment.connectRange)
      return {
        res: true,
        range: tmpRes
      };
    return {
      res: false
    };
  }

  rangeFromLeftTop(x, y) {
    var lT = this.leftTop();
    return Math.sqrt((lT.y - y) * (lT.y - y) +
      (lT.x - x) * (lT.x - x))
  }

  canConnectBottomFragment() {
    var leftTopOfBottomFragment = this.bottom.leftTop();
    var tmpRes = this.rangeFromLeftBottom(leftTopOfBottomFragment.x, leftTopOfBottomFragment.y);
    if (tmpRes <= Fragment.connectRange)
      return {
        res: true,
        range: tmpRes
      };
    return {
      res: false
    };
  }

  rangeFromLeftBottom(x, y) {
    var lB = this.leftBot();
    return Math.sqrt((lB.y - y) * (lB.y - y) +
      (lB.x - x) * (lB.x - x))
  }

  canConnectTopFragment() {
    var leftBotOfTopFragment = this.top.leftBot();
    var tmpRes = this.rangeFromLeftTop(leftBotOfTopFragment.x, leftBotOfTopFragment.y);
    if (tmpRes <= Fragment.connectRange)
      return {
        res: true,
        range: tmpRes
      };
    return {
      res: false
    };
  }

  rangeFromRightBottom(x, y) {
    var rB = this.rightBot();
    return Math.sqrt((rB.y - y) * (rB.y - y) +
      (rB.x - x) * (rB.x - x))
  }

  smoothmoveOneOrGroup(fr, x, y, connectingFragment) {
    if (fr.group == null) {
      fr.smoothMove(x, y, connectingFragment);
    } else {
      fr.group.smoothMove(x, y, this, connectingFragment); // допилим позже
    }
  }

  /**
   *  @param int  newInd - индекс фрагмента, для которого стоит проверить возможность присоединения,
   *                       по умолчанию выбирается индекс фрагмента, передвигаемого игроком (SelectFragmentHelper.translatedFragmentId).
   *                       Рассмотрение от других фрагментов нужно при проверке подсоединения для нескольких фрагментов от одной группы
   *
   *  @param bool withConnect - выполнить присоединение после подтверждения соответствующей проверки,
   *                            по умолчанию присоединяет один фрагмент к другому
   *                            Проверка необходима при подсоединении группы к фрагментам, где сначала узнается вся информация о возможных
   *                            подсоединениях, а потом полученые данные сортируются по неубыванию, выполняя подсоединение к самому
   *                            близкому из возможных
   *
   *  @return object {
   *           res
   *           range
   *          }
   *
   */
  connectTo(newInd = null, withConnect = true) {
    var i = null;
    if (newInd == null) {
      i = SelectFragmentHelper.translatedFragmentId
    } else {
      i = newInd;
    }

    if (arr[i].onMenu) {
      return;
    }

    let connectArray = [];

    let leftFragment = this.left;
    let rightFragment = this.right;
    let topFragment = this.top;
    let bottomFragment = this.bottom;
    let inner_this = this;

    let x = i % imagesX;
    let y = Math.floor(i / imagesY);

    /**
     *  @param int  needX, needY - необходимые конечные координаты пазла в изображении, соответствующие заданному углу
     *
     *  @param float range - расстояние до заданного угла
     *
     *  @param int newX, newY - место, куда необходимо перенести пазл при выполнении всех условий
     *
     */
    function connectToCorner(needX, needY, range, newX, newY) {
      if (x == needX && y == needY && range <= Fragment.connectRange) {
        connectArray.push({
          range: range,
          x: newX,
          y: newY,
          fr: null
        });
      }
    }
    connectToCorner(0, 0, this.rangeFromLeftTop(canvas.field.firstX, canvas.field.firstY),
      canvas.field.firstX - Fragment.third_x,
      canvas.field.firstY - Fragment.third_y);
    connectToCorner(imagesX - 1, 0, this.rangeFromRightTop(canvas.field.lastX, canvas.field.firstY),
      canvas.field.lastX + Fragment.third_x - Fragment.widthScale,
      canvas.field.firstY - Fragment.third_y);
    connectToCorner(imagesX - 1, imagesY - 1, this.rangeFromRightBottom(canvas.field.lastX, canvas.field.lastY),
      canvas.field.lastX + Fragment.third_x - Fragment.widthScale,
      canvas.field.lastY + Fragment.third_y - Fragment.heightScale);
    connectToCorner(0, imagesY - 1, this.rangeFromLeftBottom(canvas.field.firstX, canvas.field.lastY),
      canvas.field.firstX - Fragment.third_x,
      canvas.field.lastY + Fragment.third_y - Fragment.heightScale);


    /**
     *  @param Fragment other - фрагмент, к которому идет подсоединение
     *
     *  @param object getInfo - расстояние до другого фрагмента
     *
     *  @param object getCoordinates - координаты одного из углов другого фрагмента
     *
     *  @param int newX, newY - координаты, которые необходимо добавить к третьему аргументу
     *                          для получения новых координат текущего фрагмента (this)
     *
     */
    function connectToFragment(other, getInfo, getCoordinates, newX, newY) {
      if (
        getInfo.res && (inner_this.group == null || !inner_this.group.fragments.has(other)) &&
        !other.onBottomPanel && (other.group != null && !other.group.onMenu || !other.onMenu)
      ) {
        // работает только на объекты, отсутствующие в группе, панели и меню
        connectArray.push({
          range: getInfo.range,
          x: getCoordinates.x,
          y: getCoordinates.y,
          dX: newX,
          dY: newY,
          fr: other
        })
      }
    }
    if (topFragment != null)
      connectToFragment(topFragment, topFragment.canConnectBottomFragment(),
        topFragment.leftBot(),
        -Fragment.third_x, -Fragment.third_y);
    if (leftFragment != null)
      connectToFragment(leftFragment, leftFragment.canConnectRightFragment(),
        leftFragment.rightTop(),
        -Fragment.third_x, -Fragment.third_y);
    if (bottomFragment != null)
      connectToFragment(bottomFragment, bottomFragment.canConnectTopFragment(),
        bottomFragment.leftTop(),
        -Fragment.third_x,
        -Fragment.heightScale + Fragment.third_y);
    if (rightFragment != null)
      connectToFragment(rightFragment, rightFragment.canConnectLeftFragment(),
        rightFragment.leftTop(),
        -Fragment.widthScale + Fragment.third_x,
        -Fragment.third_y);

    connectArray.sort(function(a, b) {
      return a.range - b.range
    });

    if (connectArray.length > 0) {
      var near = connectArray[0];
      if (withConnect) {
        if (near.fr == null) {
          // идет присоединение к углу, а не к фрагменту
          this.smoothmoveOneOrGroup(this, near.x, near.y);
        } else {
          // подсоединение к фрагменту
          let near_frg = (near.fr.group == null) ? near.fr : near.fr.group;
          if (!near_frg.smoothing && !near_frg.isConnecting) {
            this.smoothmoveOneOrGroup(this, near.x + near.dX, near.y + near.dY, near.fr);
          }
        }
      }

      return {
        res: true,
        range: near.range
      };
    }
    return {
      res: false
    };
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
   *  @param int newX - новая координата x
   *
   *  @param int newY - новая координата y
   *
   *  @param Fragment connectingFragment - фрагмент, к которому, возможно,
   *                                       подключается наш фрагмент
   *
   *
   */
  smoothMove(newX, newY, connectingFragment = null) {
    let near = null;
    let this_frg = (this.group == null) ? this : this.group;
    // группа или одиночный фрагмент, к которому идет подключение

    this_frg.smoothing = true;
    if (connectingFragment != null) {
      near = (connectingFragment.group == null) ? connectingFragment : connectingFragment.group;
      near.isConnecting = true;
    }


    let oldX = this.x;
    let oldY = this.y;
    let tact = 21;
    let currentTact = 0;
    let dX = (newX - oldX) / (tact);
    let dY = (newY - oldY) / (tact);
    let this_fr = this;

    let frame_time = 1000 / FRAMES / tact;

    //тактовая отрисовка
    function reDraw() {
      this_fr.x += dX;
      this_fr.y += dY;

      if (currentTact < tact - 1) {
        setTimeout(reDraw, frame_time);
        currentTact++;
      } else {
        this_fr.x = newX;
        this_fr.y = newY;
        if (connectingFragment != null) {
          if (this_fr.group == null) // для работы один раз, чтобы не выполнялось для каждого элемента в группе
            this_fr.workGroups(this_fr, connectingFragment); // для группы отдельно обрабатывается в группе
          near.isConnecting = false; // !!
        }
        this_frg.smoothing = false;
      }
    }
    reDraw();
  }
}
