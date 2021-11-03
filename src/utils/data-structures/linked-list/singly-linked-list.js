/**
 * The class which represents one link or node in a linked list
 * ```ts
 * const node = new SinglyLinkedListNode(1, null, null, null);
 * ```
 */
export class SinglyLinkedListNode {
    constructor(
    /** Data stored on the node */
    data, 
    /** The previous node in the list */
    prev, 
    /** The next link in the list */
    next, 
    /** The list this node belongs to */
    list) {
        this.data = data;
        this.prev = prev;
        this.next = next;
        this.list = list;
    }
    /**
     * Alias to .data
     * ```ts
     * new LinkedList(1, 2, 3).head.value; // 1
     * ```
     */
    get value() {
        return this.data;
    }
    /**
     * Get the index of this node
     * ```ts
     * new LinkedList(1, 2, 3).head.index; // 0
     * ```
     */
    get index() {
        if (!this.list) {
            return undefined;
        }
        return this.list.findIndex((value) => value === this.value);
    }
    /**
     * Insert a new node before this one
     * ```ts
     * new LinkedList(2, 3).head.insertBefore(1); // 1 <=> 2 <=> 3
     * ```
     * @param data Data to save in the node
     */
    insertBefore(data) {
        return this.list !== null
            ? this.list.insertBefore(this, data)
            : new SinglyLinkedList(data, this.data);
    }
    /**
     * Insert new data after this node
     * ```ts
     * new LinkedList(1, 2).tail.insertAfter(3); // 1 <=> 2 <=> 3
     * ```
     * @param data Data to be saved in the node
     */
    insertAfter(data) {
        return this.list !== null
            ? this.list.insertAfter(this, data)
            : new SinglyLinkedList(this.data, data);
    }
    /**
     * Remove this node
     * ```ts
     * new LinkedList(1, 2, 3, 4).tail.remove(); // 1 <=> 2 <=> 3
     * ```
     */
    remove() {
        if (this.list === null) {
            throw new ReferenceError('Node does not belong to any list');
        }
        return this.list.removeNode(this);
    }
}
/**
 * A doubly linked list
 * ```ts
 * const list = new LinkedList(1, 2, 3);
 * const listFromArray = LinkedList.from([1, 2, 3]);
 * ```
 */
export class SinglyLinkedList {
    constructor(...args) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        for (let i = 0; i < arguments.length; i++) {
            this.append(arguments[i]);
        }
    }
    /**
     * The length of the list
     */
    get length() {
        return this.size;
    }
    /**
     * Convert any iterable to a new linked list
     * ```javascript
     * const array = [1, 2, 3];
     * const list = LinkedList.from(array);
     * ```
     * @param iterable Any iterable datatype like Array or Map
     */
    static from(iterable) {
        return new SinglyLinkedList(...iterable);
    }
    /**
     * Get the node data at a specified index, zero based
     * ```ts
     * new LinkedList(1, 2, 3).get(0); // 1
     * ```
     * @param index to retrieve data at
     */
    get(index) {
        const node = this.getNode(index);
        return node !== undefined ? node.data : undefined;
    }
    /**
     * Get the node at index, zero based
     * ```ts
     * new LinkedList(1, 2, 3).getNode(0);
     * // { prev: null, data: 1, next: SinglyLinkedListNode }
     * ```
     */
    getNode(index) {
        if (this.head === null || index < 0 || index >= this.length) {
            return undefined;
        }
        const asc = index < this.length / 2;
        const stopAt = asc ? index : this.length - index - 1;
        const nextNode = asc ? 'next' : 'prev';
        let currentNode = asc ? this.head : this.tail;
        for (let currentIndex = 0; currentIndex < stopAt; currentIndex++) {
            currentNode = currentNode[nextNode];
        }
        return currentNode;
    }
    /**
     * Return the first node and its index in the list that
     * satisfies the testing function
     * ```ts
     * new LinkedList(1, 2, 3).findNodeIndex(data => data === 1);
     * // { node: SinglyLinkedListNode, index: 0 }
     * ```
     * @param f A function to be applied to the data of each node
     */
    findNodeIndex(f) {
        let currentIndex = 0;
        let currentNode = this.head;
        while (currentNode) {
            if (f(currentNode.data, currentIndex, this)) {
                return {
                    index: currentIndex,
                    node: currentNode,
                };
            }
            currentNode = currentNode.next;
            currentIndex += 1;
        }
        return undefined;
    }
    /**
     * Returns the first node in the list that
     * satisfies the provided testing function. Otherwise undefined is returned.
     * ```ts
     * new LinkedList(1, 2, 3).findNode(data => data === 1);
     * // { prev: null, data: 1, next: SinglyLinkedListNode }
     * ```
     * @param f Function to test data against
     */
    findNode(f) {
        const nodeIndex = this.findNodeIndex(f);
        return nodeIndex !== undefined ? nodeIndex.node : undefined;
    }
    /**
     * Returns the value of the first element in the list that
     * satisfies the provided testing function. Otherwise undefined is returned.
     * ```ts
     * new LinkedList(1, 2, 3).find(data => data === 1); // 1
     * ```
     * @param f Function to test data against
     */
    find(f) {
        const nodeIndex = this.findNodeIndex(f);
        return nodeIndex !== undefined ? nodeIndex.node.data : undefined;
    }
    /**
     * Returns the index of the first node in the list that
     * satisfies the provided testing function. Ohterwise -1 is returned.
     * ```ts
     * new LinkedList(1, 2, 3).findIndex(data => data === 3); // 2
     * ```
     * @param f Function to test data against
     */
    findIndex(f) {
        const nodeIndex = this.findNodeIndex(f);
        return nodeIndex !== undefined ? nodeIndex.index : -1;
    }
    /**
     * Append one or any number of nodes to the end of the list.
     * This modifies the list in place and returns the list itself
     * to make this method chainable.
     * ```ts
     * new LinkedList(1).append(2).append(3, 4); // 1 <=> 2 <=> 3 <=> 4
     * ```
     * @param args Data to be stored in the node, takes any number of arguments
     */
    append(...args) {
        for (const data of args) {
            const node = new SinglyLinkedListNode(data, this.tail, null, this);
            if (this.head === null) {
                this.head = node;
            }
            if (this.tail !== null) {
                this.tail.next = node;
            }
            this.tail = node;
            this.size += 1;
        }
        return this;
    }
    /**
     * Synonym for append
     * ```ts
     * new LinkedList(1).push(2).push(3, 4); // 1 <=> 2 <=> 3 <=> 4
     * ```
     * @param args Data to be stored, takes any number of arguments
     */
    push(...args) {
        this.append(...args);
        return this.length;
    }
    /**
     * Prepend any number of data arguments to the list. The
     * argument list is prepended as a block to reduce confusion:
     * ```javascript
     * new LinkedList(3, 4).prepend(0, 1, 2); // [0, 1, 2, 3, 4]
     * ```
     * @param args Data to be stored in the node, accepts any number of arguments
     */
    prepend(...args) {
        const reverseArgs = Array.from(args).reverse();
        for (const data of reverseArgs) {
            const node = new SinglyLinkedListNode(data, null, this.head, this);
            if (this.tail === null) {
                this.tail = node;
            }
            if (this.head !== null) {
                this.head.prev = node;
            }
            this.head = node;
            this.size += 1;
        }
        return this;
    }
    /**
     * Insert a new node at a given index position. If index is
     * out of bounds, the node is appended, if index is negative
     * or 0, it will be prepended.
     * ```ts
     * new LinkedList(1, 3).insertAt(1, 2); // 1 <=> 2 <=> 3
     * ```
     * @param index The index to insert the new node at
     * @param data Data to be stored on the new node
     */
    insertAt(index, data) {
        if (this.head === null) {
            return this.append(data);
        }
        if (index <= 0) {
            return this.prepend(data);
        }
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentIndex < index - 1 && currentNode.next !== null) {
            currentIndex += 1;
            currentNode = currentNode.next;
        }
        currentNode.insertAfter(data);
        return this;
    }
    /**
     * Remove the specified node from the list and return the removed
     * node afterwards.
     * ```ts
     * const list = new LinkedList(1, 2, 3);
     * list.removeNode(list.tail); // { prev: null, data: 3, next: null, list: null }
     * ```
     * @param node The node to be removed
     */
    removeNode(node) {
        if (node.list !== this) {
            throw new ReferenceError('Node does not belong to this list');
        }
        if (node.prev !== null) {
            node.prev.next = node.next;
        }
        if (node.next !== null) {
            node.next.prev = node.prev;
        }
        if (this.head === node) {
            this.head = node.next;
        }
        if (this.tail === node) {
            this.tail = node.prev;
        }
        this.size -= 1;
        node.next = null;
        node.prev = null;
        node.list = null;
        return node;
    }
    /**
     * Remove the node at the specified index
     * ```ts
     * new LinkedList(1, 2, 3).removeAt(2); // { prev: null, data: 3, next: null, list: null }
     * ```
     * @param index Index at which to remove
     */
    removeAt(index) {
        const node = this.getNode(index);
        return node !== undefined ? this.removeNode(node) : undefined;
    }
    /**
     * Insert a new node before the reference node
     * ```ts
     * const list = new LinkedList(1, 3);
     * list.insertBefore(list.tail, 2); // 1 <=> 2 <=> 3
     * ```
     * @param referenceNode The node reference
     * @param data Data to save in the node
     */
    insertBefore(referenceNode, data) {
        const node = new SinglyLinkedListNode(data, referenceNode.prev, referenceNode, this);
        if (referenceNode.prev === null) {
            this.head = node;
        }
        if (referenceNode.prev !== null) {
            referenceNode.prev.next = node;
        }
        referenceNode.prev = node;
        this.size += 1;
        return this;
    }
    /**
     * Sorts the linked list using the provided compare function
     * @param compare A function used to compare the data of two nodes. It should return
     *                a boolean. True will insert a before b, false will insert b before a.
     *                (a, b) => a < b or (1, 2) => 1 < 2 === true, 2 will be inserted after 1,
     *                the sort order will be ascending.
     */
    sort(compare) {
        if (this.head === null || this.tail === null) {
            return this;
        }
        if (this.length < 2) {
            return this;
        }
        const quicksort = (start, end) => {
            if (start === end) {
                return;
            }
            const pivotData = end.data;
            let current = start;
            let split = start;
            while (current && current !== end) {
                const sort = compare(current.data, pivotData);
                if (sort) {
                    if (current !== split) {
                        const temp = split.data;
                        split.data = current.data;
                        current.data = temp;
                    }
                    split = split.next;
                }
                current = current.next;
            }
            end.data = split.data;
            split.data = pivotData;
            if (start.next === end.prev) {
                return;
            }
            if (split.prev && split !== start) {
                quicksort(start, split.prev);
            }
            if (split.next && split !== end) {
                quicksort(split.next, end);
            }
        };
        quicksort(this.head, this.tail);
        return this;
    }
    /**
     * Insert a new node after this one
     * ```ts
     * const list = new LinkedList(2, 3);
     * list.insertAfter(list.head, 1); // 1 <=> 2 <=> 3
     * ```
     * @param referenceNode The reference node
     * @param data Data to be saved in the node
     */
    insertAfter(referenceNode, data) {
        const node = new SinglyLinkedListNode(data, referenceNode, referenceNode.next, this);
        if (referenceNode.next === null) {
            this.tail = node;
        }
        if (referenceNode.next !== null) {
            referenceNode.next.prev = node;
        }
        referenceNode.next = node;
        this.size += 1;
        return this;
    }
    /**
     * Remove the first node from the list and return the data of the removed node
     * or undefined
     * ```ts
     * new LinkedList(1, 2, 3).shift(); // 1
     * ```
     */
    shift() {
        return this.removeFromAnyEnd(this.head);
    }
    /**
     * Remove the last node from the list and return the data of the removed node
     * or undefined if the list was empty
     * ```ts
     * new LinkedList(1, 2, 3).pop(); // 3
     * ```
     */
    pop() {
        return this.removeFromAnyEnd(this.tail);
    }
    /**
     * Merge the current list with another. Both lists will be
     * equal after merging.
     * ```ts
     * const list = new LinkedList(1, 2);
     * const otherList = new LinkedList(3);
     * list.merge(otherList);
     * (list === otherList); // true
     * ```
     * @param list The list to be merged
     */
    merge(list) {
        if (this.tail !== null) {
            this.tail.next = list.head;
        }
        if (list.head !== null) {
            list.head.prev = this.tail;
        }
        this.head = this.head || list.head;
        this.tail = list.tail || this.tail;
        this.size += list.size;
        list.size = this.size;
        list.head = this.head;
        list.tail = this.tail;
    }
    /**
     * Removes all nodes from a list
     *
     * ```ts
     * list.clear();
     * ```
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        return this;
    }
    /**
     * The slice() method returns a shallow copy of a
     * portion of a list into a new list object selected
     * from start to end (end not included).
     * The original list will not be modified.
     * ```ts
     * const list = new LinkedList(1, 2, 3, 4, 5);
     * const newList = list.slice(0, 3); // 1 <=> 2 <=> 3
     * ```
     * @param start Start index
     * @param end End index, optional
     */
    slice(start, end) {
        const list = new SinglyLinkedList();
        let finish = end;
        if (this.head === null || this.tail === null) {
            return list;
        }
        if (finish === undefined || finish < start) {
            finish = this.length;
        }
        let head = this.getNode(start);
        for (let i = 0; i < finish - start && head !== null && head !== undefined; i++) {
            list.append(head.data);
            head = head.next;
        }
        return list;
    }
    /**
     * The reverse() function reverses the list in place and returns the list
     * itself.
     * ```ts
     * new LinkedList(1, 2, 3).reverse(); // 3 <=> 2 <=> 1
     * ```
     */
    reverse() {
        let currentNode = this.head;
        while (currentNode) {
            const next = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = next;
            currentNode = currentNode.prev;
        }
        const tail = this.tail;
        this.tail = this.head;
        this.head = tail;
        return this;
    }
    /**
     * The forEach() method executes a provided function once for each list node.
     * ```ts
     * new LinkedList(1, 2, 3).forEach(data => log(data)); // 1 2 3
     * ```
     * @param f Function to execute for each element, taking up to three arguments.
     * @param reverse Indicates if the list should be walked in reverse order, default is false
     */
    forEach(f, reverse = false) {
        let currentIndex = reverse ? this.length - 1 : 0;
        let currentNode = reverse ? this.tail : this.head;
        const modifier = reverse ? -1 : 1;
        const nextNode = reverse ? 'prev' : 'next';
        while (currentNode) {
            f(currentNode.data, currentIndex, this);
            currentNode = currentNode[nextNode];
            currentIndex += modifier;
        }
    }
    /**
     * The map() method creates a new list with the results of
     * calling a provided function on every node in the calling list.
     * ```ts
     * new LinkedList(1, 2, 3).map(data => data + 10); // 11 <=> 12 <=> 13
     * ```
     * @param f Function that produces an node of the new list, taking up to three arguments
     * @param reverse Indicates if the list should be mapped in reverse order, default is false
     */
    map(f, reverse = false) {
        const list = new SinglyLinkedList();
        this.forEach((data, index) => list.append(f(data, index, this)), reverse);
        return list;
    }
    /**
     * The filter() method creates a new list with all nodes
     * that pass the test implemented by the provided function.
     * ```ts
     * new LinkedList(1, 2, 3, 4, 5).filter(data => data < 4); // 1 <=> 2 <=> 3
     * ```
     * @param f Function to test each node data in the list. Return true to keep the node
     * @param reverse Indicates if the list should be filtered in reverse order, default is false
     */
    filter(f, reverse = false) {
        const list = new SinglyLinkedList();
        this.forEach((data, index) => {
            if (f(data, index, this)) {
                list.append(data);
            }
        }, reverse);
        return list;
    }
    /**
     * Reduce over each node in the list
     * ```ts
     * new LinkedList(1, 2, 3).reduce(n => n += 1, 0); // 3
     * ```
     * @param f A reducer function
     * @param start An initial value
     * @returns The final state of the accumulator
     */
    reduce(f, start, reverse = false) {
        let currentIndex = reverse ? this.length - 1 : 0;
        const modifier = reverse ? -1 : 1;
        const nextNode = reverse ? 'prev' : 'next';
        let currentElement = reverse ? this.tail : this.head;
        let result;
        if (start !== undefined) {
            result = start;
        }
        else if (currentElement) {
            result = currentElement.data;
            currentElement = currentElement[nextNode];
        }
        else {
            throw new TypeError('Reduce of empty LinkedList with no initial value');
        }
        while (currentElement) {
            result = f(result, currentElement.data, currentIndex, this);
            currentIndex += modifier;
            currentElement = currentElement[nextNode];
        }
        return result;
    }
    /**
     * Convert the linked list to an array
     * ```ts
     * new LinkedList(1, 2, 3).toArray(); // [1, 2, 3]
     * ```
     */
    toArray() {
        return [...this];
    }
    /**
     * Convert a linked list to string
     * ```ts
     * new LinkedList('one', 'two', 'three').toString(' <=> ') === 'one <=> two <=> three';
     * ```
     * @param separator Optional string to be placed in between data nodes, default is one space
     */
    toString(separator = ' ') {
        return this.reduce((s, data) => `${s}${separator}${data}`);
    }
    /**
     * The iterator implementation
     * ```ts
     * const list = new LinkedList(1, 2, 3);
     * for (const data of list) { log(data); } // 1 2 3
     * ```
     */
    *[Symbol.iterator]() {
        let element = this.head;
        while (element !== null) {
            yield element.data;
            element = element.next;
        }
    }
    /** Private helper function to reduce duplication of pop() and shift() methods */
    removeFromAnyEnd(node) {
        return node !== null ? this.removeNode(node).data : undefined;
    }
}
