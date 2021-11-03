import {BinaryTree, BinaryTreeNode} from './binary-tree';

export class BSTNode extends BinaryTreeNode {
    clone() {
        return new BSTNode(this._id, this._val, this._count);
    }
}

export class BST extends BinaryTree {
    constructor(autoPrefixSum, id, val, count) {
        super(id, val, count);
        this._autoAllLesserSum = false;
        if (autoPrefixSum) {
            this._autoAllLesserSum = true;
        }
    }

    // --- start basic functions
    createNode(id, val, count) {
        return new BSTNode(id, val, count);
    }

    insert(id, val, count) {
        const inserted = [];
        const newNode = this.createNode(id, val, count);
        const newId = newNode.id;
        if (this.root === null) {
            this.root = newNode;
            this._size++;
            inserted.push(this.root);
        } else {
            let cur = this.root;
            let traversing = true;
            while (traversing) {
                if (cur.id === newId) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, newNode.count, 'allLesserSum');
                    cur.count += newNode.count;
                    //Duplicates are not accepted.
                    traversing = false;
                    inserted.push(cur);
                } else if (newId < cur.id) {
                    this._autoAllLesserSum && cur.right && this.subTreeAdd(cur.right, newNode.count, 'allLesserSum');
                    if (this._autoAllLesserSum)
                        cur.allLesserSum += newNode.count;
                    // Traverse left of the node
                    if (cur.left === null) {
                        if (this._autoAllLesserSum)
                            newNode.allLesserSum = cur.allLesserSum - newNode.count;
                        newNode.parent = cur;
                        newNode.familyPosition = 1;
                        //Add to the left of the current node
                        cur.left = newNode;
                        this._size++;
                        traversing = false;
                        inserted.push(cur.left);
                    } else {
                        //Traverse the left of the current node
                        cur = cur.left;
                    }
                } else if (newId > cur.id) {
                    // Traverse right of the node
                    if (cur.right === null) {
                        if (this._autoAllLesserSum)
                            newNode.allLesserSum = cur.allLesserSum + cur.count;
                        newNode.parent = cur;
                        newNode.familyPosition = 2;
                        //Add to the right of the current node
                        cur.right = newNode;
                        this._size++;
                        traversing = false;
                        inserted.push(cur.right);
                    } else {
                        //Traverse the left of the current node
                        cur = cur.right;
                    }
                }
            }
        }
        return inserted;
    }

    remove(id, isUpdateAllLeftSum) {
        if (isUpdateAllLeftSum === undefined) {
            isUpdateAllLeftSum = true;
        }
        let bstDeletedResult = [];
        if (this.root === null)
            return bstDeletedResult; // Element is not in the tree
        // Locate the node to be deleted and also locate its parent node
        let current = this.getNode(id);
        if (current === null)
            return bstDeletedResult; // Element is not in the tree
        const parent = current?.parent ? current.parent : null;
        let needBalanced = null;
        let orgCurrent = current;
        const deletedCount = current.count;
        // Case 1: current has no left children (See Figure 23.6)
        if (current.left === null) {
            // Connect the parent with the right child of the current node
            if (parent === null) {
                this.root = current.right;
            } else {
                switch (current.familyPosition) {
                    case 1:
                        parent.left = current.right;
                        break;
                    case 2:
                        parent.right = current.right;
                        break;
                }
                needBalanced = parent;
            }
        } else {
            // Case 2: The current node has a left child
            // Locate the rightmost node in the left subtree of
            // the current node and also its parent
            let leftSubTreeMax = this.getMaxNode(current.left);
            let parentOfLeftSubTreeMax = leftSubTreeMax.parent;
            // Replace the element in current by the element in leftSubTreeMax
            orgCurrent = current.swapLocation(leftSubTreeMax);
            // Eliminate rightmost node
            if (parentOfLeftSubTreeMax) {
                if (parentOfLeftSubTreeMax.right === leftSubTreeMax) {
                    parentOfLeftSubTreeMax.right = leftSubTreeMax.left;
                } else {
                    // Special case: parentOfLeftSubTreeMax is current
                    parentOfLeftSubTreeMax.left = leftSubTreeMax.left;
                }
                needBalanced = parentOfLeftSubTreeMax;
            }
        }
        this._size--;
        this._autoAllLesserSum && isUpdateAllLeftSum && this.allGreaterNodesAdd(current, -deletedCount, 'allLesserSum');
        bstDeletedResult.push({deleted: orgCurrent, needBalanced});
        return bstDeletedResult;
    }

    isBST() {
        if (!this.root)
            return true;

        function dfs(cur, min, max) {
            if (!cur)
                return true;
            if ((cur.id <= min) || (cur.id >= max))
                return false;
            return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
        }

        return dfs(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        // if (!this.root) return true;
        //
        // let valid = true;
        //
        // function dfs(cur: BSTNode<T> | null, min: BinaryTreeNodeId, max: BinaryTreeNodeId): void {
        //     if (!cur) return;
        //     if (cur.id <= min || cur.id >= max) {
        //         valid = false;
        //         return;
        //     }
        //     dfs(cur.left, min, cur.id);
        //     dfs(cur.right, cur.id, max);
        // }
        //
        // dfs(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        // return valid;
    }

    contains(node) {
        return false;
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
            if (propertyName === 'id') {
                if (nodeProperty < cur.id) {
                    cur.left ? _traverse(cur.left) : null;
                }
                if (nodeProperty > cur.id) {
                    cur.right ? _traverse(cur.right) : null;
                }
            } else {
                cur.left ? _traverse(cur.left) : null;
                cur.right ? _traverse(cur.right) : null;
            }
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
        } else {
            return null;
        }
    }

    getMinNode(node) {
        if (!node) {
            node = this.root;
        }

        function _traverse(cur) {
            if (!cur.left)
                return cur;
            return _traverse(cur.left);
        }

        return node ? _traverse(node) : null;
    }

    getMaxNode(node) {
        if (!node) {
            node = this.root;
        }

        function _traverse(cur) {
            if (!cur.right)
                return cur;
            return _traverse(cur.right);
        }

        return node ? _traverse(node) : null;
    }

    // getMaxNode(node?: BSTNode<T> | null): BSTNode<T> | null {
    //     if (!node) {
    //         node = this.root;
    //     }
    //
    //     const _findByPath = (cur: BSTNode<T>) => {
    //         while (cur.right) {
    //             cur = cur.right; // Keep going to the right
    //         }
    //         return cur;
    //     }
    //
    //     return node ? _findByPath(node) : null;
    // }
    lesserSum(id, propertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        let sum = 0;
        const _traverse = (cur) => {
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
            const curId = cur.id;
            if (id === curId) {
                if (cur.right) {
                    sum += this.subTreeSum(cur.right, propertyName);
                }
                return;
            }
            if (id > curId) {
                if (cur.left) {
                    sum += this.subTreeSum(cur.left, propertyName);
                }
                sum += needSum;
                if (cur.right) {
                    _traverse(cur.right);
                } else {
                    return;
                }
            }
            if (id < curId) {
                if (cur.left) {
                    _traverse(cur.left);
                } else {
                    return;
                }
            }
        };
        this.root && _traverse(this.root);
        return sum;
    }

    subTreeAdd(subTreeRoot, delta, propertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const _traverse = (cur) => {
            switch (propertyName) {
                case 'id':
                    cur.id += delta;
                    break;
                case 'count':
                    cur.count += delta;
                    this._autoAllLesserSum && this.allGreaterNodesAdd(cur, delta, 'allLesserSum');
                    break;
                case 'allLesserSum':
                    cur.allLesserSum += delta;
                    break;
                default:
                    cur.id += delta;
                    break;
            }
            if (!cur.left && !cur.right)
                return;
            cur.left && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        };
        if (subTreeRoot) {
            _traverse(subTreeRoot);
            return true;
        }
        return false;
    }

    allGreaterNodesAdd(node, delta, propertyName) {
        if (propertyName === undefined) {
            propertyName = 'id';
        }
        const _traverse = (cur) => {
            if (cur.id > node.id) {
                switch (propertyName) {
                    case 'id':
                        cur.id += delta;
                        break;
                    case 'count':
                        cur.count += delta;
                        this._autoAllLesserSum && this.allGreaterNodesAdd(cur, delta, 'allLesserSum');
                        break;
                    case 'allLesserSum':
                        cur.allLesserSum += delta;
                        break;
                    default:
                        cur.id += delta;
                        break;
                }
            }
            if (!cur.left && !cur.right)
                return;
            (cur.left && cur.id > node.id) && _traverse(cur.left);
            cur.right && _traverse(cur.right);
        };
        if (this.root) {
            _traverse(this.root);
            return true;
        }
        return false;
    }

    balance() {
        const sorted = this.DFS('in', 'node');
        this.clear();
        const buildBalanceBST = (l, r) => {
            if (l > r)
                return;
            const m = Math.floor(l + (r - l) / 2);
            const midNode = sorted[Math.floor(l + (r - l) / 2)];
            this.insert(midNode.id, midNode.val, midNode.count);
            buildBalanceBST(l, m - 1);
            buildBalanceBST(m + 1, r);
        };
        if (sorted.length > 0) {
            buildBalanceBST(0, sorted.length - 1);
            return true;
        } else {
            return false;
        }
    }

    isAVLBalanced() {
        let balanced = true;
        const _height = (cur) => {
            if (!cur)
                return 0;
            let leftHeight = _height(cur.left);
            let rightHeight = _height(cur.right);
            if (Math.abs(leftHeight - rightHeight) > 1) {
                balanced = false;
                return Infinity;
            }
            return Math.max(leftHeight, rightHeight) + 1;
        };
        _height(this.root);
        return balanced;
    }
}
