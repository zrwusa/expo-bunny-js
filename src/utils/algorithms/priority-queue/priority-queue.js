import {MaxPriorityQueue, MinPriorityQueue} from '../../data-structures';

export const testPriorityQueue = () => {
    const minNumPQ = new MinPriorityQueue();
    minNumPQ.enqueue(1);
    minNumPQ.enqueue(6);
    minNumPQ.enqueue(2);
    minNumPQ.enqueue(0);
    minNumPQ.dequeue();
    console.log(minNumPQ.front());
    console.log(minNumPQ.toArray());
    const minStringPQ = new MinPriorityQueue();
    minStringPQ.enqueue('1');
    minStringPQ.enqueue('6');
    minStringPQ.enqueue('2');
    minStringPQ.enqueue('0');
    minStringPQ.dequeue();
    console.log(minStringPQ.front());
    console.log(minStringPQ.toArray());
    const minPQ = new MinPriorityQueue();
    minPQ.enqueue({a: 'a1'}, 1);
    minPQ.enqueue({a: 'a6'}, 6);
    minPQ.enqueue({a: 'a2'}, 2);
    minPQ.enqueue({a: 'a0'}, 0);
    minPQ.dequeue();
    console.log(minPQ.front());
    console.log(minPQ.toArray());
    const maxPQ = new MaxPriorityQueue();
    maxPQ.enqueue({a: 'a1'}, 1);
    maxPQ.enqueue({a: 'a6'}, 6);
    maxPQ.enqueue({a: 'a5'}, 5);
    maxPQ.enqueue({a: 'a2'}, 2);
    maxPQ.enqueue({a: 'a0'}, 0);
    maxPQ.dequeue();
    console.log(maxPQ.front());
    console.log(maxPQ.toArray());
};
