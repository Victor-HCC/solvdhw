const LinkedList = require('./LinkedList');

/**
 * Hash function to compute a hash value for a given string and limit.
 * @param {string} value - The string to be hashed.
 * @param {number} limit - The size limit of the hash table.
 * @return {number} The computed hash value.
 */
const hash = (value, limit) => {
  let aux = 117
  for(let i = 0; i < value.length; i++) {
    aux = aux * 27 ^ value.charCodeAt(i)
  }
  return Math.abs(aux % limit)
}

/**
 * Represents a hash table data structure.
 */
class HashTable {
  /**
   * Creates a new hash table.
   * @param {number} [limit=5] - The initial size limit of the hash table.
   */
  constructor(limit = 5) {
    this._limit = limit
    this._elements = {}
    this._size = 0
    this._loadFactorLimit = 0.75
  }

  /**
   * Gets the elements of the hash table.
   * @return {object} The elements of the hash table.
   */
  get elements() {
    return this._elements;
  }

  /**
   * Gets the size limit of the hash table.
   * @return {number} The size limit of the hash table.
   */
  get limit() {
    return this._limit;
  }

  /**
   * Inserts a key-value pair into the hash table.
   * @param {string} key - The key of the element to be inserted.
   * @param {any} value - The value of the element to be inserted.
   */
  insert(key, value) {
    // Resize the table if load factor exceeds the limit
    if(this._size / this.limit >= this._loadFactorLimit) {
      this._resize()
    }

    const index = hash(key, this.limit)

    if(!this.elements[index]) {
      this._elements[index] = new LinkedList()
    }

    this._elements[index].insert(key, value)
    this._size++
  }

  /**
   * Retrieves the value associated with the given key in the hash table.
   * @param {string} key - The key of the element to be retrieved.
   * @return {any|null} The value associated with the key, or null if not found.
   */
  retrieveByKey(key) {
    const index = hash(key, this.limit)
    if(this.elements[index]) {
      const node = this.elements[index].search(key)
      return node ? node.value : null
    }
    return null
  }

  /**
   * Deletes the element with the given key from the hash table.
   * @param {string} key - The key of the element to be deleted.
   * @return {boolean} True if the element was deleted, false if not found.
   */
  delete(key) {
    const index = hash(key, this.limit)
    if(this.elements[index] && this.elements[index].delete(key)) {
      this._size--
      return true
    }
    return false
  }

  /**
   * Resizes the hash table when the load factor exceeds the limit.
   * Doubles the size of the table and rehashes all existing elements.
   */
  _resize() {
    const oldElements = this._elements
    this._limit *= 2
    this._elements = {}
    this._size = 0

    for(let index in oldElements) {
      let current = oldElements[index].head
      while(current) {
        this.insert(current.key, current.value)
        current = current.next
      }
    }
  }
}

module.exports = { HashTable, hash}


