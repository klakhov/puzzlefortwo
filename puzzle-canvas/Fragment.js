var hello = 4;
class Fragment {
  constructor(src, x, y, scale, left, top) {
    this.src = src;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.img = new Image();
    this.img.src = this.src;
    this.third = SCALE / 5;

    this.left = left;
    this.top = top;
    this.right = null;
    this.bottom = null;
    if (this.left != null)
      this.left.right = this;
    if (this.top != null)
      this.top.bottom = this;
      //     arr.push(new Fragment(DIRECTORY + (i + 1) + '.png', 0, 0, 1, (leftId >= 0 ? arr[leftId] : null),
      //    (topId >= 0 ? arr[topId] : null)));

  }

  // Отображает изображение в заданных координатах
  draw() {
    context.drawImage(this.img,
      this.x,
      this.y,
      //this.img.width*this.scale,
      //this.img.height*this.scale,
      SCALE,
      SCALE
    )
  }

  // Проверяет, есть ли в границах изображения заданная точка или нет
  // Нужно для проверки наведения курсора мыши на изображение
  isHadPoint(x, y) {
    //        return (x >= this.x &&
    //                x <= this.x + this.img.width*this.scale &&
    //                y >= this.y &&
    //                y <= this.y + this.img.height*this.scale)
    //console.log(getColor(x,y));
    return (
      x >= this.x + this.third &&
      x <= (this.x + SCALE - this.third) &&
      y >= (this.y + this.third) &&
      y <= (this.y + SCALE - this.third)

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

  canConnectRightFragment() {
    if (this.rangeFromRightTop(this.right.x, this.right.y) <= this.third)
      return true;
    return false;
  }

  rangeFromRightTop(x, y) {
    var rT = this.rightTop()
    return Math.sqrt((rT.y - (y + this.third)) * (rT.y - (y + this.third)) +
      (rT.x - (x + this.third)) * (rT.x - (x + this.third)))
  }

  rightTop() {
    return {
      x: this.x + SCALE - this.third,
      y: this.y + this.third
    }
  }
  canConnectLeftFragment(){
    if(this.rangeFromLeftTop(this.left.x, this.left.y) <= this.third){
      return true;
    }
    return false;
  }

  rangeFromLeftTop(x,y){
    var lT = this.leftTop();
    return Math.sqrt((lT.y - (y + this.third))*(lT.y - (y + this.third)) +
      (lT.x - (x + SCALE - this.third))*(lT.x - (x + SCALE - this.third)) )
  }

  leftTop(){
    return {
      x: this.x + this.third,
      y: this.y + this.third
    }
  }
  canConnectBottomFragment(){
    if(this.rangeFromTopBottom(this.bottom.x, this.bottom.y) <= this.third){
      return true
    }
    return false;
  }
  rangeFromTopBottom(x,y){
    var lB = this.leftBot();
    return Math.sqrt((lB.y - (y + this.third))*(lB.y - (y + this.third))+
      (lB.x - (x + this.third))*(lB.x - (x + this.third)) )
  }
  leftBot(){
    return{
      x: this.x + this.third,
      y: this.y + SCALE - this.third
    }
  }
  canConnectTopFragment(){
    if(this.rangeFromBottomTop(this.top.x, this.top.y)<=this.third){
      return true
    }
    return false;
  }
  rangeFromBottomTop(x,y){
    var lT = this.leftTop();
    return Math.sqrt((lT.y - (y + SCALE - this.third))*(lT.y - (y + SCALE - this.third))+
      (lT.x - (x+ this.third))*(lT.x - (x+ this.third)))
  }

  // Изменяет местоположение изображения
  move(x, y) {
    this.x = x;
    this.y = y;
    //console.log("Now is", this.x, this.y);
  }
}
