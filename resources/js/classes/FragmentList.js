import Fragment from "./Fragment";

export default class FragmentList {
    constructor(value, prev, objects) {
        this.value = value;
        this.prev = null;
        if (this.value instanceof Fragment)
            this.src = value.src;
        if (prev != null) {
            this.prev = prev;
            this.prev.next = this;
        }
        this.next = null;

        this.value.listElem = this;
        this.objects = objects;
    }

    remove() {
        let objects = this.objects;
        if (this.prev != null) {
            if (this.next != null) {
                // середина
                this.prev.next = this.next;
                this.next.prev = this.prev;
            } else if (this.next == null) {
                // конец
                objects.ListObjectHelper.lastVisualObject = this.prev;
                this.prev.next = null;
            }
        } else {
            // начало
            objects.ListObjectHelper.firstVisualObject = this.next;
            this.next.prev = null;
        }
    }

    replaceToTop() {
        let objects = this.objects;
        this.remove();
        if (objects.ListObjectHelper.lastVisualObject !== this) {
            objects.ListObjectHelper.lastVisualObject.next = this;
            this.prev = objects.ListObjectHelper.lastVisualObject;
            this.next = null;
            objects.ListObjectHelper.lastVisualObject = this;
        }

        var lastSeenObject = objects.ListObjectHelper.lastVisualObject;
        do {
            lastSeenObject = lastSeenObject.prev;
        } while (lastSeenObject != null)

    }
}
