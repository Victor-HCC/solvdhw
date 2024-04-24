// Task 1

const customFilterUnique = function(arr, cb) {
  const counts = {}

  arr.forEach(item => {
    const prop = cb(item)
    counts[prop] = (counts[prop] || 0) + 1
  })

  return arr.filter(item => counts[cb(item)] === 1)
}

const persons = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Fred', age: 25 },
  { name: 'John', age: 35 },
  { name: 'Bob', age: 40 },
  { name: 'Bob', age: 45 },
  { name: 'Alice', age: 20 },
  { name: 'Cassie', age: 20 }
]

const sameName = a => a.name
const uniquePersons = customFilterUnique(persons, sameName)
console.log(uniquePersons)

// Task 2

const chunkArray = function(arr, chunk) {
  const result = []
  let start = 0
  let end = chunk
  while(start < arr.length) {
    const smallArr = arr.slice(start, end)
    result.push(smallArr)
    start = end
    end += chunk
  }

  return result
}

// Task 3

const customShuffle = function(arr) {
  const copy = [...arr]
  const result = []
  while(copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length)
    const item = copy.splice(index, 1)
    result.push(...item)
  }

  return result
}

// Task 4

const getArrayIntersection = function(arr1, arr2) {
  const set1 = new Set(arr1)
  const common = arr2.filter(item => set1.has(item))

  return common
}

const getArrayUnion = function(arr1, arr2) {
  const set = new Set([...arr1, ...arr2])
  const uniques = Array.from(set)

  return uniques
}

// Task 5

const measureArrayPerformance = function(fn, arr) {
  const start = performance.now()
  const result = fn(arr)
  const end = performance.now()
  const executionTime = end - start
  return { result, executionTime }
}

const sumArray = function(arr) {
  let total = 0
  for(let i = 0; i < arr.length; i++) {
    total += arr[i]
  }

  return total
}

const filterOdd = function(arr) {
  const result = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] % 2 === 0) {
      result.push(arr[i])
    }
  }

  return result
}

const arrSquared = function(arr) {
  const result = []
  for(let i = 0; i < arr.length; i++) {
    result.push(arr[i] * arr[i])
  }

  return result
}

const arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

console.log(measureArrayPerformance(sumArray, arrNum))
console.log(measureArrayPerformance(arr => arr.reduce((a, b) => a + b, 0), arrNum))

console.log(measureArrayPerformance(filterOdd, arrNum))
console.log(measureArrayPerformance(arr => arr.filter(item => item % 2 === 0), arrNum))

console.log(measureArrayPerformance(arrSquared, arrNum))
console.log(measureArrayPerformance(arr => arr.map(item => item * item), arrNum))