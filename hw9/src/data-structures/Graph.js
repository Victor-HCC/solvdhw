class Graph {
  constructor() {
    this._adjacencyList = {}
  }

  get adjacencyList() {
    return this._adjacencyList
  }

  addNode(node) {
    if(!this.adjacencyList[node]) {
      this._adjacencyList[node] = []
    }
  }

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

const graph = new Graph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("A", "D");
graph.addEdge("D", "E");

//         A----D
//         |    | 
//         B    E
//         |
//         C
//

console.log(graph.adjacencyList)
console.log(graph.depthFirstSearch('A'));
console.log(graph.breadthFirstSearch('A'));