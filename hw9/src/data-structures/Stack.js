class Stack {
  constructor() {
    this._stack = [];
  }

  get elements() {
    return this._stack
  }

  get size() {
    return this._stack.length
  }

  push(element) {
    this._stack.push(element);
  }

  pop() {
    return this._stack.pop();
  }

  peek() {
    return this._stack[this.size - 1];
  }
}

export default Stack