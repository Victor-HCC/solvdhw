//Task 1

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
}

for(let prop in person) {
  Object.defineProperty(person, prop, {
    writable: false
  })
}

person.updateInfo = function(info) {
  for(let prop in info) {
    if(this.hasOwnProperty(prop) && Object.getOwnPropertyDescriptor(this, prop).writable === false) {
      Object.defineProperty(this, prop, {
        writable: true
      })
      this[prop] = info[prop];
      Object.defineProperty(this, prop, {
        writable: false
      })
    } else {
      this[prop] = info[prop]
      Object.defineProperty(this, prop, {
        writable: false
      })
    }
  }
}

Object.defineProperty(person, 'address', {
  value: {},
  enumerable: false,
  configurable: false
})

// Task 2

const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5
}

Object.defineProperty(product, 'price', {
  writable: false,
  enumerable: false
})
Object.defineProperty(product, 'quantity', {
  writable: false,
  enumerable: false
})

const getTotalPrice = function(obj) {
  const price = Object.getOwnPropertyDescriptor(obj, 'price').value
  const quantity = Object.getOwnPropertyDescriptor(obj, 'quantity').value

  return price * quantity
}

const deleteNonConfigurable = function(obj, prop) {
  if(obj.hasOwnProperty(prop)) {
    if(Object.getOwnPropertyDescriptor(obj, prop).configurable) {
      delete obj[prop]
    } else {
      throw new Error("Can't delete a non-configurable property")
    }
  }
}

// Task 3

const bankAccount = {
  _balance: 1000,
  get formattedBalance() {
    return `$${this._balance}`
  },
  set balance(value) {
    this._balance = value
  },
  transfer: function(acc1, acc2, amount) {
    if(amount <= acc1._balance) {
      acc1._balance -= amount
      acc2._balance += amount
    }
  }
}

// Task 4

function createImmutableObject(obj) {
  const newObj = {}
  for(let prop in obj) {
    if(typeof(obj[prop]) === 'object' && obj[prop] !== null) {
      newObj[prop] = createImmutableObject(obj[prop])
    } else {
      newObj[prop] = obj[prop]
    }

    Object.defineProperty(newObj, prop, {
      writable: false
    })
  }

  return newObj
}

const personImmutable = createImmutableObject(person)

// Task 5

const observeObject = function(obj, cb) {
  const proxy = new Proxy(obj, {
    get(target, property) {
      cb(property, 'get');
      return target[property]
    },
    set(target, property, value) {
      cb(property, 'set')
      target[property] = value
      return true
    }
  });

  return proxy
}

const cbFunction = (property, action) => console.log(`${action} ${property}`);
const proxyPerson = observeObject(person, cbFunction);

// Task 6

const deepCloneObject = function(obj, objCopied = new WeakMap()) {

  if(typeof(obj) !== 'object' || obj === null) {
    return obj
  }

  if(objCopied.has(obj)) {
    return objCopied.get(obj)
  }

  let copy;
  if(Array.isArray(obj)) {
    copy = []
  } else {
    copy = {}
  }

  objCopied.set(obj, copy)

  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      copy[prop] = deepCloneObject(obj[prop], objCopied)
    }
  }

  return copy
}

// Task 7

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number', minimum: 0 },
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'email']
}

const validateObject = function(obj, schema) {
  
  if(typeof(obj) !== schema.type || obj === null) {
    return false
  }
  
  const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
  let isValid = true
  const props = Object.keys(obj)

  schema.required.forEach(prop => {
    if(!props.includes(prop)) {
      isValid =  false
      return
    };
  })

  for(let prop in schema.properties) {
    if(obj[prop]) {
      if(schema.properties[prop].type !== typeof(obj[prop])) {
        isValid = false
        break
      }

      if(schema.properties[prop].minimum !== undefined && obj[prop] < schema.properties[prop].minimum) {
        isValid = false
        break
      }

      if(schema.properties[prop].format === 'email' && !emailRegex.test(obj[prop])) {
        isValid = false
        break
      }
    }
  }

  return isValid
}