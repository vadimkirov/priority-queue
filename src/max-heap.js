const Node = require('./node');

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;


let comparator = (a, b) => a > b;



class MaxHeap {

	constructor() {
	    this.root = null;
	    this.parentNodes = []
        
        this.compare = comparator;
	}

	push(data, priority) {
	    let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeDown(newNode);
	}

	pop() {
		return this.parentNodes.pop();
	}

	detachRoot() {
		this.root = null;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return !this.parentNodes.length;
	}
	

	clear() {
		this.parentNodes.length = 0;
	}

	insertNode(node) {
        this.parentNodes.push(node);
        this.shiftNodeUp(node);
        return this;
	}

	shiftNodeUp(node) {
        while (node.priority > node.parent.priority){
            node.swapWithParent();
        }
		
	}

	shiftNodeDown(node) {
		
	}

	
    swap(indexOne, indexTwo) {
        const tmp = this.parentNodes[indexTwo];
        this.parentNodes[indexTwo] = this.parentNodes[indexOne];
        this.parentNodes[indexOne] = tmp;
    }



}

module.exports = MaxHeap;
