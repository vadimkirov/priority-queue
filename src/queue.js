const MaxHeap = require('./max-heap.js');


class PriorityQueue {

	constructor(maxSize = 30) {
		this.heap = new MaxHeap();

		this.maxSize = maxSize;
		this.countSize = 0;
	}

	push(data, priority) {
		if((this.countSize) === (this.maxSize)) {
			throw new Error('query FULL----??????????????')
		}
		this.heap.push(data, priority);
		this.countSize++;
	}


	shift() {
		if(this.isEmpty()) {
			throw new Error('query EMPTY-----------??????????');

		}
		this.countSize--;
		return null;
	}

	size() {
		return this.countSize;
	}

	isEmpty() {
		return (this.size() === 0);
	}

}

module.exports = PriorityQueue;


