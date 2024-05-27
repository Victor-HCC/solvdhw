const { HashTable, hash} = require('../data-structures/HashTable')

// Helper function to log test results
const logTestResult = (description, result) => {
  console.log(`${description}: ${result ? 'PASS' : 'FAIL'}`)
};

// Initial setup
const table = new HashTable() // By default, the limit is 5

// Test insertion and resizing
console.log('Initial limit:', table.limit)
table.insert('perro', 'Dog')
table.insert('gato', 'Cat')
table.insert('pantera', 'Panther')
table.insert('leon', 'Lion')
table.insert('tigre', 'Tiger')
table.insert('elefante', 'Elephant')
table.insert('rinoceronte', 'Rhinoceros')
table.insert('hipopotamo', 'Hippopotamus')
table.insert('pajaro', 'bird')

logTestResult('Table limit after resizing', table.limit > 5)

console.log('Elements after insertion:')
console.log(table.elements)

// Test retrieval
logTestResult("Retrieve 'perro'", table.retrieveByKey('perro') === 'Dog')
logTestResult("Retrieve 'gato'", table.retrieveByKey('gato') === 'Cat')
logTestResult("Retrieve 'pantera'", table.retrieveByKey('pantera') === 'Panther')
logTestResult("Retrieve 'leon'", table.retrieveByKey('leon') === 'Lion')
logTestResult("Retrieve 'tigre'", table.retrieveByKey('tigre') === 'Tiger')
logTestResult("Retrieve 'elefante'", table.retrieveByKey('elefante') === 'Elephant')
logTestResult("Retrieve 'rinoceronte'", table.retrieveByKey('rinoceronte') === 'Rhinoceros')
logTestResult("Retrieve 'hipopotamo'", table.retrieveByKey('hipopotamo') === 'Hippopotamus')
logTestResult("Retrieve 'pajaro'", table.retrieveByKey('pajaro') === 'bird')

// Test deletion
table.delete('pantera')
logTestResult("Retrieve 'pantera' after deletion", table.retrieveByKey('pantera') === null)

console.log('Elements after deletion of pantera:')
console.log(table.elements)

// Test collision handling
const table2 = new HashTable(20)

// Both of these keys should have the same hash
console.log('Hash for "leon":', hash('leon', 20))
console.log('Hash for "hipopotamo":', hash('hipopotamo', 20))

table2.insert('leon', 'Lion')
table2.insert('hipopotamo', 'Hippopotamus')

console.log('Elements in table2:')
console.log(table2.elements)

// Test collision retrieval
logTestResult("Retrieve 'leon' in collision test", table2.retrieveByKey('leon') === 'Lion')
logTestResult("Retrieve 'hipopotamo' in collision test", table2.retrieveByKey('hipopotamo') === 'Hippopotamus')


