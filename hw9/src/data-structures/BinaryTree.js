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

}

/**
 * Represents a binary tree.
 */
class BinaryTree {
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
   * Inserts a new value into the binary tree.
   * @param {*} value - The value to be inserted.
   */
  insert(value) {
    const newNode = new Node(value)
    if(this._root === null) {
      this._root = newNode
      return;
    }

    const queue = [this.root]
    while(queue.length > 0) {
      const current = queue.shift()

      if(current.left === null) {
        current.left = newNode
        return;
      } else {
        queue.push(current.left)
      }

      if(current.right === null) {
        current.right = newNode
        return;
      } else {
        queue.push(current.right)
      }
    }
  }
  
  /**
   * Searches for a value in the binary tree.
   * @param {*} value - The value to search for.
   * @returns {Node|null} - The node containing the value if found, otherwise null.
   */
  search(value) {
    if(this._root === null) {
      return null
    }

    const queue = [this.root]
    while(queue.length > 0) {
      const current = queue.shift()
      if(current.value === value) {
        return current
      }

      if(current.left !== null) {
        queue.push(current.left)
      }

      if(current.right !== null) {
        queue.push(current.right)
      }
    }

    return null //Value not found
  }

  /**
   * Traverses the binary tree in in-order.
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
   * Traverses the binary tree in pre-order.
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
   * Traverses the binary tree in post-order.
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

// Export the BinaryTree class
module.exports = BinaryTree
