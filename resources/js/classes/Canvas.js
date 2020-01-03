 // init in script.js

 import Field from "./Field";
 import Menu from "./Menu";
 import Panel from "./Panel"

 export default class Canvas {
   constructor(id, objects) {
     console.log("Canvas created");
     this.canvas = document.getElementById(id);
     this.context = this.canvas.getContext('2d');

     this.panel = null;
     this.left_menu = null;
     this.right_menu = null;
     this.field = null;

     this.fr_zones = [];
     this.fr_zones.length = 4;

     this.blank_zones = [];

     this.globalVariables = objects.globalVariables;
     this.globalConstants = objects.globalConstants;
   }

   initElements() {
     this.field = new Field();
     this.panel = new Panel(this.globalConstants.countImages, this, this.globalVariables, this.globalConstants);
     this.left_menu = new Menu(-1, this);
     this.right_menu = new Menu(1, this);

     this.fr_zones[0] = this.left_menu;
     this.fr_zones[1] = this.right_menu;
     this.fr_zones[2] = this.field;
     this.fr_zones[3] = this.panel;
   }

   sortZonesByFirstX() {
     this.fr_zones.sort((a, b) => (a.firstX > b.firstX) ? 1 : ((b.firstX > a.firstX) ? -1 : 0));
   }

   getBlankZones(start, top, bottom, type = null) {

     // переписать потом на бинарный поиск
     var ind = -1;
     var last = -1;
     for (var i = 0; i < this.fr_zones.length; i++) {
       if (
         top < this.fr_zones[i].firstY && this.fr_zones[i].firstY < bottom ||
         top < this.fr_zones[i].lastY && this.fr_zones[i].lastY < bottom ||
         this.fr_zones[i].firstY < top && top < this.fr_zones[i].lastY ||
         this.fr_zones[i].firstY < bottom && bottom < this.fr_zones[i].lastY
       ) {
         if (this.fr_zones[i].firstX > start) {
           ind = i;
           last = this.fr_zones[ind].firstX;
           break;
         }
       }
     }
     if (ind == -1) { // дойти до края карты, если нет элемента
       last = this.canvas.width;
     }
     if (bottom > top) {
       // создать новый пустой прямоугольник
       this.blank_zones.push(new BlankField(
         start - 1, top - 1,
         last - start + 2, bottom - top + 2));
     }

     if (ind != -1) { // продолжить, если ещё есть элемент справа
       this.getBlankZones(this.fr_zones[ind].firstX + 1, top, this.fr_zones[ind].firstY - 1); // верх
       this.getBlankZones(this.fr_zones[ind].lastX + 1, this.fr_zones[ind].firstY, this.fr_zones[ind].lastY); // бок
       this.getBlankZones(this.fr_zones[ind].firstX + 1, this.fr_zones[ind].lastY + 1, bottom - 1); // низ
     }
   }

   createBlankZones() {
     this.sortZonesByFirstX();
     this.getBlankZones(0, 0, this.canvas.height, true);
   }


   getCoords(x, y) {
     var bbox = this.canvas.getBoundingClientRect();
     return {
       x: (x - bbox.left) * (this.canvas.width / bbox.width),
       y: (y - bbox.top) * (this.canvas.height / bbox.height)
     };
   }

   isInZones(x, y) {
     var zones = this.fr_zones;
     for (var i = 0; i < zones.length; i++) {
       if (zones[i].isHadPoint(x, y)) {
         return true;
       }
     }
     return false;
   }

   onMenuZone() {
     if (this.left_menu.isPlace || this.right_menu.isPlace) {
       Menu.includeInMenu();
     } else {
       Menu.removeFromMenu();
     }
   }

   draw(context) {
     var zones = this.fr_zones;
     for (var i = 0; i < zones.length; i++) {
       zones[i].draw(context)
       if (zones[i] instanceof Menu) {

       }
     }

   }

   drawBlank(context) {
     var zones = this.blank_zones;
     for (var i = 0; i < zones.length; i++) {
       zones[i].draw(context)
     }
   }
 }
