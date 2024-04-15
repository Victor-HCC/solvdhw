//Task 1

function calculateDiscountedPrice(products, discount) {
  return products.map(product => {
    return {
      name: product.name,
      price: product.price * (100 - discount) / 100
    }
  })
}

function calculateTotalPrice(products) {
  return products.reduce((total, product) => {
    return product.price + total
  }, 0)
}

//Task 2

function getFullName(person) {
  return `${person.firstName} ${person.lastName}`
}

const splitWords = string => string.split(' ')
const uniqueWords = words => Array.from(new Set(words))
const sortAlphabetically = words => words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
const filterUniqueWords = string => sortAlphabetically(uniqueWords(splitWords(string)))

const arrayAverage = array => array.reduce((total, item) => item + total, 0) / array.length
const allGrades = students => students.reduce((total, student) => total.concat(student.grades), [])
const getAverageGrade = students => arrayAverage(allGrades(students))

// Task 3

function createCounter() {
  let count = 0
  function counter() {
    count += 1
    return count
  }
  return counter
}


function repeatFunction(func, num) {
  if(num < 0) {
    return () => {
      while (true) {
        func();
      }
    }
  } else {
    return () => {
      for(let i = 0; i < num; i++) {
        func()
      }
    }
  }
}

// Task 4

function calculateFactorial(num, factorial = 1) {
  if(num === 1) return factorial

  return calculateFactorial(num - 1, factorial * num)
}

function power(base, exp, result = 1) {
  if(exp === 0) return result
  return power(base, exp - 1, result * base)
}

// Task 5

function lazyMap(arr, mapFunc) {
  let index = 0
  return {
    next: function() {
      if(index < arr.length) {
        return { value: mapFunc(arr[index++]), done: false}
      } else {
        return { done: true}
      }
    }
  }
}

function fibonacciGenerator() {
  let prev = 0
  let curr = 1
  return {
    next: function() {
      const value = curr
      curr = prev + curr
      prev = value
      return { value, done: false }
    }
  }
}