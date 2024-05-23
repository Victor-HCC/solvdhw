/**
 * Represents a node in a binary tree.
 */
class Node {
  constructor(value, left = null, right = null) {
    this._value = value
    this._left = left
    this._right = right
  }

  // Getters for node value, left child, and right child
  get value() {
    return this._value
  }

  get left() {
    return this._left
  }

  get right() {
    return this._right
  }

  // Setters for left and right child nodes, with validation
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

  /**
   * Inserts a new value into the binary tree rooted at this node.
   * @param {*} value - The value to be inserted.
   */
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

  /**
   * Searches for a value in the binary tree rooted at this node.
   * @param {*} value - The value to search for.
   * @returns {Node|null} - The node containing the value if found, otherwise null.
   */
  search(value) {
    if(this.value === value) {
      return this
    } else if(this.value > value && this.left !== null) {
      return this.left.search(value)
    } else if(this.value < value && this.right !== null) {
      return this.right.search(value)
    } else {
      return null // Value not found
    }
  }
}

/**
 * Represents a binary search tree.
 */
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  // Getter and setter for the root node of the tree, with validation
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

  /**
   * Inserts a new value into the binary search tree.
   * @param {*} value - The value to be inserted.
   */
  insert(value) {
    if(this._root === null) {
      this._root = new Node(value)
    } else {
      this._root.insert(value);
    }
  }
  
  /**
   * Searches for a value in the binary search tree.
   * @param {*} value - The value to search for.
   * @returns {Node|null} - The node containing the value if found, otherwise null.
   */
  search(value) {
    if(this._root === null) {
      return null
    } else {
      return this._root.search(value)
    }
  }

  /**
   * Traverses the binary search tree in in-order.
   * @param {Node} node - The current node being visited (default is the root).
   * @param {Array} result - An array to store the traversal result (default is an empty array).
   * @returns {Array} - The result of the in-order traversal.
   */
  traversingInOrder(node = this.root, result = []) {
    if(node !== null) {
      if(node.left) this.traversingInOrder(node.left, result)
      result.push(node.value)
      if(node.right) this.traversingInOrder(node.right, result)
    }
    return result;
  }

  /**
   * Traverses the binary search tree in pre-order.
   * @param {Node} node - The current node being visited (default is the root).
   * @param {Array} result - An array to store the traversal result (default is an empty array).
   * @returns {Array} - The result of the pre-order traversal.
   */
  traversingPreOrder(node = this.root, result = []) {
    if(node !== null) {
      result.push(node.value)
      if(node.left) this.traversingPreOrder(node.left, result)
      if(node.right) this.traversingPreOrder(node.right, result)
    }
    return result;
  }

  /**
   * Traverses the binary search tree in post-order.
   * @param {Node} node - The current node being visited (default is the root).
   * @param {Array} result - An array to store the traversal result (default is an empty array).
   * @returns {Array} - The result of the post-order traversal.
   */
  traversingPostOrder(node = this.root, result = []) {
    if(node !== null) {
      if(node.left) this.traversingPostOrder(node.left, result)
      if(node.right) this.traversingPostOrder(node.right, result)
      result.push(node.value)
    }
    return result;
  }

}

// Export the BinarySearchTree class
module.exports = BinarySearchTree
