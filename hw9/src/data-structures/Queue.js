/**
 * Represents a queue data structure.
 */
class Queue {
  constructor() {
    // Initialize the queue as an empty array
    this._queue = []
  }

  // Getter for accessing the elements of the queue
  get elements() {
    return this._queue
  }

  // Getter for retrieving the size of the queue
  get size() {
    return this._queue.length
  }

  /**
   * Adds an element to the end of the queue.
   * @param {*} element - The element to be added to the queue.
   */
  enqueue(element) {
    this._queue.push(element)
  }

  /**
   * Removes and returns the element at the front of the queue.
   * @returns {*} - The element removed from the front of the queue.
   */
  dequeue() {
    return this._queue.shift()
  }

  /**
   * Retrieves the element at the front of the queue without removing it.
   * @returns {*} - The element at the front of the queue.
   */
  peek() {
    return this._queue[0]
  }
}

// Export the Queue class
module.exports = Queue
