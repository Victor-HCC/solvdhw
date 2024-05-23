// Import the Stack data structure
const Stack = require('../data-structures/Stack')

/**
 * Represents a Stack that keeps track of both the minimum and maximum elements.
 * Extends the functionality of the base Stack class.
 */
class MinMaxStack extends Stack {
  constructor() {
    // Call the constructor of the base Stack class
    super()
    // Initialize arrays to track minimum and maximum elements
    this._minStack = []
    this._maxStack = []
  }

  /**
   * Adds an element to the stack and updates the min and max stacks accordingly.
   * @param {*} element - The element to be pushed onto the stack.
   */
  push(element) {
    // Call the push method of the base Stack class
    super.push(element)

    // Update the min stack with the new minimum element
    if(this._minStack.length === 0 || element < this.getMin()) {
      this._minStack.push(element)
    } else {
      this._minStack.push(this.getMin())
    }

    // Update the max stack with the new maximum element
    if(this._maxStack.length === 0 || element > this.getMax()) {
      this._maxStack.push(element)
    } else {
      this._maxStack.push(this.getMax())
    }
  }

  /**
   * Removes the top element from the stack and updates the min and max stacks accordingly.
   * @returns {*} - The removed element from the stack.
   */
  pop() {
    // Remove the top elements from the min and max stacks
    this._minStack.pop()
    this._maxStack.pop()
    // Call the pop method of the base Stack class and return the removed element
    return super.pop()
  }

  /**
   * Gets the minimum element from the stack.
   * @returns {*} - The minimum element in the stack.
   */
  getMin() {
    // Return the top element of the min stack
    return this._minStack[this._minStack.length - 1]
  }

  /**
   * Gets the maximum element from the stack.
   * @returns {*} - The maximum element in the stack.
   */
  getMax() {
    // Return the top element of the max stack
    return this._maxStack[this._maxStack.length - 1]
  }
}

