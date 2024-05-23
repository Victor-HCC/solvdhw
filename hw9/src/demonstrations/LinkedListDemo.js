const LinkedList = require('../data-structures/LinkedList')

// Demo of LinkedList
const list = new LinkedList()

// Insert nodes into the list
list.insert(2)
list.insert(4)
list.insert(6)
list.insert(7)
list.insert(10)
list.insert(11)

console.log('Linked List after insertion:')
console.log(JSON.stringify(list, null, 2))

// Search for a value in the list
const searchValue = 7
const foundNode = list.search(searchValue)
console.log(`\nSearch for value ${searchValue}:`)
console.log(foundNode ? foundNode.value : 'Value not found')

// Delete a node from the list
const deleteValue = 6
console.log(`\nDelete node with value ${deleteValue}:`)
list.delete(deleteValue)
console.log(JSON.stringify(list, null, 2))