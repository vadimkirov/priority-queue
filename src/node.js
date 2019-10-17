class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(null === this.left){
			this.left = node;
			this.left.parent = this;
		}else {
			if(null === this.right){
				this.right = node;
				this.right.parent = this;
			}
		}
	}

	removeChild(node) {
		if(this.left === node){
			this.left.parent = null;
			this.left = null;

		}else {
			if (this.right === node){
				this.right.parent = null;
				this.right = null;

			}else {
				throw new Error('not node to children')
			}
		}
	}

	remove() {
		if(null !== this.parent ){
			this.parent.removeChild(this);
		}
		this.data = null;
		this.priority = null;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	swapWithParent() {
		if(null === this.parent){

		}else{

			const oldParent = this.parent;
			const oldParentLeftChild = oldParent.left;
			const oldParentRightChild = oldParent.right;
			const oldChild = this;
			const oldChildLeft = this.left;
			const oldChildRight = this.right;
			const oldParentData = this.parent.data;
			const oldParentPriority = this.parent.priority;
			const newParentData = this.data;
			const newParentPriority = this.priority;
			const parentParent = this.parent.parent;

			if(null !== parentParent){
				parentParent.removeChild(oldParent);
			}


				this.parent.data = newParentData;
				this.parent.priority = newParentPriority;

				this.parent.parent = oldChild;

				this.parent.removeChild(this);

			this.data = oldParentData;
			this.priority = oldParentPriority;
			this.left = null;
			this.right = null;

			if(null !== oldParentRightChild){
				oldParentLeftChild.parent = this;
				oldParentRightChild.parent = this;
			}

			this.appendChild(oldParent);

			this.parent = parentParent;

			if(null !== parentParent){
				parentParent.appendChild(this);
			}

			if(null !== oldParentRightChild){
				this.appendChild(oldParentRightChild);
				oldParent.left = oldChildLeft;
				oldParent.right = oldChildRight;
			}

		}
	}
}

module.exports = Node;
