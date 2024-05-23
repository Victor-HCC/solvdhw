// Import the Stack class 
const Stack = require('../data-structures/Stack')

// Function to evaluate a postfix expression
const evaluatePostfix = (expression) => {
  // Create a new instance of Stack
  const stack = new Stack()
  
  // Split the expression into tokens using space as the delimiter
  const tokens = expression.split(' ')

  // Iterate through each token in the expression
  tokens.forEach(token => {
    // Check if the token is a number
    if(!isNaN(token)) {
      // If the token is a number, push it onto the stack
      stack.push(Number(token))
    } else {
      // If the token is an operator, pop two elements from the stack
      const b = stack.pop()
      const a = stack.pop()
      
      // Perform the operation based on the operator and push the result back onto the stack
      switch (token) {
        case '+':
          stack.push(a + b)
          break
        case '-':
          stack.push(a - b)
          break
        case '*':
          stack.push(a * b)
          break
        case '/':
          stack.push(a / b)
          break
        default:
          // If the operator is not supported, throw an error
          throw new Error('Unsupported operator: ' + token)
      }
    }
  })

  // The final result will be the only element left in the stack, pop and return it
  return stack.pop()
}

// Usage of Stack to evaluate a postfix expression
const postfixExpression = '5 1 2 + 4 * + 3 -'
console.log(`Result: ${evaluatePostfix(postfixExpression)}`)
