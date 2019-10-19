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
        this.countSize++;
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





        if(this.parentNodes.length > 0 && null !== this.parentNodes[0].parent){
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
        return this.countSize + 1;
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
        if(null !== this.root && node.priority < this.root.priority && this.parentNodes[0] !== this.root ){
            this.parentNodes.unshift(this.root);
        }
        let nodePriorityMore = (node.left.priority < node.right.priority)? node.right : node.left ;


        while (node.priority < nodePriorityMore.priority) {
            const nodeData = node;
            let changeNode = false;
            const nodeLeaf = nodePriorityMore;
            let changeNodeLeaf = false;
            nodePriorityMore.swapWithParent();
            if(null === nodePriorityMore.parent) {
                this.root = nodePriorityMore;

                for(let i =0; i < this.parentNodes.length; i++) {
                    if (!changeNodeLeaf && this.parentNodes.length > 2 && nodeLeaf === this.parentNodes[i]) {
                        //this.parentNodes[i] = nodeParen;
                        this.parentNodes.splice(i,1);
                        changeNodeLeaf = true;

                    }
                }


            }


            // for(let i =0; i < this.parentNodes.length; i++) {
            //     if (!changeNode && nodeData === this.parentNodes[i]) {
            //         this.parentNodes[i] = nodeParen;
            //
            //         changeNode = true;
            //         break;
            //
            //     }
            // }
            // for(let i =0; i < this.parentNodes.length; i++) {
            //     if(!changeNodeParent && this.parentNodes.length <= 2  && nodeParen === this.parentNodes[i]){
            //         this.parentNodes[i]=nodeData;
            //         changeNodeParent = true;
            //         break;
            //     }
            //
            //     if(!changeNodeParent && node !== this.root  && nodeParen === this.parentNodes[i]){
            //         this.parentNodes[i]=nodeData;
            //         changeNodeParent = true;
            //         break;
            //     }
            // }
            //
            // if(this.parentNodes[0] === this.parentNodes[1]){
            //     this.parentNodes.shift();
            // }

            if(null !== node.left  && null !== node.right) {
                nodePriorityMore = (node.left.priority < node.right.priority) ? node.right : node.left;
            }else {
                if(null !== node.left){
                    nodePriorityMore = node.left
                } else {
                    if (null !== node.right) {
                        nodePriorityMore = node.right;
                    }else {
                        break;
                    }

                }
            }
        }


    }


    swap(indexOne, indexTwo) {
        const tmp = this.parentNodes[indexTwo];
        this.parentNodes[indexTwo] = this.parentNodes[indexOne];
        this.parentNodes[indexOne] = tmp;
    }



}

module.exports = MaxHeap;

// let h;
// h = new MaxHeap();
//
// h.root = new Node(0, 3);
// h.root.appendChild(new Node(1, 20));
// h.root.appendChild(new Node(2, 7));
// h.root.left.appendChild(new Node(3, 5));
//
// /**
//  3                        20
//  /  \                      /  \
//  20    7  - shift down ->   5    7
//  /                          /
//  5                          3
//  **/
//
// h.parentNodes = [
//     h.root.left,
//     h.root.right,
//     h.root.left.left,
// ];
//
// const newRoot = h.root.left;
// const newDeepest = h.root;
//
// h.shiftNodeDown(h.root);
// let yyy = (h.root)===(newRoot);
// yyy = (h.root.left.left)===(newDeepest);
//
// let uu = 'hhh'