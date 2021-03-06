/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */
import { PriorityQueue } from './priority-queue';
import { MinHeap } from '../heap';
/**
 * @class MinPriorityQueue
 * @extends PriorityQueue
 */
export class MinPriorityQueue extends PriorityQueue {
    constructor(options) {
        super(options);
        this._heap = new MinHeap();
    }
}
