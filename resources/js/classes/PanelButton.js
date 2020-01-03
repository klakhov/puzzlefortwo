export default class PanelButton {
  constructor(inc, pos, globalVariables) {
      this.inc = inc;
      this.getPos = pos; // функция для получения, т.к. соответствующие переменные объявлены позже
      this.globalVariables = globalVariables;
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
    let canvas = this.globalVariables.canvas;
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
      this.globalVariables.canvas.panel.list += this.inc;
    if (this.globalVariables.canvas.panel.list === 0) this.globalVariables.canvas.panel.list = 1;
    if (this.globalVariables.canvas.panel.list === this.globalVariables.canvas.panel.lists + 1)
        this.globalVariables.canvas.panel.list = this.globalVariables.canvas.panel.lists;
  }
}
