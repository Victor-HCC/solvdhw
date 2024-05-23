const Graph = require('../data-structures/Graph')

// Demo of Graph
const graph = new Graph()

// Add nodes
graph.addNode('A')
graph.addNode('B')
graph.addNode('C')
graph.addNode('D')
graph.addNode('E')

// Add edges
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('B', 'D')
graph.addEdge('C', 'E')
graph.addEdge('D', 'E')

//         A----C
//         |    | 
//         B    E
//         |   /
//         |  /
//         | /
//         D 
//

// Display the adjacency list
console.log('Adjacency List:')
console.log(graph.adjacencyList)

// Perform DFS starting from node 'A'
const dfsResult = graph.depthFirstSearch('A')
console.log('\nDepth-First Search starting from node A:')
console.log(dfsResult)

// Perform BFS starting from node 'A'
const bfsResult = graph.breadthFirstSearch('A')
console.log('\nBreadth-First Search starting from node A:')
console.log(bfsResult)