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
		if(null !== this.parent){
			const
				oldParent = this.parent,
				oldParentLeftChild = this.parent.left,
				oldParentRightChild = this.parent.right,
				oldParentParent = this.parent.parent,


				newParentLeftChild = this.left,
				newParentRightChild = this.right;
				// newParentParent = this.parent;


			if(null !== oldParentParent){
				if(oldParentParent.left === oldParent){
					oldParentParent.left = this;
				}else {
					oldParentParent.right = this;
				}
			}

			this.parent.left = null;
			this.parent.right = null;
			if(null !== newParentLeftChild) this.parent.appendChild(newParentLeftChild);
			if(null !== newParentRightChild) this.parent.appendChild(newParentRightChild);

			this.left = null;
			if(null !==oldParentLeftChild) {
				if (oldParentLeftChild === this) {
					this.appendChild(oldParent);
				} else {
					this.appendChild(oldParentLeftChild);
				}
			}

			this.right = null;
			if(null !== oldParentRightChild){
				if (oldParentRightChild === this){
					this.appendChild(oldParent);
				}else {
					this.appendChild(oldParentRightChild);
				}

			}

			this.parent = oldParentParent;


		}

	}
}

module.exports = Node;
