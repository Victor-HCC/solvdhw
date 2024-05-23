/**
 * Represents a stack data structure.
 */
class Stack {
  constructor() {
    // Initialize the stack as an empty array
    this._stack = [];
  }

  // Getter for accessing the elements of the stack
  get elements() {
    return this._stack
  }

  // Getter for retrieving the size of the stack
  get size() {
    return this._stack.length
  }

  /**
   * Adds an element to the top of the stack.
   * @param {*} element - The element to be added to the stack.
   */
  push(element) {
    this._stack.push(element);
  }

  /**
   * Removes and returns the element at the top of the stack.
   * @returns {*} - The element removed from the top of the stack.
   */
  pop() {
    return this._stack.pop();
  }

  /**
   * Retrieves the element at the top of the stack without removing it.
   * @returns {*} - The element at the top of the stack.
   */
  peek() {
    return this._stack[this.size - 1];
  }
}

// Export the Stack class
module.exports = Stack
