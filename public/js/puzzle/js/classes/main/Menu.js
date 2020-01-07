// init in Fragment.js
class Menu extends Component {
  constructor(type, cnv) {
    super();
    this.borderColor = "red";
    // при создании ставятся значения по умолчанию. Следует создать пост-конструктор

    // type = 1 или type = -1 для левого/правого меню
    this.type = type;
    this.place = new MenuPlace();
    this.width = 400;
    this.placeCoef = 1.18;


  }

  init() {
    this.center = canvas.canvas.width / 2;
    this.height = canvas.field.height * .85;
    this.firstY = canvas.field.firstY + canvas.field.height * .1;
    this.lastY = canvas.field.firstY + canvas.field.height * .95;

    this.place.width = this.width * this.placeCoef;
    if (this.type == 1) {
      this.firstX = this.center + (canvas.field.width / 2) + 20;
      this.lastX = this.firstX + this.width;
      this.place.firstX = this.firstX - (this.placeCoef - 1) * this.width;

    } else if (this.type == -1) {
      this.lastX = this.center - (canvas.field.width / 2) - 20;
      this.firstX = this.lastX - this.width;
      this.place.firstX = this.firstX
    }

    this.isPlace = false;
    this.place.firstY = this.firstY;
    this.place.height = this.height;
  }

  static includeInMenu = function() {
    const selected = ((arr[SelectFragmentHelper.translatedFragmentId].group != null) ?
      arr[SelectFragmentHelper.translatedFragmentId].group :
      arr[SelectFragmentHelper.translatedFragmentId]
    );
    selected.onMenu = true;
  }

  static removeFromMenu = function() {
    const selected = ((arr[SelectFragmentHelper.translatedFragmentId].group != null) ?
      arr[SelectFragmentHelper.translatedFragmentId].group :
      arr[SelectFragmentHelper.translatedFragmentId]
    );
    selected.onMenu = false;
  }


  onmousemove(x, y) {
    if (this.place.isHadPoint(x, y)) {
      this.isPlace = true;
    } else {
      this.isPlace = false;
    }
  }

  draw(context) {
    super.draw(context);
    // this.drawMask(context);
    if (this.isPlace && SelectFragmentHelper.translatedFragmentId >= 0) {
      context.beginPath();
      context.rect(
        this.firstX,
        this.firstY,
        this.width,
        this.height
      );

      context.fillStyle = "rgba(12, 155,155,0.15)";
      context.fill();
    }
  }

  drawMask(context) {
    context.beginPath();
    context.rect(
      this.firstX,
      this.firstY,
      this.width,
      this.height
    );

    context.fillStyle = "white";
    context.fill();
  }
}
