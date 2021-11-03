import { Heap, HeapNode } from './heap';
export class MaxHeap extends Heap {
    constructor(nodes) {
        super(nodes);
    }
    compare(parentIndex, childIndex) {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (parentNode instanceof HeapNode && childNode instanceof HeapNode) {
            return parentNode.id > childNode.id;
        }
        else {
            return parentNode > childNode;
        }
    }
    clone() {
        return new MaxHeap(this._nodes);
    }
    static heapify(nodes) {
        const maxHeap = new MaxHeap(nodes);
        maxHeap._fix();
        return maxHeap;
    }
}
