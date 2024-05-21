class Node {
  constructor(value) {
    this._value = value
    this._next = null
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }

  get next() {
    return this._next
  }

  set next(node) {
    this._next = node
  }

}

class LinkedList {
  constructor() {
    this._head = null
    this._tail = null
  }

  get head() {
    return this._head
  }

  set head(node) {
    if(node instanceof Node || null) {
      this._head = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

  get tail() {
    return this._tail
  }

  set tail(node) {
    if(node instanceof Node || null) {
      this._tail = node
    } else {
      throw new Error('The node must be an instance of Node or null.')
    }
  }

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

  delete(value) {
    if (!this.head) {
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

  search(value) {
    let current = this.head
    while(current !== null) {
      if(current.value === value) return current
      current = current.next
    }

    return 'Not found'
  }
}

const list = new LinkedList()
list.insert(2)
list.insert(4)
list.insert(6)
list.insert(7)
list.insert(10)
list.insert(11)
console.log(list);
console.log(list.search(7));
list.delete(11)
console.log(list);
