export class HeapNode {
    constructor(id, val) {
        if (val === undefined) {
            val = null;
        }
        this._id = id;
        this._val = val || null;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
    get val() {
        return this._val;
    }
    set val(v) {
        this._val = v;
    }
}
export class Heap {
    constructor(nodes) {
        // TODO support distinct
        this._nodes = Array.isArray(nodes) ? [...nodes] : [];
        this._fix();
    }
    _swap(i, j) {
        const temp = this._nodes[i];
        this._nodes[i] = this._nodes[j];
        this._nodes[j] = temp;
        // ES6 swap
        // [this._nodes[i], this._nodes[j]] = [this._nodes[j], this._nodes[i]];
    }
    _shouldSwap(parentIndex, childIndex) {
        if (parentIndex < 0 || parentIndex >= (this.size() - 1))
            return false;
        if (childIndex < 1 || childIndex > (this.size() - 1))
            return false;
        return !this.compare(parentIndex, childIndex);
    }
    _parentIndex(childIndex) {
        const parentIndex = Math.floor((childIndex - 1) / 2);
        if (parentIndex < 0 || parentIndex >= (this.size() - 1))
            return -1;
        return parentIndex;
    }
    _hasParent(childIndex) {
        return this._parentIndex(childIndex) > -1;
    }
    _leftChildIndex(parentIndex) {
        const leftChildIndex = parentIndex * 2 + 1;
        if (leftChildIndex < 1 || leftChildIndex > (this.size() - 1)) {
            return -1;
        }
        else {
            return leftChildIndex;
        }
    }
    _rightChildIndex(parentIndex) {
        const rightChildIndex = parentIndex * 2 + 2;
        if (rightChildIndex < 1 || rightChildIndex > (this.size() - 1)) {
            return -1;
        }
        else {
            return rightChildIndex;
        }
    }
    _hasLeftChild(parentIndex) {
        return this._leftChildIndex(parentIndex) !== -1;
    }
    _hasRightChild(parentIndex) {
        return this._rightChildIndex(parentIndex) !== -1;
    }
    _compareChildren(parentIndex) {
        if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex))
            return -1;
        const leftChildIndex = this._leftChildIndex(parentIndex), rightChildIndex = this._rightChildIndex(parentIndex);
        if (!this._hasLeftChild(parentIndex))
            return rightChildIndex;
        if (!this._hasRightChild(parentIndex))
            return leftChildIndex;
        return this.compare(leftChildIndex, rightChildIndex) ? leftChildIndex : rightChildIndex;
    }
    _fix() {
        for (let i = Math.floor(this.size() / 2); i > -1; i--) {
            this.heapifyDown(i);
        }
    }
    heapifyUp(startingIndex) {
        let childIndex = startingIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
        return childIndex;
    }
    heapifyDown(startingIndex) {
        let parentIndex = startingIndex;
        let childIndex = this._compareChildren(parentIndex);
        while (this._shouldSwap(parentIndex, childIndex)) {
            this._swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this._compareChildren(parentIndex);
        }
        return parentIndex;
    }
    poll() {
        let res;
        if (this.size() > 1) {
            this._swap(0, this._nodes.length - 1);
            res = this._nodes.pop();
            this.heapifyDown(0);
        }
        else {
            if (this.size() === 1) {
                res = this._nodes.pop();
            }
            else {
                res = null;
            }
        }
        return res;
    }
    insert(node, priority) {
        // TODO may bugs exist for priorities
        if (priority !== undefined) {
            if (node instanceof HeapNode) {
                node.id = priority;
            }
        }
        this._nodes.push(node);
        this.heapifyUp(this._nodes.length - 1);
    }
    isValidNode(index) {
        return this._nodes[index] !== undefined;
    }
    isValid() {
        const isValidRecursive = (parentIndex) => {
            let isValidLeft = true;
            let isValidRight = true;
            if (this._hasLeftChild(parentIndex)) {
                const leftChildIndex = (parentIndex * 2) + 1;
                if (!this.compare(parentIndex, leftChildIndex))
                    return false;
                isValidLeft = isValidRecursive(leftChildIndex);
            }
            if (this._hasRightChild(parentIndex)) {
                const rightChildIndex = (parentIndex * 2) + 2;
                if (!this.compare(parentIndex, rightChildIndex))
                    return false;
                isValidRight = isValidRecursive(rightChildIndex);
            }
            return isValidLeft && isValidRight;
        };
        return isValidRecursive(0);
    }
    toArray() {
        return this._nodes;
    }
    peek() {
        return this.isValidNode(0) ? this._nodes[0] : null;
    }
    leaf() {
        return this.isValidNode(this.size() - 1) ? this._nodes[this.size() - 1] : null;
    }
    size() {
        return this._nodes.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    sort(nodeOrPropertyName) {
        const visitedId = [];
        const visitedVal = [];
        const visitedNode = [];
        const visitedNumber = [];
        const pushByValueType = (node) => {
            switch (nodeOrPropertyName) {
                case 'id':
                    if (node instanceof HeapNode) {
                        visitedId.push(node.id);
                    }
                    break;
                case 'val':
                    if (node instanceof HeapNode) {
                        visitedVal.push(node.val);
                    }
                    break;
                case 'node':
                    if (node instanceof HeapNode) {
                        visitedNode.push(node);
                    }
                    break;
                default:
                    if (typeof node === 'number') {
                        visitedNumber.push(node);
                    }
                    break;
            }
        };
        // while (!this.isEmpty()) {
        //     this._swap(0, this.size() - 1);
        //     pushByValueType(this.size() - 1);
        //     this._nodes.pop();
        //     this.heapifyDown(0);
        // }
        while (!this.isEmpty()) {
            const top = this.poll();
            if (top) {
                pushByValueType(top);
            }
        }
        switch (nodeOrPropertyName) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            default:
                return visitedNumber;
        }
    }
    DFS(dfsMode, nodeOrPropertyName) {
        const visitedId = [];
        const visitedVal = [];
        const visitedNode = [];
        const visitedNumber = [];
        const pushByValueType = (index) => {
            const node = this._nodes[index];
            switch (nodeOrPropertyName) {
                case 'id':
                    if (node instanceof HeapNode) {
                        visitedId.push(node.id);
                    }
                    break;
                case 'val':
                    if (node instanceof HeapNode) {
                        visitedVal.push(node.val);
                    }
                    break;
                case 'node':
                    if (node instanceof HeapNode) {
                        visitedNode.push(node);
                    }
                    break;
                default:
                    if (typeof node === 'number') {
                        visitedNumber.push(node);
                    }
                    break;
            }
        };
        const _traverse = (cur) => {
            const leftChildIndex = cur * 2 + 1;
            const rightChildIndex = cur * 2 + 2;
            switch (dfsMode) {
                case 'in':
                    if (this.isValidNode(leftChildIndex))
                        _traverse(leftChildIndex);
                    pushByValueType(cur);
                    if (this.isValidNode(rightChildIndex))
                        _traverse(rightChildIndex);
                    break;
                case 'pre':
                    pushByValueType(cur);
                    if (this.isValidNode(leftChildIndex))
                        _traverse(leftChildIndex);
                    if (this.isValidNode(rightChildIndex))
                        _traverse(rightChildIndex);
                    break;
                case 'post':
                    if (this.isValidNode(leftChildIndex))
                        _traverse(leftChildIndex);
                    if (this.isValidNode(rightChildIndex))
                        _traverse(rightChildIndex);
                    pushByValueType(cur);
                    break;
            }
        };
        this.isValidNode(0) && _traverse(0);
        switch (nodeOrPropertyName) {
            case 'id':
                return visitedId;
            case 'val':
                return visitedVal;
            case 'node':
                return visitedNode;
            default:
                return visitedNumber;
        }
    }
    clear() {
        this._nodes = [];
    }
}
