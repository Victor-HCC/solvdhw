
const addValues = (arg1, arg2) => {

  const type = typeof(arg1)

  if(typeof(arg1) === typeof(arg2)) {
    switch(type) {
      case 'number':
        if(isNaN(arg1) || isNaN(arg2)) {
          throw new Error('Addition is not possible with the provided arguments');
        }
        return arg1 + arg2
      case 'string':
        return arg1 + arg2
      case 'bigint':
        return arg1 + arg2
      case 'object': // case for vectorial addition
        if(Array.isArray(arg1) && Array.isArray(arg1) && arg1.length === arg2.length) {
          if(arg1.some(item => typeof(item) != 'number') || arg2.some(item => typeof(item) != 'number')) {
            throw new Error('All elements of the arrays have to be numbers');
          }
          let value = arg1.map((item, index) => item + arg2[index])
          return value
        }
        throw new Error('Addition is not possible with the provided arguments');
      default:
        throw new Error('Addition is not possible with the provided arguments');
    }
  } else {
    throw new Error('Incompatible types for addition');
  }

}

const stringifyValue = (arg) => {
  if(typeof(arg) === 'object' &&
  arg !== null) {
    return JSON.stringify(arg)
  } else {
    return String(arg)
  }
}


const convertToNumber = (arg) => {
  if(arg === null) return Number(arg)

  const type = typeof(arg)

  switch(type) {
    case 'string':
      const argFloat = parseFloat(arg);
      if (!Number.isNaN(argFloat)) {
        return argFloat;
      }
      const argInt = parseInt(arg, 10);
      if (!Number.isNaN(argInt)) {
        return argInt;
      }
      throw new Error("Can't be converted to a number");
    case 'boolean':
      return Number(arg)
    case 'bigint':
      if(arg >= Number.MIN_SAFE_INTEGER && arg <= Number.MAX_SAFE_INTEGER) {
        return Number(arg)
      }
      throw new Error("Can't be converted to a number")
    default:
      throw new Error("Can't be converted to a number")
  }
}


const invertBoolean = (arg) => {
  if(typeof(arg) === 'boolean') return !arg
  else throw new Error('The argument is not a boolean')
}

const coerceToType = (arg, type) => {
  switch(type) {
    case 'string':
      return stringifyValue(arg)
    case 'number':
      return convertToNumber(arg)
    case 'boolean':
      return convertToBoolean(arg)
    case 'bigint':
      try {
        return BigInt(arg);
      } catch (error) {
        throw new Error(error.message);
      }
    default:
      throw new Error("The value can't be converted to the specified type")
  }
}

const convertToBoolean = (arg) => !!arg

const arrayToObject = (arg) => {
  if(Array.isArray(arg)) {
    return arg.map((item, index) => {
      return {
        [index]: item
      }
    })
  }
  throw new Error('The argument is not an array')
}

const nowDateToNumber = () => {
  const value = new Date()
  console.log(value);
  return +value
}

module.exports = { addValues, stringifyValue, convertToNumber, invertBoolean, coerceToType, convertToBoolean }