import { BST, BSTNode } from './bst';
export class AVLTreeNode extends BSTNode {
    clone() {
        return new AVLTreeNode(this._id, this._val, this._count);
    }
}
export class AVLTree extends BST {
    balanceFactor(node) {
        if (node.right === null) // node has no right subtree
            return -node.height;
        else if (node.left === null) // node has no left subtree
            return +node.height;
        else
            return node.right.height - node.left.height;
    }
    updateHeight(node) {
        if (node.left === null && node.right === null) // node is a leaf
            node.height = 0;
        else if (node.left === null) {
            // node has no left subtree
            const rightHeight = node.right ? node.right.height : 0;
            node.height = 1 + rightHeight;
        }
        else if (node.right === null) // node has no right subtree
            node.height = 1 + node.left.height;
        else
            node.height = 1 + Math.max(node.right.height, node.left.height);
    }
    balancePath(node) {
        const path = this.getPathToRoot(node);
        for (let i = path.length - 1; i >= 0; i--) {
            let A = path[i];
            this.updateHeight(A);
            switch (this.balanceFactor(A)) {
                case -2:
                    if (A && A.left) {
                        if (this.balanceFactor(A.left) <= 0) {
                            this.balanceLL(A); // Perform LL rotation
                        }
                        else {
                            this.balanceLR(A); // Perform LR rotation
                        }
                    }
                    break;
                case +2:
                    if (A && A.right) {
                        if (this.balanceFactor(A.right) >= 0) {
                            this.balanceRR(A); // Perform RR rotation
                        }
                        else {
                            this.balanceRL(A); // Perform RL rotation
                        }
                    }
            }
        }
    }
    balanceLL(A) {
        const parentOfA = A.parent;
        const B = A.left; // A is left-heavy and B is left-heavy
        A.parent = B;
        if (B && B.right !== null) {
            B.right.parent = A;
        }
        if (B)
            B.parent = parentOfA;
        if (A === this.root) {
            this.root = B;
        }
        else {
            if (parentOfA?.left === A) {
                parentOfA.left = B;
            }
            else {
                if (parentOfA)
                    parentOfA.right = B;
            }
        }
        if (B) {
            A.left = B.right; // Make T2 the left subtree of A
            B.right = A; // Make A the left child of B
        }
        this.updateHeight(A);
        if (B)
            this.updateHeight(B);
    }
    balanceLR(A) {
        const parentOfA = A.parent;
        const B = A.left; // A is left-heavy
        let C = null;
        if (B) {
            C = B.right; // B is right-heavy
        }
        if (A)
            A.parent = C;
        if (B)
            B.parent = C;
        if (C) {
            if (C.left !== null) {
                C.left.parent = B;
            }
            if (C.right !== null) {
                C.right.parent = A;
            }
            C.parent = parentOfA;
        }
        if (A === this.root) {
            this.root = C;
        }
        else {
            if (parentOfA) {
                if (parentOfA.left === A) {
                    parentOfA.left = C;
                }
                else {
                    parentOfA.right = C;
                }
            }
        }
        if (C) {
            A.left = C.right; // Make T3 the left subtree of A
            if (B)
                B.right = C.left; // Make T2 the right subtree of B
            C.left = B;
            C.right = A;
        }
        this.updateHeight(A); // Adjust heights
        B && this.updateHeight(B);
        C && this.updateHeight(C);
    }
    balanceRR(A) {
        const parentOfA = A.parent;
        const B = A.right; // A is right-heavy and B is right-heavy
        A.parent = B;
        if (B) {
            if (B.left !== null) {
                B.left.parent = A;
            }
            B.parent = parentOfA;
        }
        if (A === this.root) {
            this.root = B;
        }
        else {
            if (parentOfA) {
                if (parentOfA.left === A) {
                    parentOfA.left = B;
                }
                else {
                    parentOfA.right = B;
                }
            }
        }
        if (B) {
            A.right = B.left; // Make T2 the right subtree of A
            B.left = A;
        }
        this.updateHeight(A);
        B && this.updateHeight(B);
    }
    balanceRL(A) {
        const parentOfA = A.parent;
        const B = A.right; // A is right-heavy
        let C = null;
        if (B) {
            C = B.left; // B is left-heavy
        }
        A.parent = C;
        if (B)
            B.parent = C;
        if (C) {
            if (C.left !== null) {
                C.left.parent = A;
            }
            if (C.right !== null) {
                C.right.parent = B;
            }
            C.parent = parentOfA;
        }
        if (A === this.root) {
            this.root = C;
        }
        else {
            if (parentOfA) {
                if (parentOfA.left === A) {
                    parentOfA.left = C;
                }
                else {
                    parentOfA.right = C;
                }
            }
        }
        if (C)
            A.right = C.left; // Make T2 the right subtree of A
        if (B && C)
            B.left = C.right; // Make T3 the left subtree of B
        if (C)
            C.left = A;
        if (C)
            C.right = B;
        this.updateHeight(A); // Adjust heights
        B && this.updateHeight(B);
        C && this.updateHeight(C);
    }
    createNode(id, val, count) {
        return new AVLTreeNode(id, val, count);
    }
    insert(id, val, count) {
        const inserted = super.insert(id, val, count);
        for (let node of inserted) {
            if (node) {
                this.balancePath(node);
            }
        }
        return inserted;
    }
    remove(id, isUpdateAllLeftSum) {
        const deletedResults = super.remove(id, isUpdateAllLeftSum);
        for (let { needBalanced } of deletedResults) {
            if (needBalanced) {
                this.balancePath(needBalanced);
            }
        }
        return deletedResults;
    }
}
