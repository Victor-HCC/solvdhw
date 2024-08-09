require("dotenv").config();
const jwt = require('../utils/JWT')(process.env.SECRET_TOKEN)

const authMiddleware = (roles = []) => {
  if(typeof roles === 'string') {
    roles = [roles]
  }

  return (req, res, next) => {
    const token = req.headers['authorization']

    if(!token) {
      return res.status(401).json({message: 'Access Denied'})
    }

    try {
      const verified = jwt.decode(token)
      
      if(!verified) throw new Error('Invalid Token')
      req.user = verified
      
      if(roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "You don't have access to this resource." })
      }

      next()
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' })
    }
  }
}

module.exports = authMiddleware