class Queue {
  constructor() {
    this._queue = []
  }

  get elements() {
    return this._queue
  }

  get size() {
    return this._queue.length
  }

  enqueue(element) {
    this._queue.push(element)
  }

  dequeue() {
    return this._queue.shift()
  }

  peek() {
    return this._queue[0]
  }
}

export default Queue