import {BST, BSTNode} from './bst';

export class TreeMultiSetNode extends BSTNode {
}

export class TreeMultiSet extends BST {
    createNode(id, val, count) {
        return new TreeMultiSetNode(id, val, count);
    }

    insert(id, val, count) {
        const inserted = super.insert(id, val, count);
        return inserted;
    }

    remove(id, isUpdateAllLeftSum) {
        const deletedResults = super.remove(id, isUpdateAllLeftSum);
        return deletedResults;
    }
}
