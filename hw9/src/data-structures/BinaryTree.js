class Node {
  constructor(value, left = null, right = null) {
    this._value = value
    this._left = left
    this._right = right
  }

  get value() {
    return this._value
  }

  get left() {
    return this._left
  }

  get right() {
    return this._right
  }

  set left(node) {
    if(node instanceof Node || node === null) {
      this._left = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

  set right(node) {
    if(node instanceof Node || node === null) {
      this._right = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

  insert(value) {
    if(value < this.value) {
      if(this.left === null) {
        this.left = new Node(value)
      } else {
        this.left.insert(value)
      }
    } else if(value > this.value) {
      if(this.right === null) {
        this.right = new Node(value)
      } else {
        this.right.insert(value)
      }
    } else {
      console.log(`The value ${value} is already added.`);
    }
  }

  search(value) {
    if(this.value === value) {
      return this
    } else if(this.value > value && this.left !== null) {
      return this.left.search(value)
    } else if(this.value < value && this.right !== null) {
      return this.right.search(value)
    } else {
      return null //Value not found
    }
  }
}

class BinaryTree {
  constructor() {
    this._root = null
  }

  get root() {
    return this._root
  }

  set root(node) {
    if(node instanceof Node || node === null) {
      this._root = node
    } else {
      throw new Error('The root must be an instance of Node or null.')
    }
  }

  insert(value) {
    if (this._root === null) {
      this._root = new Node(value)
    } else {
      this._root.insert(value);
    }
  }
  
  search(value) {
    if (this._root === null) {
      return null
    } else {
      return this._root.search(value)
    }
  }

  traversingInOrder(node = this.root, result = []) {
    if(node !== null) {
      if(node.left) this.traversingInOrder(node.left, result)
      result.push(node.value)
      if(node.right) this.traversingInOrder(node.right, result)
    }
    return result;
  }

  traversingPreOrder(node = this.root, result = []) {
    if(node !== null) {
      result.push(node.value)
      if(node.left) this.traversingPreOrder(node.left, result)
      if(node.right) this.traversingPreOrder(node.right, result)
    }
    return result;
  }

  traversingPostOrder(node = this.root, result = []) {
    if(node !== null) {
      if(node.left) this.traversingPostOrder(node.left, result)
      if(node.right) this.traversingPostOrder(node.right, result)
      result.push(node.value)
    }
    return result;
  }

  
}


const tree = new BinaryTree()
tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(2)
tree.insert(12)
tree.insert(9)
tree.insert(20)
tree.insert(5)

//          10
//        /   \
//       5    15
//      / \   / \
//     2  9  12  20
//

console.log(tree);

console.log(tree.search(5))

console.log(tree.traversingInOrder());
console.log(tree.traversingPreOrder());
console.log(tree.traversingPostOrder());