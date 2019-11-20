import Fragment from "./Fragment";
export default class FragmentList {
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
        ListObjectHelper.lastVisualObject = this.prev;
        this.prev.next = null;
      }
    } else {
      // начало
      ListObjectHelper.firstVisualObject = this.next;
      this.next.prev = null;
    }
  }

  replaceToTop() {
    this.remove();
    if (ListObjectHelper.lastVisualObject !== this) {
      ListObjectHelper.lastVisualObject.next = this;
      this.prev = ListObjectHelper.lastVisualObject;
      this.next = null;
      ListObjectHelper.lastVisualObject = this;
    }

    var lastSeenObject = ListObjectHelper.lastVisualObject;
    do {
      lastSeenObject = lastSeenObject.prev;
    } while (lastSeenObject != null)

  }
}
