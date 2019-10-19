const Node = require('./node');
class MaxHeap {

    constructor() {
        this.root = null;
        this.parentNodes = [];

        this.countSize = 0;
        this.itemForIestoreRootFromLastInsertedNode=null;
    }

    push(data, priority) {
        let newNode = new Node(data, priority);
        this.insertNode(newNode);
        this.shiftNodeUp(newNode);


    }

    pop() {
        if(!this.isEmpty()) {

            this.restoreRootFromLastInsertedNode(this.detachRoot());
            this.shiftNodeDown(this.root);

            return this.root.data;
        }
    }

    detachRoot() {

        const rez = this.parentNodes.shift();
        this.countSize --;
        if(null !== rez.left) {
            rez.left.parent = null;
            rez.left = null;
        }
        if(null !== rez.right) {
            rez.right.parent = null;
            rez.right = null;
        }
        if(null !== rez.parent){
            if(rez.parent.left === rez){
                rez.parent.left = null;
            }else {
                rez.parent.right = null;
            }
            rez.parent = null;
        }
        this.root = null
        return rez;
    }

    restoreRootFromLastInsertedNode(detached) {
        this.root = this.parentNodes.pop();

        this.root.parent = null;
        this.root.left = null;
        this.root.right = null;


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

                for(let i =0; i < this.parentNodes.length; i++) {
                    if (!changeNode && this.parentNodes.length > 2 && nodeData === this.parentNodes[i]) {
                        this.parentNodes.splice(i,1);
                        changeNode = true;
                    }
                }
            }
            if(changeNode)break;

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

        let nodePriorityMore;

        if(null !== node.left  && null !== node.right) {
            nodePriorityMore = (node.left.priority < node.right.priority) ? node.right : node.left;
        }else {
            if(null !== node.left){
                nodePriorityMore = node.left
            } else {
                if (null !== node.right) {
                    nodePriorityMore = node.right;
                }else {
                    return;
                }

            }
        }

        while (node.priority < nodePriorityMore.priority) {
            const nodeData = node;
            let changeNode = false;
            const nodeLeaf = nodePriorityMore;
            let changeNodeLeaf = false;
            nodePriorityMore.swapWithParent();
            if(null === nodePriorityMore.parent) {
                this.root = nodePriorityMore;

                if (this.parentNodes.length > 2) {
                    changeNode = true;
                }
            }

            let changeNowNotRewrite = -1;
            for(let i =0; i < this.parentNodes.length; i++) {

                if (!changeNodeLeaf && nodeLeaf === this.parentNodes[i]) {
                    this.parentNodes[i] = nodeData;

                    changeNodeLeaf = true;
                    changeNowNotRewrite = i;
                    break;

                }
            }

            for(let i =0; i < this.parentNodes.length; i++) {
                if (!changeNode && nodeData === this.parentNodes[i] && changeNowNotRewrite !== i) {
                    this.parentNodes[i] = nodeLeaf;
                    changeNode = true;
                    break;
                }
            }

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
}

module.exports = MaxHeap;
