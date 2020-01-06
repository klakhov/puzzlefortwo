class Field extends Component {
  constructor() {
    super();
    this.borderColor = "steelblue";

    this.all_width = null; // tmp-размеры для вмещения туда поля
    this.all_height = null;

    this.width = null; // истинные размеры поля
    this.height = null;

    this.firstX = null; // крайние левые/правые координаты поля
    this.lastX = null;

    this.firstY = null; // крайние верхние/нижние координаты поля
    this.lastY = null;
    this.linesX = [];
    this.linesY = [];
    this.linesColor = "rgba(155,155,155, 0.7)";

  }

  init() {
    this.width = Fragment.widthScale / 5 * 3 * imagesX;
    this.height = Fragment.heightScale / 5 * 3 * imagesY;

    this.firstX = canvas.canvas.width / 2 - this.width / 2; // ИЗМЕНИТЬ ДЛЯ МЕСТОПОЛОЖЕНИЯ ОКНА СБОРКИ
    this.firstY = 40; // ИЗМЕНИТЬ ДЛЯ МЕСТОПОЛОЖЕНИЯ ОКНА СБОРКИ

    this.lastX = this.firstX + this.width;
    this.lastY = this.firstY + this.height;
    for (var i = 1; i < imagesY; i++) {
      this.linesX.push(this.width / imagesX * i);
    }
    for (var i = 1; i < imagesY; i++) {
      this.linesY.push(this.height / imagesY * i);
    }
  }

  draw(context) {
    super.draw(context);

    context.strokeStyle = this.linesColor;
    context.beginPath();
    for (var i = 0; i < this.linesX.length; i++) {
      context.moveTo(this.firstX + this.linesX[i], this.firstY);
      context.lineTo(this.firstX + this.linesX[i], this.firstY + this.height);
    }

    for (var i = 0; i < this.linesY.length; i++) {
      context.moveTo(this.firstX, this.firstY + this.linesY[i]);
      context.lineTo(this.firstX + this.width, this.firstY + this.linesY[i]);
    }
    context.stroke();

  }
}
