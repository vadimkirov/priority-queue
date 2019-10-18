const Node = require('./node');

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;


let comparator = (a, b) => a > b;



class MaxHeap {

	constructor() {
	    this.root = null;
	    this.parentNodes = [];

        
        this.compare = comparator;
	}

	push(data, priority) {
	    let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		return this.parentNodes.pop();
	}

	detachRoot() {
		this.root = null;

		// return this.root;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.parentNodes.length;
	}
	

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
	}

	insertNode(node) {
		if(this.isEmpty()){
			this.root = node;
			this.parentNodes.unshift(node);
		}else {
			for (let i = 0; i < this.parentNodes.length; i++) {
				let insertNode = this.parentNodes[i];
				if (null === insertNode.left || null === insertNode.right) {
					insertNode.appendChild(node);
					this.parentNodes.push(node)
					if(null !== insertNode.right  && this.parentNodes.length > 2){
						this.parentNodes.shift();
					}
					break;
				}

			}
		}
	}

	shiftNodeUp(node) {
		// const nodeData = node.data;
		// const nodePriority = node.priority;
		// for(let i = 0; i<this.parentNodes.length; i++)
		// {
		// 	let tempNode = this.parentNodes[i];
		// 	if(tempNode.data === nodeData && tempNode.priority === nodePriority) {
		// 		while (null !== tempNode.parent && nodePriority > tempNode.parent.priority) {
		// 			tempNode.swapWithParent();
		// 		}
		// 	}
		// }

		while (null !== node.parent && node.priority > node.parent.priority) {
			node.swapWithParent();
			if(null === node.parent){
				this.root = node;
			}
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
//
// let h;
// h = new MaxHeap();
//
// h.root = new Node(0, 10);
// h.root.appendChild(new Node(1, 5));
// h.root.appendChild(new Node(2, 7));
// h.root.left.appendChild(new Node(3, 20));
//
// /**
//  10                       20
//  /  \                     /  \
//  5    7  - shift up ->   10   7
//  /                        /
//  20                       5
//  **/
//
// h.parentNodes = [
// 	h.root.left,
// 	h.root.right,
// 	h.root.left.left,
// ];
//
// const newRoot = h.root.left.left;
// h.shiftNodeUp(h.root.left.left);
// let yyy = ((h.root)===(newRoot));
//
// let uuu = yyy;