/* --- start Linked List ---*/
// 2	Add Two Numbers	★★	445							traversal
// 24	Swap Nodes in Pairs	★★								reverse
// 206	Reverse Linked List	★★								reverse
// 141	Linked List Cycle	★★	142							fast/slow
// 23	Merge k Sorted Lists	★★★	21							priority_queue / mergesort
// 147	Insertion Sort List	★★★								insertion sort
// 148	Sort List	★★★★								merge sort O(1) space
// 707	Design Linked List	★★★★
import {DeepProxy} from '@qiwi/deep-proxy';
import {wait} from '../../utils';

export async function reverseLinkedList(head, proxyHandler) {
    let pre = null;
    let variables = {
        pre: null
    };
    let variablesProxy = new DeepProxy(variables, proxyHandler);
    while (head) {
        await wait(500);
        const next = head.next;
        head.next = variablesProxy.pre;
        variablesProxy.pre = head;
        head = next;
    }
    return pre;
}

/* --- end Linked List ---*/
