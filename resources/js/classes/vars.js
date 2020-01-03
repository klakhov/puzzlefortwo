const FRAMES = 60;
const imagesX = 4;
const imagesY = 4;
const countImages = imagesX * imagesY;

const FIELD_WIDTH = 3 / 5; // Размеры поля
const FIELD_HEIGHT = 9 / 11; // Местоположение поля в Field.js -> (27, 28) строки

const KEY_showSilhouette = 83; // S
const KEY_shouldConnect = 32; // SPACE

const DIRECTORY = "images/";



// Вспомогательный объект, который необходим при удержании изображения мышью
// Способен определить индекс изображения в массиве, а так же запомнить
// Разницу между координатами курсора мыши и началом изображения в левом верхнем
// углу из метода "rangeToStartImage(x, y)" класса "Fragment"
let SelectFragmentHelper = {
  translatedFragmentId: -1,
  deltaX: 0,
  deltaY: 0
};

// Массив для изображений
const arr = [];

var shouldConnect = false;
var showSilhouette = false;

var canvas = undefined; // init in script.js
