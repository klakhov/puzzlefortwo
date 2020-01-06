class FragmentList {
  static lastVisualObject = null;
  static firstVisualObject = null;

  constructor(value, prev) {
    this.value = value;
    this.prev = null;
    if(this.value instanceof Fragment)
      this.src = value.src;
    if (prev != null) {
      this.prev = prev;
      this.prev.next = this;
    }
    this.next = null;

    this.value.listElem = this;
  }

  remove() {
    if (this.prev != null) {
      if (this.next != null) {
        // середина
        this.prev.next = this.next;
        this.next.prev = this.prev;
      } else if(this.next == null){
        // конец
        if(this.prev != null) {
          FragmentList.lastVisualObject = this.prev;
          this.prev.next = null;
        }
      }
    } else {
      // начало
      if(this.next != null) {
        FragmentList.firstVisualObject = this.next;
        this.next.prev = null;
      }
    }
  }

  replaceToTop() {
    if(FragmentList.lastVisualObject === this) {
      return;
    }

    this.remove();
    if (FragmentList.lastVisualObject !== this) {
      FragmentList.lastVisualObject.next = this;
      this.prev = FragmentList.lastVisualObject;
      this.next = null;
      FragmentList.lastVisualObject = this;
    }

    var lastSeenObject = FragmentList.lastVisualObject;
    do {
      lastSeenObject = lastSeenObject.prev;
    } while (lastSeenObject != null)

  }
}
