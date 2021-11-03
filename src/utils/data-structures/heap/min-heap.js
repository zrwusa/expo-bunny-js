import {Heap, HeapNode} from './heap';

export class MinHeap extends Heap {
    constructor(nodes) {
        super(nodes);
    }

    compare(parentIndex, childIndex) {
        const parentNode = this._nodes[parentIndex];
        const childNode = this._nodes[childIndex];
        if (parentNode instanceof HeapNode && childNode instanceof HeapNode) {
            return parentNode.id < childNode.id;
        } else {
            return parentNode < childNode;
        }
    }

    clone() {
        return new MinHeap(this._nodes);
    }

    static heapify(nodes) {
        const minHeap = new MinHeap(nodes);
        minHeap._fix();
        return minHeap;
    }
}
