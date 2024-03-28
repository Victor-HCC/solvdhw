String.prototype.plus = function (str) {
  let i = this.length - 1
  let j = str.length - 1
  let sum = []
  let carry = 0;
  while(i >= 0 || j >= 0) {
    let a = this[i] ? parseInt(this[i]) : 0
    let b = str[j] ? parseInt(str[j]) : 0
    
    let unitSum = a + b + parseInt(carry)
    
    sum.unshift(String(parseInt(String(unitSum)[String(unitSum).length - 1])))
    unitSum > 9 ? carry = String(unitSum)[0] : carry = 0;

    i -= 1;
    j -= 1;
  }
  let aux = 0
  for(let i = 0; i < sum.length; i++) {
    if(parseInt(sum[i]) != 0) {
      break;
    }
    aux += 1;
  }
  sum = sum.slice(aux)
  return carry ? String(carry).concat(sum.join('')) : String(sum.join(''));
};

String.prototype.greater = function (str) {
  if(String(parseInt(this)).length > str.length) {
    return true
  } else if(this.length === str.length) {
    for(let i = 0; i < this.length; i++) {
      if(parseInt(this[i]) < parseInt(str[i])) {
        return false
      } else if(parseInt(this[i]) > parseInt(str[i])) {
        return true
      }
    }
  }
  return false 
}

String.prototype.minus = function (str) {

  if(!this.greater(str)) {
    return 'The second parameter should be lower than the first parameter'
  }

  let i = this.length - 1
  let j = str.length - 1
  let result = []
  let borrow = false;

  while(i >= 0) {
    let a = borrow ? parseInt(this[i]) - 1 : parseInt(this[i])
    let b = str[j] ? parseInt(str[j]) : 0
    
    let unitSum = 0
    if(a >= b) {
      unitSum = a - b;
      borrow = false
    } else {
      unitSum = 10 + a - b;
      borrow = true
    }
    
    result.unshift(String(unitSum))

    i -= 1;
    j -= 1;
  }

  return String(parseInt(result.join('')));
};

String.prototype.multiply = function (str) { 
  let a = this.split('')
  let b = str.split('')
  let carry = 0
  let result = ''
  let k = 0

  for(let i = b.length - 1; i >= 0; i--) {
    let round = []
    for(let l = 0; l < k; l++) {
      round.push('0')
    }
    for(let j = a.length - 1; j >= 0; j--) {
      let unitMult = parseInt(b[i]) * parseInt(a[j]) + carry
      if(j === 0) {
        round.unshift((String(unitMult)))
        carry = 0
      } else if(unitMult > 9) {
        round.unshift((String(unitMult)[1]))
        carry = parseInt(String(unitMult)[0])
      } else {
        round.unshift((String(unitMult)))
        carry = 0
      }
    }
    
    k += 1

    result = result.plus(round.join(''))
  }

  return String(result)
};

String.prototype.divide = function (str) {
  function smallDivide(str1, str2) {
    let cont = 0
    let dividend = str1
    while(dividend.greater(str2)) {
      dividend = dividend.minus(str2)
      cont += 1
    }

    if(String(dividend) === str2) {
      cont += 1
    }
    return cont
  }


  if(this.greater(str.multiply('10'))) {
    let length2 = str.length

    let position = length2

    let portion = this.slice(0, length2)
    
    if(!(portion === str) && !portion.greater(str)) {
      portion = this.slice(0, length2 + 1)
      position += 1
    }

    let result = []
    let step = 0

    while((portion === str) || portion.greater(str) || this.length >= position) {
      portion = String(parseInt(portion))
      step = smallDivide(portion, str)

      if(parseInt(step) != 0) {
        if(str.multiply(String(step)) === portion) {
          portion = '0'
        } else {
          portion = portion.minus(str.multiply(String(step)))
        }
      }

      result.push(step)

      if(this[position] || position === this.length) {
        portion = portion.concat(this[position])
        position += 1
      }
    }

    return result.join('')

  } else {
    return smallDivide(this, str)
  }
};
