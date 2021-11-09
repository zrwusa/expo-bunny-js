import { Queue } from './queue';
// TODO not perfect
export class Deque extends Queue {
    add(element) {
        this.enqueue(element);
        return this;
    }
    addFirst(element) {
        this.enqueue(element);
        return this;
    }
    addLast(element) {
        this._elements.unshift(element);
    }
    contains(element) {
        return this._elements.indexOf(element) > -1;
    }
    element() {
        return null;
    }
    getFirst() {
        return this.peekFirst();
    }
    getLast() {
        return this.peekLast();
    }
    offer(element) {
        return this.addFirst(element);
    }
    offerFirst(element) {
        return this.addFirst(element);
    }
    offerLast(element) {
        return this.addLast(element);
    }
    peekFirst() {
        return super.front();
    }
    peekLast() {
        return super.back();
    }
    poll() {
        return super.dequeue();
    }
    pollFirst() {
        return this.poll();
    }
    pollLast() {
        if (this.size() === 0)
            return null;
        const last = this.back();
        this._offset = this._elements.length - 1;
        // only remove dequeued elements when reaching half size
        // to decrease latency of shifting elements.
        this._elements = this._elements.slice(0, this._offset);
        this._offset = 0;
        return last;
    }
    pop() {
        return this.dequeue();
    }
    push(element) {
        return this._elements.unshift(element);
    }
    removeFirst() {
        this.poll();
    }
    removeLast() {
        this.pollLast();
    }
}
