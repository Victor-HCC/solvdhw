/**
 * Represents a graph data structure using adjacency list representation.
 */
class Graph {
  constructor() {
    this._adjacencyList = {}
  }

  // Getter for the adjacency list
  get adjacencyList() {
    return this._adjacencyList
  }

  /**
   * Adds a new node to the graph.
   * @param {*} node - The node to be added.
   */
  addNode(node) {
    if(!this.adjacencyList[node]) {
      this._adjacencyList[node] = []
    }
  }

  /**
   * Adds an edge between two nodes in the graph.
   * @param {*} node1 - The first node.
   * @param {*} node2 - The second node.
   */
  addEdge(node1, node2) {
    if(!this.adjacencyList[node1]) {
      this.addNode(node1)
    }
    if(!this.adjacencyList[node2]) {
      this.addNode(node2)
    }

    this.adjacencyList[node1].push(node2)
    this.adjacencyList[node2].push(node1)
  }

  /**
   * Performs a depth-first search (DFS) traversal starting from the given node.
   * @param {*} start - The starting node for the traversal.
   * @param {Set} visited - Set to keep track of visited nodes (default is an empty set).
   * @returns {Array} - Array containing the nodes visited during DFS traversal.
   */
  depthFirstSearch(start, visited = new Set()) {
    visited.add(start)
    const result = [start]

    for(let neighbor of this.adjacencyList[start]) {
      if(!visited.has(neighbor)) {
        result.push(...this.depthFirstSearch(neighbor, visited))
      }
    }

    return result
  }

  /**
   * Performs a breadth-first search (BFS) traversal starting from the given node.
   * @param {*} start - The starting node for the traversal.
   * @returns {Array} - Array containing the nodes visited during BFS traversal.
   */
  breadthFirstSearch(start) {
    const queue = [start]
    const result = []
    const visited = new Set()

    visited.add(start)
    while(queue.length > 0) {
      const current = queue.shift()
      result.push(current)
      for(let neighbor of this.adjacencyList[current]) {
        if(!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }

    return result
  }
}

// Export the Graph class
module.exports = Graph
