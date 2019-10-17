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
		return this.parentNodes.length;
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
        while ( null !== node.parent && node.priority > node.parent.priority){
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
// let h = new MaxHeap();
// let rez;
//
// const nodes = [
// 	new Node(0, 0),
// 	new Node(1, 1),
// 	new Node(2, 2),
// 	new Node(3, 3),
// 	new Node(4, 4),
// 	new Node(5, 5),
// 	new Node(6, 6),
// ];
//
// h.insertNode(nodes[0]);
// // rez =(h.parentNodes[0]); // .to.equal(nodes[0]);
//
// h.insertNode(nodes[1]);
// // rez =(h.parentNodes[0]); //.to.equal(nodes[0]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[1]);
//
// h.insertNode(nodes[2]);
// // rez =(h.parentNodes[0]); //.to.equal(nodes[1]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[2]);
//
// h.insertNode(nodes[3]);
// // rez =(h.parentNodes[0]); //.to.equal(nodes[1]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[2]);
// // rez =(h.parentNodes[2]); //.to.equal(nodes[3]);
//
// h.insertNode(nodes[4]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[2]);
// // rez =(h.parentNodes[2]); //.to.equal(nodes[3]);
// // rez =(h.parentNodes[3]); //.to.equal(nodes[4]);
//
// h.insertNode(nodes[5]);
// // rez =(h.parentNodes[0]); //.to.equal(nodes[2]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[3]);
// // rez =(h.parentNodes[2]); //.to.equal(nodes[4]);
// // rez =(h.parentNodes[3]); //.to.equal(nodes[5]);
//
// h.insertNode(nodes[6]);
// // rez =(h.parentNodes[0]); //.to.equal(nodes[3]);
// // rez =(h.parentNodes[1]); //.to.equal(nodes[4]);
// // rez =(h.parentNodes[2]); //.to.equal(nodes[5]);
// // rez =(h.parentNodes[3]); //.to.equal(nodes[6]);
//
// //
// // let rez = (h.root === nodes[0]);
// // //
// // let yyy = rez;
// // rez= (h.root.left)===(nodes[1]);
// // yyy = rez;
// // rez=(h.root.right)===(nodes[2]);
// // yyy = rez;
// // rez=(h.root.left.left)===(nodes[3]);
// // yyy = rez;
// // rez=(h.root.left.right)===(nodes[4]);
//
//
//  yyy = rez;
// let uuu ='hhhhhhhhh';