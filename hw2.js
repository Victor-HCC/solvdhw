
const addValues = (arg1, arg2) => {

  const type = typeof(arg1)

  if(typeof(arg1) === typeof(arg2)) {
    switch(type) {
      case 'number':
        return arg1 + arg2
      case 'string':
        return arg1 + arg2
      case 'bigint':
        return arg1 + arg2
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
      return BigInt(arg)
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
      return String(arg)
    case 'number':
      return Number(arg)
    case 'boolean':
      return Boolean(arg)
    case 'bigint':
      const value = BigInt(arg)
      if(!Number.isFinite(value)) throw new Error("Can't coerce to bigint")
      return value
    default:
      throw new Error("The value can't be converted to the specified type")
  }
}


module.exports = { addValues, stringifyValue, convertToNumber, invertBoolean, coerceToType }