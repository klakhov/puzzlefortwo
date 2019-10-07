var hello = 4;
class Fragment {
  constructor(src, x, y, id,left, top) {
    this.src = src;
    this.x = x;
    this.y = y;

    this.id = id

    this.img = new Image();
    this.img.src = this.src;
    this.downloadImage();

    FragmentsGeneralCharacteristic.third_x = FragmentsGeneralCharacteristic.SCALE / 5;
    FragmentsGeneralCharacteristic.third_y = FragmentsGeneralCharacteristic.SCALE / 5;
    FragmentsGeneralCharacteristic.connectRange = FragmentsGeneralCharacteristic.third_x * 2; // ВРЕМЕННО

    this.left = left;
    this.top = top;
    this.right = null;
    this.bottom = null;
    if (this.left != null)
      this.left.right = this;
    if (this.top != null)
      this.top.bottom = this;
  }

  downloadImage() {
    this.img.onload = function() {
      FragmentsGeneralCharacteristic.downloadedImages++;
      if (FragmentsGeneralCharacteristic.downloadedImages == countImages) {
        console.log("Downloaded all images");
        FragmentsGeneralCharacteristic.width = this.width;
        FragmentsGeneralCharacteristic.height = this.height;
        FragmentsGeneralCharacteristic.SCALE = (
          Math.min(
            canvas.width / (imagesX / 5 * 3) / FragmentsGeneralCharacteristic.width,
            canvas.height / (imagesY / 5 * 3) / FragmentsGeneralCharacteristic.height
          )
        );
        FragmentsGeneralCharacteristic.widthScale = Math.floor(FragmentsGeneralCharacteristic.SCALE * FragmentsGeneralCharacteristic.width);
        FragmentsGeneralCharacteristic.heightScale = Math.floor(FragmentsGeneralCharacteristic.SCALE * FragmentsGeneralCharacteristic.height);
        FragmentsGeneralCharacteristic.third_x = FragmentsGeneralCharacteristic.widthScale / 5;
        FragmentsGeneralCharacteristic.third_y = FragmentsGeneralCharacteristic.heightScale / 5;
        FragmentsGeneralCharacteristic.connectRange = 3*Math.min(
          FragmentsGeneralCharacteristic.third_x,
          FragmentsGeneralCharacteristic.third_y
        );
        CanvasCharacteristic.width = FragmentsGeneralCharacteristic.widthScale/5*3 * imagesX;
        console.log(CanvasCharacteristic.width);
        CanvasCharacteristic.height = FragmentsGeneralCharacteristic.heightScale/5*3 * imagesY;
        CanvasCharacteristic.firstX = 0;
        CanvasCharacteristic.firstY = 0;
        CanvasCharacteristic.lastX = CanvasCharacteristic.firstX + CanvasCharacteristic.width;
        CanvasCharacteristic.lastY = CanvasCharacteristic.firstY + CanvasCharacteristic.height;
      }
    }
  }


  // Отображает изображение в заданных координатах
  draw() {
    context.drawImage(this.img,
      this.x,
      this.y,
      FragmentsGeneralCharacteristic.widthScale,
      FragmentsGeneralCharacteristic.heightScale
    )
  }

  // Проверяет, есть ли в границах изображения заданная точка или нет
  // Нужно для проверки наведения курсора мыши на изображение
  isHadPoint(x, y) {
    return (
      x >= this.x + FragmentsGeneralCharacteristic.third_x &&
      x <= (this.x + FragmentsGeneralCharacteristic.widthScale - FragmentsGeneralCharacteristic.third_x) &&
      y >= (this.y + FragmentsGeneralCharacteristic.third_y) &&
      y <= (this.y + FragmentsGeneralCharacteristic.heightScale - FragmentsGeneralCharacteristic.third_y)

    )
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

  rightTop() {
    return {
      x: this.x + FragmentsGeneralCharacteristic.widthScale - FragmentsGeneralCharacteristic.third_x,
      y: this.y + FragmentsGeneralCharacteristic.third_y
    }
  }

  leftTop() {
    // console.log(this.x, this.y);
    return {
      x: this.x + FragmentsGeneralCharacteristic.third_x,
      y: this.y + FragmentsGeneralCharacteristic.third_y
    }
  }

  rightBot() {
    return {
      x: this.x + FragmentsGeneralCharacteristic.widthScale - FragmentsGeneralCharacteristic.third_x,
      y: this.y + FragmentsGeneralCharacteristic.heightScale - FragmentsGeneralCharacteristic.third_y
    }
  }

  leftBot() {
    return {
      x: this.x + FragmentsGeneralCharacteristic.third_x,
      y: this.y + FragmentsGeneralCharacteristic.heightScale - FragmentsGeneralCharacteristic.third_y
    }
  }
  canConnectRightFragment() {
    var leftTopOfRightFragment = this.right.leftTop();
    // console.log("Pre answer", this.rightTop(), leftTopOfRightFragment);
    // console.log("Answer", this.rangeFromRightTop(leftTopOfRightFragment.x, leftTopOfRightFragment.y));
    return (this.rangeFromRightTop(leftTopOfRightFragment.x, leftTopOfRightFragment.y) <= FragmentsGeneralCharacteristic.connectRange)
  }

  rangeFromRightTop(x, y) {
    var rT = this.rightTop()
    return Math.sqrt((rT.y - y) * (rT.y - y) +
      (rT.x - x) * (rT.x - x))
  }

  canConnectLeftFragment() {
    var rightTopOfLeftFragment = this.left.rightTop();
    return (this.rangeFromLeftTop(rightTopOfLeftFragment.x, rightTopOfLeftFragment.y) <= FragmentsGeneralCharacteristic.connectRange)
  }

  rangeFromLeftTop(x, y) {
    var lT = this.leftTop();
    return Math.sqrt((lT.y - y) * (lT.y - y) +
      (lT.x - x) * (lT.x - x))
  }

  canConnectBottomFragment() {
    var leftTopOfBottomFragment = this.bottom.leftTop();
    return (this.rangeFromLeftBottom(leftTopOfBottomFragment.x, leftTopOfBottomFragment.y) <= FragmentsGeneralCharacteristic.connectRange)
  }

  rangeFromLeftBottom(x, y) {
    var lB = this.leftBot();
    return Math.sqrt((lB.y - y) * (lB.y - y) +
      (lB.x - x) * (lB.x - x))
  }

  canConnectTopFragment() {
    var leftBotOfTopFragment = this.top.leftBot();
    return (this.rangeFromLeftTop(leftBotOfTopFragment.x, leftBotOfTopFragment.y) <= FragmentsGeneralCharacteristic.connectRange)
  }

  rangeFromRightBottom(x, y) {
    var rB = this.rightBot();
    return Math.sqrt((rB.y - y) * (rB.y - y) +
      (rB.x - x) * (rB.x - x))
  }

  // Изменяет местоположение изображения
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  smoothMove(newX, newY) {
    let oldX = this.x;
    let oldY = this.y;
    let tact = 21;
    let currentTact = 0;
    let dX = (newX - oldX) / (tact);
    let dY = (newY - oldY) / (tact);
    let fragment = this;
    //тактовая отрисовка
    function reDraw() {
      fragment.x += dX;
      fragment.y += dY;
      if (currentTact < tact) {
        setTimeout(reDraw, 1000 / FRAMES / tact); //ИЗМЕНЕНО
        currentTact++;
      } else {
        fragment.x = newX;
        fragment.y = newY;
      }
    }
    reDraw();
  }
}
