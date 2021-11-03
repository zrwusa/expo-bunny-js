export class SegmentTreeNode {
    constructor(start, end, sum, val) {
        this._start = 0;
        this._end = 0;
        this._val = null;
        this._sum = 0;
        this._left = null;
        this._right = null;
        this._start = start;
        this._end = end;
        this._sum = sum;
        this._val = val || null;
    }

    get start() {
        return this._start;
    }

    set start(v) {
        this._start = v;
    }

    get end() {
        return this._end;
    }

    set end(v) {
        this._end = v;
    }

    get val() {
        return this._val;
    }

    set val(v) {
        this._val = v;
    }

    get sum() {
        return this._sum;
    }

    set sum(v) {
        this._sum = v;
    }

    get left() {
        return this._left;
    }

    set left(v) {
        this._left = v;
    }

    get right() {
        return this._right;
    }

    set right(v) {
        this._right = v;
    }
}

export class SegmentTree {
    constructor(values, start, end) {
        this._values = [];
        this._start = 0;
        start = start || 0;
        end = end || values.length - 1;
        this._values = values;
        this._start = start;
        this._end = end;
        this._root = this.build(start, end);
    }

    get root() {
        return this._root;
    }

    build(start, end) {
        if (start === end) {
            return new SegmentTreeNode(start, end, this._values[start]);
        }
        const mid = start + Math.floor((end - start) / 2);
        const left = this.build(start, mid);
        const right = this.build(mid + 1, end);
        const cur = new SegmentTreeNode(start, end, left.sum + right.sum);
        cur.left = left;
        cur.right = right;
        return cur;
    }

    updateNode(index, sum, val) {
        const root = this._root || null;
        if (!root) {
            return;
        }
        const dfs = (cur, index, sum, val) => {
            if (cur.start === cur.end && cur.start === index) {
                cur.sum = sum;
                // cur.val = val;
                return;
            }
            const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
            if (index <= mid) {
                dfs(cur.left, index, sum, val);
            } else {
                dfs(cur.right, index, sum, val);
            }
            cur.sum = cur.left.sum + cur.right.sum;
        };
        dfs(root, index, sum);
    }

    querySumByRange(indexA, indexB) {
        const root = this._root || null;
        if (!root) {
            return 0;
        }
        const dfs = (cur, i, j) => {
            if (cur.start === i && cur.end === j) {
                return cur.sum;
            }
            const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
            if (j <= mid) {
                return dfs(cur.left, i, j);
            } else if (i > mid) {
                return dfs(cur.right, i, j);
            } else {
                return dfs(cur.left, i, mid) + dfs(cur.right, mid + 1, j);
            }
        };
        return dfs(root, indexA, indexB);
    }
}
