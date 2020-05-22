/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = {
  authenticate,
  isValid,
  authError
} 

function authenticate() {
  return async (req, res, next) => {
      try {
          const token = req.headers.authorization
          if (!token) {
              return res.status(401).json(authError())
          }
          
          jwt.verify(token,process.env.JWT_SECRET, (err, decodedPayload) => {
              if (err) {
                  return res.status(401).json(authError())
              }
              req.token = decodedPayload
              next()
          })

      } catch(err) {
          next(err)
      }
  }
}

function isValid()  {
  return async (req,res,next) => {
      const user = req.body
      if(user.username && user.password && typeof user.password === 'string'){
          next()
      }
      else{res.status(400).json({
          message: 'Please provide a username and an alphanumeric password'
      })
  }
  }
}

function authError() {
  return  { message: 'Invalid credentials' }
}
