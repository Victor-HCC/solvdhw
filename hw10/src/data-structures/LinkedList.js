/**
 * Represents a single node in a linked list.
 */
class Node {
  /**
   * Creates a new node.
   * @param {any} key - The key associated with the node.
   * @param {any} value - The value stored in the node.
   * @param {Node|null} [next=null] - The next node in the linked list.
   */
  constructor(key, value, next = null) {
    this._key = key
    this._value = value
    this._next = next
  }

  /**
   * Gets the value of the node.
   * @return {any} The value of the node.
   */
  get value() {
    return this._value
  }

  /**
   * Sets the value of the node.
   * @param {any} value - The new value of the node.
   */
  set value(value) {
    this._value = value
  }

  /**
   * Gets the next node in the linked list.
   * @return {Node|null} The next node in the linked list.
   */
  get next() {
    return this._next
  }

  /**
   * Sets the next node in the linked list.
   * @param {Node|null} node - The next node in the linked list.
   */
  set next(node) {
    this._next = node
  }

  /**
   * Gets the key of the node.
   * @return {any} The key of the node.
   */
  get key() {
    return this._key
  }
}

/**
 * Represents a linked list data structure.
 */
class LinkedList {
  /**
   * Creates a new linked list.
   */
  constructor() {
    this._head = null
  }

  /**
   * Gets the head node of the linked list.
   * @return {Node|null} The head node of the linked list.
   */
  get head() {
    return this._head
  }

  /**
   * Sets the head node of the linked list.
   * @param {Node|null} node - The new head node of the linked list.
   */
  set head(node) {
    this._head = node
  }

  /**
   * Inserts a new node with the given key and value into the linked list.
   * If a node with the same key already exists, its value is updated.
   * @param {any} key - The key of the node to be inserted.
   * @param {any} value - The value of the node to be inserted.
   */
  insert(key, value) {
    const node = this.search(key)
    if(node) {
      node.value = value // Update the value if the key already exists
    } else {
      this.head = new Node(key, value, this.head) // Insert a new node at the beginning
    }
  }

  /**
   * Deletes the node with the given key from the linked list.
   * @param {any} key - The key of the node to be deleted.
   * @return {boolean} True if the node was deleted, false if the node was not found.
   */
  delete(key) {
    let current = this.head
    let previous = null

    while(current) {
      if(current.key === key) {
        if(previous) {
          previous.next = current.next
        } else {
          this.head = current.next
        }
        return true // Node deleted
      }
      previous = current
      current = current.next
    }

    return false // Node not found
  }

  /**
   * Searches for a node with the given key in the linked list.
   * @param {any} key - The key of the node to be searched.
   * @return {Node|null} The node with the given key, or null if not found.
   */
  search(key) {
    let current = this.head
    while(current) {
      if(current.key === key) {
        return current // Node found
      }
      current = current.next
    }

    return null // Node not found
  }
}

// Export the LinkedList class
module.exports = LinkedList
