const FRAMES = 45;
const imagesX = 4;
const imagesY = 4;
const countImages = imagesX*imagesY;

const DIRECTORY = "../../patterns/puzzle/puzzle_game-room/images/"

var downloadedImages = 0;



// Вспомогательный объект, который необходим при удержании изображения мышью
// Способен определить индекс изображения в массиве, а так же запомнить
// Разницу между координатами курсора мыши и началом изображения в левом верхнем
// углу из метода "rangeToStartImage(x, y)" класса "Fragment"
var SelectFragmentHelper = {
  translatedFragmentId: -1,
  deltaX: 0,
  deltaY: 0
};

var FragmentsGeneralCharacteristic = {
  SCALE: -1,
  downloadedImages: 0,
  width: -1,
  height: -1,
  widthScale: -1,
  heightScale: -1,
  third_x: -1,
  third_y: -1,
  connectRange: -1
}

var CanvasCharacteristic = {
  width: -1,
  height: -1,
  lastX: -1,
  lastY: -1,
  firstX: -1,
  firstY: -1,
}
