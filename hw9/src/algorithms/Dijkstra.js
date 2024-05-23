/**
 * Finds the shortest path between two nodes in a graph using Dijkstra's algorithm.
 * 
 * @param {Object} graph - The graph represented as an adjacency list.
 * @param {string} nodeA - The starting node.
 * @param {string} nodeB - The target node.
 * @returns {Array} - An array representing the shortest path from nodeA to nodeB.
 */
const shortestPathDijkstra = (graph, nodeA, nodeB) => {
  // Initialize the distances object to store the shortest distance to each node from nodeA
  const distances = {}
  // Initialize the previous object to store the previous node for each node in the path
  const previous = {}
  // Initialize the unvisited set to store all unvisited nodes
  const unvisited = new Set()

  // Set initial distances to Infinity and 0 for the starting node
  for(let node in graph) {
    distances[node] = node === nodeA ? 0 : Infinity // Distance to start node is 0, to others is Infinity
    previous[node] = null // No previous node initially
    unvisited.add(node) // Add all nodes to the unvisited set
  }

  // Main loop to process each node
  while(unvisited.size) {
    // Find the unvisited node with the smallest distance
    let closestNode = null
    for(let node of unvisited) {
      if(!closestNode || distances[node] < distances[closestNode]) {
        closestNode = node // Update closestNode if current node has a smaller distance
      }
    }

    // If the smallest distance is Infinity, remaining nodes are not reachable from nodeA
    if(distances[closestNode] === Infinity) break

    // If the target node is reached , exit the loop
    if(closestNode === nodeB) break

    // Update distances for the neighbors of the closest node
    for(let neighbor in graph[closestNode]) {
      let newDistance = distances[closestNode] + graph[closestNode][neighbor] // Calculate new distance to neighbor
      // If a shorter path to the neighbor is found, update the distance and previous node
      if(newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance // Update shortest distance to neighbor
        previous[neighbor] = closestNode // Update previous node for neighbor
      }
    }

    // Remove the processed node from the unvisited set
    unvisited.delete(closestNode)
  }

  // Reconstruct the shortest path from nodeB to nodeA
  let path = []
  let node = nodeB
  while(node) {
    path.push(node) // Add the node to the path
    node = previous[node] // Move to the previous node
  }

  // If the last node in the path is not nodeA, there is no path from nodeA to nodeB
  if(path[path.length - 1] !== nodeA) {
    return [] // No path found
  }

  // Return the path in correct order from nodeA to nodeB
  return path.reverse()
}

// Example graph represented as an adjacency list
const graph = {
  A: { B: 3, C: 7, D: 8 },
  B: { A: 3, C: 4, E: 1 },
  C: { A: 7, B: 4, D: 3, E: 2 },
  D: { A: 8, C: 3 },
  E: { B: 1, C: 2 }
}

// Graph visualization:
//         A----B---E
//         | \  |  /
//         |  \ | /
//         D----C

// Find and print the shortest path from node 'A' to node 'E'
console.log(shortestPathDijkstra(graph, 'A', 'E')); // Output: [ 'A', 'B', 'E' ]
