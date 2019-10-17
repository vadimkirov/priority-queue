const MaxHeap = require('./max-heap.js');


// import Node from './node';

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;


let comparator = (a, b) => a > b;



class PriorityQueue {

	constructor(maxSize = 30) {
		this.heap = new MaxHeap();
		this._comparator = comparator;
		this.maxSize = maxSize;
	}

	push(data, priority) {
		if((this.size() + 1) === (this.maxSize-1)) {
			throw new Error('query FULL----??????????????')
		}
		let newNode = new Node(data,priority)
		this.heap.push(newNode);
		this._siftUp();
	}

	shift() {
		if(this.isEmpty()) {
			throw new Error('query EMPTY-----------??????????');
		}
		let valToDown = this.heap.pop();
		let result = this.heap.shift();
		this.heap.unshift(valToDown);
		this._siftDown();
		return result;


	}

	size() {
		return this.heap.length;
	}

	isEmpty() {
		return this.size() === 0;
	}

	_greater(i, j) {
		let iP = this.heap[i].priority;
		let jP = this.heap[j].priority;

		return this._comparator(iP, jP);
	}
	_swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	_siftUp() {
		let node = this.size() - 1;
		while (node > top && this._greater(node, parent(node))) {
			this._swap(node, parent(node));
			node = parent(node);
		}
	}

	_siftDown() {
		let node = top;
		while (
			(left(node) < this.size() && this._greater(left(node), node)) ||
			(right(node) < this.size() && this._greater(right(node), node))
			) {
			let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
			this._swap(node, maxChild);
			node = maxChild;
		}
	}
}

module.exports = PriorityQueue;
