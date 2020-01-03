class BlankField extends Component{

  static fillColor = "rgba(152,152,192)";

  constructor(x, y, width, height) {
    super();
    this.firstX = x;
    this.firstY = y;
    this.width = width;
    this.height = height;
    this.borderColor = "rgba(152,152,192)";
  }

  draw(context) {
    super.draw(context);
    context.fillStyle = BlankField.fillColor;
    context.fill();
  }
}
