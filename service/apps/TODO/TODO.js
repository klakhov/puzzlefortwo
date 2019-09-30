function TODO() {
  elems_todo.forEach(function(item, i, arr) {
    let items = $(item);
    console.log("size", items.length);
    for (var i = 0; i < items.length; i++) {
      var elem = $(items[i]);
      console.log(elem);
      elem.css("position", "relative");
      var h = elem.css("height");
      console.log(h);
      elem.css("overflow-y", "hidden");
      if (elem.find(".locked").length == 0) {
        elem.html(
          // class 'locked' in ../pages/puzzle/puzzle.css
          elem.html() + "<div class=\"locked\" style=\"height: " + h + "\">В разработке</div>"
        );
      }
    }
  });
}
