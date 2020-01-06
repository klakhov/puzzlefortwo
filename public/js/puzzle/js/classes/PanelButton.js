class PanelButton {
  constructor(inc, pos) {
    this.inc = inc;
    this.getPos = pos // функция для получения, т.к. соответствующие переменные объявлены позже
  }

  isHadPoint(x, y) {
    return (
      x >= this.getPos() &&
      x <= this.getPos() + canvas.panel.buttonWidth &&
      y >= canvas.panel.firstY &&
      y <= canvas.panel.firstY + canvas.panel.height
    )
  }

  draw(context) {
    context.beginPath();
    context.rect(
      this.getPos(),
      canvas.panel.firstY,
      canvas.panel.buttonWidth,
      canvas.panel.height
    );
    context.strokeStyle = "blue";
    context.stroke();
  }

  // onclick
  // увеличивает номер страницы на заданный инкремент (увеличивает или уменьшает на 1, разное для левой и правой кнопок)
  func() {
    canvas.panel.list += this.inc
    if (canvas.panel.list == 0) canvas.panel.list = 1;
    if (canvas.panel.list == canvas.panel.lists + 1) canvas.panel.list = canvas.panel.lists;
  }
}
