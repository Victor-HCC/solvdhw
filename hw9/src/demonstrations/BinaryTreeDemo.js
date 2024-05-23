const BinaryTree = require('../data-structures/BinaryTree')

// Demo of BinaryTree
const tree = new BinaryTree()

// Insert nodes into the tree
tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(3)
tree.insert(8)
tree.insert(20)

//          10
//        /   \
//       6     15
//      / \    / 
//     3   8  20  

console.log('Binary Tree after inserting nodes:')
console.log(JSON.stringify(tree, null, 2))

// Search for a value in the tree
const searchValue = 8
const foundNode = tree.search(searchValue)
console.log(`\nSearch for value ${searchValue}:`)
console.log(foundNode ? foundNode.value : 'Value not found')

// Perform in-order traversal
const inOrderTraversal = tree.traversingInOrder()
console.log('\nIn-order Traversal:')
console.log(inOrderTraversal)

// Perform pre-order traversal
const preOrderTraversal = tree.traversingPreOrder()
console.log('\nPre-order Traversal:')
console.log(preOrderTraversal)

// Perform post-order traversal
const postOrderTraversal = tree.traversingPostOrder()
console.log('\nPost-order Traversal:')
console.log(postOrderTraversal)