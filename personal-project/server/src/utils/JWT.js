const crypto = require('crypto')

module.exports = function(key) {
  this.key = key

  function encodeBase64Url(str) {
    return Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  function decodeBase64Url(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/')

    while(str.length % 4) {
      str += '='
    }

    return Buffer.from(str, 'base64').toString('utf-8')
  }

  function stringify(obj) {
    return JSON.stringify(obj)
  }

  function checkSumGen(head, body) {
    const checkSumStr = head + '.' + body
    const hash = crypto.createHmac('sha256', key)
    const checkSum = hash.update(checkSumStr).digest('base64')

    return encodeBase64Url(checkSum)
  }

  const alg = {"alg": "HS256", "typ": "JWT"}

  return {
    encode: (obj) => {
      const header = encodeBase64Url(stringify(alg))
      const body = encodeBase64Url(stringify(obj))
      const checkSum = checkSumGen(header, body)

      return `${header}.${body}.${checkSum}`
    },
    decode: (str) => {
      try {
        const [head, body, hash] = str.split('.')

        if(!head || !body || !hash) throw new Error('Invalid token format')
        
        const checkSum = checkSumGen(head, body)

        if(hash === checkSum) {
          return JSON.parse(decodeBase64Url(body))
        } else {
          throw new Error('JWT authentication failed')
        }

      } catch (err) {
        console.error(err.message);
        return false
      }
    }
  }

}