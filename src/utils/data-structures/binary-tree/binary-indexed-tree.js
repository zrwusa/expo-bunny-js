export class BinaryIndexedTree {
    constructor(n) {
        this._sumTree = new Array(n + 1).fill(0);
    }
    update(i, delta) {
        while (i < this._sumTree.length) {
            this._sumTree[i] += delta;
            i += BinaryIndexedTree.lowBit(i);
        }
    }
    getPrefixSum(i) {
        let sum = 0;
        while (i > 0) {
            sum += this._sumTree[i];
            i -= BinaryIndexedTree.lowBit(i);
        }
        return sum;
    }
    getRangeSum(start, end) {
        if (!(0 <= start && start <= end && end <= this._sumTree.length))
            throw 'Index out of bounds';
        return this.getPrefixSum(end) - this.getPrefixSum(start);
    }
    static lowBit(x) {
        return x & (-x);
    }
}
