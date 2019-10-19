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

	    this.countSize = 0;
	    this.itemForIestoreRootFromLastInsertedNode=null;

        
        this.compare = comparator;
	}

	push(data, priority) {
	    let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);

	}

	pop() {
        if(!this.isEmpty()) {

            const rez = this.detachRoot();
             this.restoreRootFromLastInsertedNode(rez);
             // this.shiftNodeDown(this.root);
            this.countSize--;
            return rez;
        }
	}

	detachRoot() {

       const rez = this.parentNodes.shift();
       this.countSize --;
       if(null !== rez.left) rez.left.parent = null;
       if(null !== rez.right) rez.right.parent = null;
        if(this.root !== rez){
        this.countSize--;
        }
        this.root = null
		return rez;
	}

	restoreRootFromLastInsertedNode(detached) {
	    const lNode = this.parentNodes.pop();

	     this.root = lNode;
	     this.root.parent = null;


	     this.root.left = null;
	     this.root.right = null;

       // this.insertNode(detached);
       //
       //      for (let i = 0; i < this.parentNodes.length; i++) {
       //          let insertNode = this.parentNodes[i];
       //          if (null === insertNode.left || null === insertNode.right) {
       //              insertNode.appendChild(node);
       //              this.parentNodes.push(node);
       //              if(null !== insertNode.right  && this.parentNodes.length > 2){
       //                  this.parentNodes.shift();
       //              }
       //              break;
       //          }
       //
       //      }
       //





       if(this.parentNodes.length > 0 && null !== this.parentNodes[0]){
           let leftChild = this.parentNodes[0].parent;

           leftChild.parent = null;
           this.root.appendChild(leftChild);
       }

        if(this.parentNodes.length > 1 && null !== this.parentNodes[1].parent){
            let rightChild = this.parentNodes[1].parent;
            rightChild.parent = null;
            this.root.appendChild(rightChild);
        }

        if(this.parentNodes.length === 0){
            detached.parent = null;
            this.root.appendChild(detached);
            this.parentNodes[0] = detached;
            this.countSize++;
            this.parentNodes.unshift(this.root);
        } else {

            let parentNodesSizeNeed = Math.ceil((this.countSize + 1) / 2);
            let needElementToParentNodesSizeNeed = parentNodesSizeNeed - this.parentNodes.length;
            if (1 === needElementToParentNodesSizeNeed) {
                this.parentNodes.unshift(detached);
            }
            if (2 === needElementToParentNodesSizeNeed) {
                this.parentNodes.unshift(detached);
                this.parentNodes.unshift(this.itemForIestoreRootFromLastInsertedNode);
            }
        }

	}

	size() {
		return this.countSize;
	}

	isEmpty() {
		return !this.countSize;
	}
	

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
		this.countSize = 0;
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
					this.parentNodes.push(node);
					if(null !== insertNode.right  && this.parentNodes.length > 2){
                        this.itemForIestoreRootFromLastInsertedNode = this.parentNodes.shift();
					}
					break;
				}

			}
		}
		this.countSize++;
	}

	shiftNodeUp(node) {
        // let forSplice = null;
        if(null !== this.root && node.priority > this.root.priority && this.parentNodes[0] !== this.root ){
            this.parentNodes.unshift(this.root);
        }
		while (null !== node.parent && node.priority > node.parent.priority) {

		    const nodeData = node;
		    let changeNode = false;
		    const nodeParen = node.parent;
		    let changeNodeParent = false;
			node.swapWithParent();
			if(null === node.parent){
				this.root = node;
                // this.parentNodes.shift();
                for(let i =0; i < this.parentNodes.length; i++) {
                    if (!changeNode && this.parentNodes.length > 2 && nodeData === this.parentNodes[i]) {
                        //this.parentNodes[i] = nodeParen;
                        this.parentNodes.splice(i,1);
                        changeNode = true;

                    }
                }
			}


			for(let i =0; i < this.parentNodes.length; i++) {
                if (!changeNode && nodeData === this.parentNodes[i]) {
                    this.parentNodes[i] = nodeParen;

                    changeNode = true;
                    break;

                }
            }
            for(let i =0; i < this.parentNodes.length; i++) {
            if(!changeNodeParent && this.parentNodes.length <= 2  && nodeParen === this.parentNodes[i]){
                    this.parentNodes[i]=nodeData;
                    changeNodeParent = true;
                    break;
                }

			    if(!changeNodeParent && node !== this.root  && nodeParen === this.parentNodes[i]){
                    this.parentNodes[i]=nodeData;
                    changeNodeParent = true;
                    break;
                }
            }

                if(this.parentNodes[0] === this.parentNodes[1]){
                    this.parentNodes.shift();
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

// module.exports = MaxHeap;

 let h = new MaxHeap();
// /h = new MaxHeap();

h.push(42, 15);
h.push(14, 32);
h.push(0, 0);
h.push(14,14);
h.push(13,13);
h.push(16,16);
h.push(12,12);

/**
 32                             12
 /  \                           /  \
 15    16   - restoreRoot ->    15   16
 /  \  /  \                    /  \  /
 14  13  0   12                14  13  0
 **/

const detached = h.detachRoot();
h.restoreRootFromLastInsertedNode(detached);

let iii=(h.parentNodes.map(n=>n.priority)); //.to.deep.equal([16,14,13,0]);


let uu = 'hhh'