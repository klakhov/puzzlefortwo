// init in Fragment.js


class Panel extends Component {
  constructor(imagesCount, cnv) {
    super();
    this.borderColor = "blue";

    this.width = 900;
    this.height = 100;

    this.firstX = 200;
    this.lastX = 900;

    this.firstY = null;
    this.lastY = null;

    this.paddingX = 0;
    this.paddingY = 0;
    this.mainWidth = null; // длина без учета кнопок
    this.fragmentsCount = null; // фрагментов в 1 листе
    this.fragmentSpace = null; // расстояние между фрагментами
    this.lists = null; // количество листов
    this.list = 1; // текущий лист
    this.buttonWidth = 80;
    this.marginTop = 30;

    this.place = new PanelPlace();
    this.place.height = this.height;

    var th = this;
    this.leftButton = new PanelButton(-1, function() {
      return th.firstX
    });
    this.rightButton = new PanelButton(1, function() {
      return th.lastX - th.buttonWidth
    });

    this.buttons = [this.leftButton, this.rightButton]
    this.fragments = []; // id нужных фрагментов, может быть заданно в случайном порядке (теоретически)
    this.fragments.length = imagesCount;

    cnv.panel = this;
  }

  init() {
    this.width = canvas.field.width * 1.6; // ШИРИНА ПАНЕЛИ
    this.place.width = this.width;

    this.firstX = canvas.canvas.width / 2 - this.width / 2; // МЕСТОПОЛОЖЕНИЕ ПАНЕЛИ
    this.place.firstX = this.firstX;

    this.firstY = canvas.field.lastY + this.marginTop; // МЕСТОПОЛОЖЕНИЕ ПАНЕЛИ
    this.place.firstY = this.firstY;

    this.lastX = this.firstX + this.width;
    this.lastY = this.firstY + this.height;
    this.mainWidth = this.width - 2 * this.buttonWidth - 2 * this.paddingX;

    Fragment.heightPanel = this.height - 2 * this.paddingY;
    Fragment.widthPanel = Fragment.heightPanel / Fragment.height * Fragment.width;

    Fragment.third_xPanel = Fragment.widthPanel / 5;
    Fragment.third_yPanel = Fragment.heightPanel / 5;
    this.fragmentsCount = Math.floor(this.mainWidth / Fragment.widthPanel);
    this.fragmentSpace = (this.mainWidth - this.fragmentsCount * Fragment.widthPanel) / (this.fragmentsCount - 1);

    this.lists = Math.floor(countImages / this.fragmentsCount) + 1;
  }

  onmousedown(loc) {
    for (var i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].isHadPoint(loc.x, loc.y)) {
        console.log("Button pressed");
        this.buttons[i].func();
        return true;
      }
    }
    return false;
  }

  onmousemove(x, y) {
    // if (!this.place.isHadPoint(x, y)) {
    //   this.height = this.place.height / 2;
    // } else {
    //   this.height = this.place.height;
    // }
  }

  draw(context) {
    super.draw(context);
    // this.place.draw(context);
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw(context);
    }
  }

  drawFragments(context) {
    var start = this.fragmentsCount * (this.list - 1);
    var end = this.fragmentsCount * this.list;
    if (this.list == this.lists) {
      end = start + this.fragments.length % this.fragmentsCount;
    }
    for (var i = start; i < end; i++) {
      var fr = arr[this.fragments[i]];
      context.drawImage(
        fr.img,
        this.firstX + this.buttonWidth + this.paddingX + (this.fragmentSpace + Fragment.widthPanel) * (
          i % this.fragmentsCount),
        this.firstY + this.paddingY,
        Fragment.widthPanel,
        Fragment.heightPanel
      );

      if (!fr.onBottomPanel) {
        // изобразить маску, если объект не на панели
        context.beginPath();
        context.fillStyle = "rgba(255,255,255,0.5)";
        context.rect(
          this.firstX + this.buttonWidth + this.paddingX + (this.fragmentSpace + Fragment.widthPanel) * (
            i % this.fragmentsCount),
          this.firstY + this.paddingY,
          Fragment.widthPanel,
          Fragment.heightPanel
        );
        context.fill();
      }
    }
  }
}
