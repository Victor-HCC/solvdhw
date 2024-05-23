/**
 * Represents a single node in a linked list.
 */
class Node {
  constructor(value) {
    this._value = value
    this._next = null
  }

  // Getter for the value of the node
  get value() {
    return this._value
  }

  // Setter for the value of the node
  set value(value) {
    this._value = value
  }

  // Getter for the next node in the linked list
  get next() {
    return this._next
  }

  // Setter for the next node in the linked list
  set next(node) {
    this._next = node
  }
}

/**
 * Represents a linked list data structure.
 */
class LinkedList {
  constructor() {
    this._head = null
    this._tail = null
  }

  // Getter for the head of the linked list
  get head() {
    return this._head
  }

  // Setter for the head of the linked list
  set head(node) {
    if(node instanceof Node || node === null) {
      this._head = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

  // Getter for the tail of the linked list
  get tail() {
    return this._tail
  }

  // Setter for the tail of the linked list
  set tail(node) {
    if(node instanceof Node || node === null) {
      this._tail = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

  /**
   * Inserts a new node with the given value at the end of the linked list.
   * @param {*} value - The value to be inserted.
   */
  insert(value) {
    const newNode = new Node(value)

    if(!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
  }

  /**
   * Deletes the first occurrence of a node with the given value from the linked list.
   * @param {*} value - The value to be deleted.
   */
  delete(value) {
    if(!this.head) {
      return
    }

    if(this.head.value === value) {
      this.head = this.head.next
      if(!this.head) {
        this.tail = null
      }
      return
    }

    let current = this.head

    while(current.next !== null) {
      if(current.next.value === value) {
        if(current.next === this.tail) {
          this.tail = current
        }
        current.next = current.next.next
        return
      }
      current = current.next
    }
  }

  /**
   * Searches for a node with the given value in the linked list.
   * @param {*} value - The value to be searched.
   * @returns {Node|string} - The found node or a message indicating the value was not found.
   */
  search(value) {
    let current = this.head
    while(current !== null) {
      if(current.value === value) return current
      current = current.next
    }

    return 'Not found'
  }
}

// Export the LinkedList class
module.exports = LinkedList
