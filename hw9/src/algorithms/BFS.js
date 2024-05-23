/**
 * Finds the shortest path between two nodes in a graph using Breadth-First Search (BFS).
 * @param {Graph} graph - The graph object containing the adjacency list representation.
 * @param {string} nodeA - The starting node.
 * @param {string} nodeB - The target node.
 * @returns {number|string} - The shortest distance between the nodes or 'No path' if no path exists.
 */
const shortestPathBFS = (graph, nodeA, nodeB) => {
  // Get the adjacency list from the graph
  const graphAux = graph.adjacencyList;
  
  // Initialize a queue with the starting node and its distance
  const queue = [[nodeA, 0]];

  // Initialize a set to keep track of visited nodes
  const visited = new Set([nodeA]);

  // Continue BFS until the queue is empty
  while(queue.length > 0) {
    // Dequeue the node and its distance from the queue
    const [node, distance] = queue.shift();
    
    // If the dequeued node is the target node, return the distance
    if(node === nodeB) return distance;

    // Iterate over the neighbors of the dequeued node
    for(let neighbor of graphAux[node]) {
      // If the neighbor has not been visited, mark it as visited and enqueue it with distance + 1
      if(!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  // If no path exists between the nodes, return 'No path'
  return 'No path';
}
