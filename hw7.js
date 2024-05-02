// Task 1

const promiseAll = arr => {
  const result = []
  let count = 0

  return new Promise((resolve, reject) => {
    arr.forEach((promise, index) => {
      promise
        .then(response => {
          result[index] = response
          count++
  
          if(count === arr.length) {
            resolve(result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

// Task 2

const promiseAllSettled = arr => {
  return promiseAll(arr.map(promise =>
    promise
      .then(value => ({ status: 'fulfilled', value }))
      .catch(reason => ({ status: 'rejected', reason }))
  ))
}

// Task 3

const chainPromises = (arr, response = undefined, index = 0) => {
  return new Promise((resolve, reject) => {
    arr[index](response)
      .then(res => {
        index++
        if(index === arr.length) {
          resolve(res)
        } else {
          chainPromises(arr, res, index)
            .then(resolve)
            .catch(reject)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Task 4

const promisify = func => {
  return function(...args) {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        if(error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
}