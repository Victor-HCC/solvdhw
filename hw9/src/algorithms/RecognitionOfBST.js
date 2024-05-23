// Import the required data structures
const BinarySearchTree = require('../data-structures/BinarySearchTree')
const BinaryTree = require('../data-structures/BinaryTree')

/**
 * Helper function to recursively check if a binary tree node satisfies the conditions of a BST.
 * @param {Node} node - The current node being checked.
 * @param {number} min - The minimum value that the node's value can take.
 * @param {number} max - The maximum value that the node's value can take.
 * @returns {boolean} - True if the subtree rooted at the current node is a valid BST, false otherwise.
 */
const isBSTAux = (node, min, max) => {
  // If the current node is null, it's a valid BST
  if(node === null) return true
  
  // Check if the node's value violates the BST property
  if(node.value <= min || node.value >= max) return false
  
  // Recursively check the left and right subtrees
  return isBSTAux(node.left, min, node.value) && isBSTAux(node.right, node.value, max)
}

/**
 * Function to check if a binary tree is a Binary Search Tree (BST).
 * @param {BinarySearchTree|BinaryTree} tree - The binary tree to be checked.
 * @returns {boolean} - True if the tree is a valid BST, false otherwise.
 */
const isBST = (tree) => {
  // Start the BST check from the root with minimum and maximum range as negative and positive infinity
  return isBSTAux(tree.root, -Infinity, Infinity)
}

// Create a Binary Search Tree (BST) instance
const bstTree = new BinarySearchTree()
bstTree.insert(10)
bstTree.insert(5)
bstTree.insert(15)
bstTree.insert(2)
bstTree.insert(12)
bstTree.insert(9)
bstTree.insert(20)

// Display the structure of the BST
console.log("Is the binary search tree a BST? (Expecting true):", isBST(bstTree))

// Create a Binary Tree instance
const tree = new BinaryTree()
tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(2)
tree.insert(12)
tree.insert(9)
tree.insert(20)
tree.insert(5)

// Display the structure of the Binary Tree
console.log("Is the binary tree a BST? (Expecting false):", isBST(tree))
