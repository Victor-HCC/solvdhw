/**
 * Custom JSON parser class that parses a JSON string and returns a JavaScript object.
 */
class JSONParser {
  // Define token types
  static TOKEN_TYPES = {
    LEFT_BRACE: 'LEFT_BRACE',
    RIGHT_BRACE: 'RIGHT_BRACE',
    LEFT_BRACKET: 'LEFT_BRACKET',
    RIGHT_BRACKET: 'RIGHT_BRACKET',
    COLON: 'COLON',
    COMMA: 'COMMA',
    STRING: 'STRING',
    NUMBER: 'NUMBER',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
    NULL: 'NULL'
  }

  // Define token patterns using regular expressions
  static tokenPatterns = [
    { type: JSONParser.TOKEN_TYPES.LEFT_BRACE, regex: /^\{/ },
    { type: JSONParser.TOKEN_TYPES.RIGHT_BRACE, regex: /^\}/ },
    { type: JSONParser.TOKEN_TYPES.LEFT_BRACKET, regex: /^\[/ },
    { type: JSONParser.TOKEN_TYPES.RIGHT_BRACKET, regex: /^\]/ },
    { type: JSONParser.TOKEN_TYPES.COLON, regex: /^:/ },
    { type: JSONParser.TOKEN_TYPES.COMMA, regex: /^,/ },
    { type: JSONParser.TOKEN_TYPES.STRING, regex: /^"(?:\\.|[^\\"])*"/ },
    { type: JSONParser.TOKEN_TYPES.NUMBER, regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/ },
    { type: JSONParser.TOKEN_TYPES.TRUE, regex: /^true\b/ },
    { type: JSONParser.TOKEN_TYPES.FALSE, regex: /^false\b/ },
    { type: JSONParser.TOKEN_TYPES.NULL, regex: /^null\b/ }
  ]

  /**
   * Tokenizes the input string into an array of tokens.
   * @param {string} input - The JSON string to tokenize.
   * @returns {Array} - An array of tokens.
   * @throws {Error} - Throws an error if an unexpected token is encountered.
   */
  static tokenize(input) {
    let tokens = []
    let i = 0

    while(i < input.length) {
      let match = false
      input = input.slice(i).trim() // Trim whitespace

      // Try to match each token pattern
      for(let pattern of JSONParser.tokenPatterns) {
        let regex = pattern.regex
        let result = regex.exec(input)
        if(result) {
          tokens.push({ type: pattern.type, value: result[0] })
          i = result[0].length
          match = true
          break
        }
      }

      if(!match) {
        const unexpectedToken = input.split(/\s|,|\[|\]|\{|\}|:/)[0]
        throw new Error(`Unexpected token: ${unexpectedToken}`)
      }
    }

    return tokens
  }
  
  /**
   * Parses a value token and returns the corresponding JavaScript value.
   * @param {Array} tokens - The array of tokens to parse.
   * @returns {*} - The parsed value.
   * @throws {SyntaxError} - Throws a syntax error if an unexpected token is encountered.
   */
  static parseValue(tokens) {

    if(tokens.length === 0) {
      throw new SyntaxError('Unexpected end of input')
    }

    let token = tokens.shift()

    switch(token.type) {
      case JSONParser.TOKEN_TYPES.LEFT_BRACE:
        return JSONParser.parseObject(tokens)
      case JSONParser.TOKEN_TYPES.LEFT_BRACKET:
        return JSONParser.parseArray(tokens)
      case JSONParser.TOKEN_TYPES.STRING:
        return JSONParser.parseString(token.value)
      case JSONParser.TOKEN_TYPES.NUMBER:
        return parseFloat(token.value)
      case JSONParser.TOKEN_TYPES.TRUE:
        return true
      case JSONParser.TOKEN_TYPES.FALSE:
        return false
      case JSONParser.TOKEN_TYPES.NULL:
        return null
      default:
        throw new SyntaxError(`Unexpected token: ${token.value}`)
    }
  }

  /**
   * Parses an object token and returns the corresponding JavaScript object.
   * @param {Array} tokens - The array of tokens to parse.
   * @returns {Object} - The parsed object.
   * @throws {SyntaxError} - Throws a syntax error if the object is not properly formatted.
   */
  static parseObject(tokens) {
    let obj = {}
  
    while(tokens.length) {
      let keyToken = tokens.shift()
  
      if(keyToken.type === JSONParser.TOKEN_TYPES.RIGHT_BRACE) {
        return obj // End of object
      }
  
      if(keyToken.type !== JSONParser.TOKEN_TYPES.STRING) {
        throw new SyntaxError('Expected string key')
      }
  
      if(tokens.length === 0 || tokens[0].type !== JSONParser.TOKEN_TYPES.COLON) {
        throw new SyntaxError('Expected colon after key')
      }
  
      tokens.shift() // Consume comma

      let value = JSONParser.parseValue(tokens)
      obj[JSONParser.parseString(keyToken.value)] = value
  
      if(tokens.length === 0) {
        throw new SyntaxError('Unterminated object')
      }

      let nextToken = tokens.shift()
  
      if(nextToken.type === JSONParser.TOKEN_TYPES.RIGHT_BRACE) {
        return obj // End of object
      }
  
      if(nextToken.type !== JSONParser.TOKEN_TYPES.COMMA) {
        throw new SyntaxError('Expected comma or end of object')
      }

      // Check for trailing comma followed by right brace
      if(tokens.length > 0 && tokens[0].type === JSONParser.TOKEN_TYPES.RIGHT_BRACE) {
        throw new SyntaxError(`Unexpected token: ${tokens[0].value}`)
      }
  
    }
  
    throw new SyntaxError('Unterminated object')
  }
  

  /**
   * Parses a string token and returns the corresponding JavaScript string.
   * @param {string} str - The string token to parse.
   * @returns {string} - The parsed string.
   */
  static parseString(str) {
    return str.slice(1, -1).replace(/\\"/g, '"') // Remove quotes and handle escaped quotes
  }

  /**
   * Parses an array token and returns the corresponding JavaScript array.
   * @param {Array} tokens - The array of tokens to parse.
   * @returns {Array} - The parsed array.
   * @throws {SyntaxError} - Throws a syntax error if the array is not properly formatted.
   */
  static parseArray(tokens) {
    let arr = []

    while(tokens.length) {
      let token = tokens[0]

      if(token.type === JSONParser.TOKEN_TYPES.RIGHT_BRACKET) {
        tokens.shift()
        return arr // End of array
      }

      let value = JSONParser.parseValue(tokens)
      arr.push(value)

      let nextToken = tokens.shift()

      if(nextToken.type === JSONParser.TOKEN_TYPES.RIGHT_BRACKET) {
        return arr // End of array
      }

      if(nextToken.type !== JSONParser.TOKEN_TYPES.COMMA) {
        throw new SyntaxError('Expected comma or end of array')
      }

    }

    throw new SyntaxError('Unterminated array')
  }

  /**
   * Parses the input JSON string.
   * @param {string} inputString - The JSON string to parse.
   * @returns {Object|Array} - The parsed JavaScript object or array.
   * @throws {Error} - Throws an error if there is an unexpected token.
   */
  static parse(inputString) {
    // Tokenize the input string
    let tokens = JSONParser.tokenize(inputString)
  
    // Parse the tokenized input
    let result = JSONParser.parseValue(tokens)
  
    // Ensure no remaining tokens
    if(tokens.length !== 0) {
      throw new SyntaxError('Unexpected tokens at end of input')
    }
  
    return result
  }
}

module.exports = JSONParser