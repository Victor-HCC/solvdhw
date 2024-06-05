# Custom JSON.parse

## Table of Contents

1. [Overview](#overview)
2. [Key Components](#key-components)
3. [Error Handling](#error-handling)
4. [Tests](#tests)
5. [Class Implementation](#class-implementation)
6. [Reflection](#reflection)

## Overview

This project involves implementing a custom JSON parser in JavaScript, leveraging regular expressions to tokenize and parse JSON strings. The parser, myJSONParse, converts JSON strings into JavaScript objects or arrays, ensuring proper formatting and handling errors such as unexpected tokens and trailing commas.

## Key Components

### Tokenization

 - The `tokenize` function uses regular expressions to identify and extract different components of a JSON string, such as objects, arrays, strings, numbers, booleans, and null values. This function ensures that the input string is split into manageable tokens for further processing.

### Parsing

- The `parseValue` function determines the type of each token and delegates the parsing task to the appropriate specialized functions:
  - `parseObject` handles the creation of JavaScript objects from tokens, ensuring proper key-value formatting and error handling for issues like trailing commas and unexpected end of input.
  - `parseArray` handles the creation of JavaScript arrays, ensuring proper formatting and error handling for similar issues.
  - `parseString` processes string tokens, taking care of escaped characters within the strings.
  - Additional handlers for numbers, booleans, and null values convert these tokens into their respective JavaScript representations.

### Error Handling

- The parser is designed to catch and throw meaningful syntax errors for various issues, such as unexpected tokens, unexpected end of input, and improper formatting of JSON components. This ensures robust error reporting and helps in debugging malformed JSON strings.

### Tests

Some test cases were implemented in the corresponding file `test.js` to ensure the functionality and robustness of the `myJSONParse` function.

### Class Implementation

In the folder `class`, the `JSONParser` class encapsulates the parsing logic and provides a structured approach to handling JSON tokenization and parsing.
- `Static Methods`: The methods are static because they don't depend on an instance of the class. This design choice allows the methods to be called directly on the class itself, facilitating utility-style usage.
- `Tests`: The implementation has the same test cases as the previous version, located in the corresponding file `test.js`, ensuring that all functionality remains consistent and robust.

### Reflection

Implementing the `myJSONParse` function was a challenging yet rewarding endeavor. The significant challenges included accurately tokenizing the input string, especially handling edge cases like escaped characters within strings, ensuring proper nesting of objects and arrays, and dealing with special cases like trailing commas in objects. These cases were handled by finding appropriate regular expressions and adding specific conditions for edge cases.
The process of manually parsing tokens into JavaScript objects and arrays reinforced a deeper understanding of JSON structure and error handling. This project provided valuable insights into the intricacies of JSON parsing and improved my ability to write robust, error-resistant code. Through this experience, I gained a greater appreciation for the complexities involved in parsing and interpreting JSON data.