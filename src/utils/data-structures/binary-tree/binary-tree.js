export class AbstractBinaryTree {
    constructor(idOrNode, val, count, allowDuplicate) {
        this._root = null;
        this._size = 0;
        this._allowDuplicate = true;
        this._visitedId = [];
        this._visitedVal = [];
        this._visitedNode = [];
        this._visitedCount = [];
        this._visitedLeftSum = [];
        if (allowDuplicate === undefined) {
            allowDuplicate = false;
        }
        this._allowDuplicate = allowDuplicate;
        if (idOrNode !== undefined) {
            if (typeof idOrNode === 'number') {
                this.root = this.createNode(idOrNode, val, count);
            }
            else {
                this.root = idOrNode;
            }
            this._size = 1;
        }
    }
    get root() {
        return this._root;
    }
    set root(v) {
        if (v) {
            v.parent = null;
            v.familyPosition = 0;
        }
        this._root = v;
    }
    get size() {
        return this.size;
    }
    set size(v) {
        this._size = v;
    }
    get allowDuplicate() {
        return this._allowDuplicate;
    }
    set allowDuplicate(v) {
        this._allowDuplicate = v;
    }
    clear() {
        this.root = null;
        this._size = 0;
    }
    isEmpty() {
        return this._size === 0;
    }
    insert(id, val, count) {
        if (count === undefined) {
            count = 1;
        }
        const _bfs = (root, newNode) => {
            const queue = [root];
            while (queue.length > 0) {
                const cur = queue.shift();
                if (cur) {
                    if (!cur.left) {
                        newNode.parent = cur;
                        newNode.familyPosition = 1;
                        cur.left = newNode;
                        this._size++;
                        return cur.left;
                    }
                    if (!cur.right) {
                        newNode.parent = cur;
                        newNode.familyPosition = 2;
                        cur.right = newNode;
                        this._size++;
                        return cur.right;
                    }
                    cur.left && queue.push(cur.left);
                    cur.right && queue.push(cur.right);
                }
                else {
                    return null;
                }
            }
            return null;
        };
        const inserted = [];
        if (this._allowDuplicate) {
            if (this.root) {
                for (let i = 0; i < count; i++) {
                    inserted.push(_bfs(this.root, new BinaryTreeNode(id, val, 1)));
                }
            }
            else {
                this.root = new BinaryTreeNode(id, val, 1);
                inserted.push(this.root);
                this._size = 1;
                for (let i = 0; i < count - 1; i++) {
                    inserted.push(_bfs(this.root, new BinaryTreeNode(id, val, 1)));
                }
            }
        }
        else {
            const existNode = this.getNode(id);
            if (this.root) {
                if (existNode) {
                    existNode.count += count;
                    inserted.push(existNode);
                }
                else {
                    inserted.push(_bfs(this.root, new BinaryTreeNode(id, val, count)));
                }
            }
            else {
                this.root = new BinaryTreeNode(id, val, count);
                this._size = 1;
                inserted.push(this.root);
            }
        }
        return inserted;
    }
    remove(id) {
        let nodes = [];
        nodes = this.getNodes(id);
        for (let node of nodes) {
            switch (node.familyPosition) {
                case 0:
                    if (node.left) {
                    }
                    else if (node.right) {
                    }
                    break;
                case 1:
                    break;
                case 2:
                    break;
            }
        }
        return [{ deleted: null, needBalanced: null }];
    }
    getDepth(node) {
        let depth = 0;
        while (node.parent !== null) {
            depth++;
            node = node.parent;
        }
        return depth;
    }
    getMinHeight(beginRoot) {
        const _beginRoot = beginRoot || this.root;
        const _getMinHeight = (cur) => {
            if (!cur)
                return 0;
            if (!cur.left && !cur.right)
                return 0;
            const leftMinHeight = _getMinHeight(cur.left);
            const rightMinHeight = _getMinHeight(cur.right);
            return Math.min(leftMinHeight, rightMinHeight) + 1;
        };
        if (_beginRoot) {
            return _getMinHeight(_beginRoot);
        }
        else {
            return -1;
        }
    }
    getHeight(beginRoot) {
        const _beginRoot = beginRoot || this.root;
        const _getMaxHeight = (cur) => {
            if (!cur)
                return 0;
            if (!cur.left && !cur.right)
                return 0;
            const leftHeight = _getMaxHeight(cur.left);
            const rightHeight = _getMaxHeight(cur.right);
            return Math.max(leftHeight, rightHeight) + 1;
        };
        if (_beginRoot) {
            return _getMaxHeight(_beginRoot);
        }
        else {
            return -1;
        }
    }
    isBalanced(beginRoot) {
        return (this.getMinHeight(beginRoot) >= this.getHeight(beginRoot) + 1);
    }
    getNodes(nodeProperty, propertyName, onlyOne) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const result = [];
        function _traverse(cur) {
            switch (propertyName) {
                case 'id':
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne)
                            return;
                    }
                    break;
                case 'count':
                    if (cur.count === nodeProperty) {
                        result.push(cur);
                        if (onlyOne)
                            return;
                    }
                    break;
                case 'val':
                    if (cur.val === nodeProperty) {
                        result.push(cur);
                        if (onlyOne)
                            return;
                    }
                    break;
                case 'allLesserSum':
                    if (cur.allLesserSum === nodeProperty) {
                        result.push(cur);
                        if (onlyOne)
                            return;
                    }
                    break;
                default:
                    if (cur.id === nodeProperty) {
                        result.push(cur);
                        if (onlyOne)
                            return;
                    }
                    break;
            }
            if (!cur.left && !cur.right)
                return null;
            cur.left ? _traverse(cur.left) : null;
            cur.right ? _traverse(cur.right) : null;
        }
        this.root && _traverse(this.root);
        return result;
    }
    getNode(nodeProperty, propertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const node = this.getNodes(nodeProperty, propertyName, true)[0];
        if (node) {
            return node;
        }
        else {
            return null;
        }
    }
    getPathToRoot(node) {
        const result = [];
        while (node.parent !== null) {
            result.unshift(node);
            node = node.parent;
        }
        result.unshift(node);
        return result;
    }
    _resetResults() {
        this._visitedId = [];
        this._visitedVal = [];
        this._visitedNode = [];
        this._visitedCount = [];
        this._visitedLeftSum = [];
    }
    _pushByPropertyName(node, nodeOrPropertyName) {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        switch (nodeOrPropertyName) {
            case 'id':
                this._visitedId.push(node.id);
                break;
            case 'val':
                this._visitedVal.push(node.val);
                break;
            case 'node':
                this._visitedNode.push(node);
                break;
            case 'count':
                this._visitedCount.push(node.count);
                break;
            case 'allLesserSum':
                this._visitedLeftSum.push(node.allLesserSum);
                break;
            default:
                this._visitedId.push(node.id);
                break;
        }
    }
    _getResultByPropertyName(nodeOrPropertyName) {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        switch (nodeOrPropertyName) {
            case 'id':
                return this._visitedId;
            case 'val':
                return this._visitedVal;
            case 'node':
                return this._visitedNode;
            case 'count':
                return this._visitedCount;
            case 'allLesserSum':
                return this._visitedLeftSum;
            default:
                return this._visitedId;
        }
    }
    BFS(nodeOrPropertyName) {
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        this._resetResults();
        let queue = new Array();
        queue.push(this.root);
        while (queue.length !== 0) {
            let cur = queue.shift();
            if (cur) {
                this._pushByPropertyName(cur, nodeOrPropertyName);
                if (cur?.left !== null)
                    queue.push(cur.left);
                if (cur?.right !== null)
                    queue.push(cur.right);
            }
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }
    DFS(pattern, nodeOrPropertyName) {
        if (pattern === undefined) {
            pattern = 'in';
        }
        if (nodeOrPropertyName === undefined) {
            nodeOrPropertyName = 'id';
        }
        this._resetResults();
        const _traverse = (node) => {
            switch (pattern) {
                case 'in':
                    if (node.left)
                        _traverse(node.left);
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    if (node.right)
                        _traverse(node.right);
                    break;
                case 'pre':
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    if (node.left)
                        _traverse(node.left);
                    if (node.right)
                        _traverse(node.right);
                    break;
                case 'post':
                    if (node.left)
                        _traverse(node.left);
                    if (node.right)
                        _traverse(node.right);
                    this._pushByPropertyName(node, nodeOrPropertyName);
                    break;
            }
        };
        this.root && _traverse(this.root);
        return this._getResultByPropertyName(nodeOrPropertyName);
    }
    /**
     * Time complexity is O(n)
     * Space complexity of Iterative DFS equals to recursive DFS which is O(n) because of the stack
     * @param pattern
     * @param nodeOrPropertyName
     * @constructor
     */
    DFSIterative(pattern, nodeOrPropertyName) {
        pattern = pattern || 'in';
        nodeOrPropertyName = nodeOrPropertyName || 'id';
        this._resetResults();
        if (!this.root)
            return this._getResultByPropertyName(nodeOrPropertyName);
        // 0: visit, 1: print
        const stack = [];
        stack.push({ opt: 0, node: this.root });
        while (stack.length > 0) {
            const cur = stack.pop();
            if (!cur || !cur.node)
                continue;
            if (cur.opt === 1) {
                this._pushByPropertyName(cur.node, nodeOrPropertyName);
            }
            else {
                switch (pattern) {
                    case 'in':
                        stack.push({ opt: 0, node: cur.node.right });
                        stack.push({ opt: 1, node: cur.node });
                        stack.push({ opt: 0, node: cur.node.left });
                        break;
                    case 'pre':
                        stack.push({ opt: 0, node: cur.node.right });
                        stack.push({ opt: 0, node: cur.node.left });
                        stack.push({ opt: 1, node: cur.node });
                        break;
                    case 'post':
                        stack.push({ opt: 1, node: cur.node });
                        stack.push({ opt: 0, node: cur.node.right });
                        stack.push({ opt: 0, node: cur.node.left });
                        break;
                    default:
                        stack.push({ opt: 0, node: cur.node.right });
                        stack.push({ opt: 1, node: cur.node });
                        stack.push({ opt: 0, node: cur.node.left });
                        break;
                }
            }
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }
    getPredecessor(node) {
        if (node.left) {
            let predecessor = node.left;
            while (predecessor.right && predecessor.right !== node) {
                predecessor = predecessor.right;
            }
            return predecessor;
        }
        else {
            return node;
        }
    }
    /**
     * The time complexity of Morris traversal is O(n), it's may slower than others
     * The space complexity  Morris traversal is O(1) because no using stack
     * @param pattern
     * @param nodeOrPropertyName
     */
    morris(pattern, nodeOrPropertyName) {
        if (this.root === null) {
            return [];
        }
        pattern = pattern || 'in';
        nodeOrPropertyName = nodeOrPropertyName || 'id';
        this._resetResults();
        let cur = this.root;
        switch (pattern) {
            case 'in':
                while (cur) {
                    if (cur.left) {
                        let predecessor = this.getPredecessor(cur);
                        if (!predecessor.right) {
                            predecessor.right = cur;
                            cur = cur.left;
                            continue;
                        }
                        else {
                            predecessor.right = null;
                        }
                    }
                    this._pushByPropertyName(cur, nodeOrPropertyName);
                    cur = cur.right;
                }
                break;
            case 'pre':
                while (cur) {
                    if (cur.left) {
                        let predecessor = this.getPredecessor(cur);
                        if (!predecessor.right) {
                            predecessor.right = cur;
                            this._pushByPropertyName(cur, nodeOrPropertyName);
                            cur = cur.left;
                            continue;
                        }
                        else {
                            predecessor.right = null;
                        }
                    }
                    else {
                        this._pushByPropertyName(cur, nodeOrPropertyName);
                    }
                    cur = cur.right;
                }
                break;
            case 'post':
                const reverseEdge = (node) => {
                    let pre = null;
                    let next = null;
                    while (node) {
                        next = node.right;
                        node.right = pre;
                        pre = node;
                        node = next;
                    }
                    return pre;
                };
                const printEdge = (node) => {
                    let tail = reverseEdge(node);
                    let cur = tail;
                    while (cur) {
                        this._pushByPropertyName(cur, nodeOrPropertyName);
                        cur = cur.right;
                    }
                    reverseEdge(tail);
                };
                while (cur) {
                    if (cur.left) {
                        let predecessor = this.getPredecessor(cur);
                        if (predecessor.right === null) {
                            predecessor.right = cur;
                            cur = cur.left;
                            continue;
                        }
                        else {
                            predecessor.right = null;
                            printEdge(cur.left);
                        }
                    }
                    cur = cur.right;
                }
                printEdge(this.root);
                break;
        }
        return this._getResultByPropertyName(nodeOrPropertyName);
    }
    subTreeSum(subTreeRoot, propertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        let sum = 0;
        function _traverse(cur) {
            let needSum;
            switch (propertyName) {
                case 'id':
                    needSum = cur.id;
                    break;
                case 'count':
                    needSum = cur.count;
                    break;
                case 'allLesserSum':
                    needSum = cur.allLesserSum;
                    break;
                default:
                    needSum = cur.id;
                    break;
            }
            sum += needSum;
            if (!cur.left && !cur.right)
                return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        }
        subTreeRoot && _traverse(subTreeRoot);
        return sum;
    }
}
export class BinaryTreeNode {
    constructor(id, val, count) {
        this._val = null;
        this._left = null;
        this._right = null;
        this._parent = null;
        this._familyPosition = 0;
        this._count = 1;
        this._height = 0;
        this._allLesserSum = 0;
        if (val === undefined) {
            val = null;
        }
        if (count === undefined) {
            count = 1;
        }
        this._id = id;
        this._val = val;
        this._count = count;
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
    get left() {
        return this._left;
    }
    set left(v) {
        if (v) {
            v.parent = this;
            v.familyPosition = 1;
        }
        this._left = v;
    }
    get right() {
        return this._right;
    }
    set right(v) {
        if (v) {
            v.parent = this;
            v.familyPosition = 2;
        }
        this._right = v;
    }
    get parent() {
        return this._parent;
    }
    set parent(v) {
        this._parent = v;
    }
    get familyPosition() {
        return this._familyPosition;
    }
    set familyPosition(v) {
        this._familyPosition = v;
    }
    get count() {
        return this._count;
    }
    set count(v) {
        this._count = v;
    }
    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
    }
    get allLesserSum() {
        return this._allLesserSum;
    }
    set allLesserSum(v) {
        this._allLesserSum = v;
    }
    replaceLocation(replaceNode) {
        this._id = replaceNode.id;
        this._val = replaceNode.val;
        this._count = replaceNode.count;
        this._allLesserSum = replaceNode.allLesserSum;
        this._height = replaceNode.height;
        return true;
    }
    swapLocation(swapNode) {
        const tempNode = new BinaryTreeNode(swapNode.id);
        const { val, count, height, allLesserSum } = swapNode;
        tempNode.val = val;
        tempNode.count = count;
        tempNode.height = height;
        tempNode.allLesserSum = allLesserSum;
        swapNode.id = this._id;
        swapNode.val = this._val;
        swapNode.count = this._count;
        swapNode.height = this._height;
        swapNode.allLesserSum = this._allLesserSum;
        this._id = tempNode.id;
        this._val = tempNode.val;
        this._count = tempNode.count;
        this._height = tempNode.height;
        this._allLesserSum = tempNode.allLesserSum;
        return swapNode;
    }
    clone() {
        return new BinaryTreeNode(this._id, this._val, this._count);
    }
}
export class BinaryTree extends AbstractBinaryTree {
    createNode(id, val, count) {
        return new BinaryTreeNode(id, val, count);
    }
}
