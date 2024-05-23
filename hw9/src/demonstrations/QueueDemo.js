const Queue = require('../data-structures/Queue')

// Simulate a ticket counter
const ticketQueue = new Queue()

// Customers arriving
ticketQueue.enqueue('Customer 1')
ticketQueue.enqueue('Customer 2')
ticketQueue.enqueue('Customer 3')

console.log('Queue after customers arrive:', ticketQueue.elements)

// Serve customers
console.log('Serving:', ticketQueue.dequeue())
console.log('Serving:', ticketQueue.dequeue())

console.log('Queue after serving two customers:', ticketQueue.elements)

// Add another customer
ticketQueue.enqueue('Customer 4')
console.log('Queue after another customer arrives:', ticketQueue.elements)

// Serve remaining customers
while (ticketQueue.size > 0) {
  console.log('Serving:', ticketQueue.dequeue())
}

console.log('Queue after all customers are served:', ticketQueue.elements)
