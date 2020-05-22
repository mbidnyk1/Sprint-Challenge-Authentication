const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./auth-model')
const { isValid, authError } = require('./authenticate-middleware')

router.post('/register', isValid(), async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await Users.add(req.body)
    res.status(201).json(user)
  } catch(err) {
      next(err)
    }
});

router.post('/login', isValid(), async (req, res, next) => {
  try{
    const { username, password } = req.body
    console.log(req.body)
    const user = await Users.findBy( { username } ).first()
    console.log(user)
    if(!user) {
        return res.status(402).json(authError())
    }
    
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
        return res.status(403).json(authError())
    } 

    const tokenPayload = {
        userId: user.id,
    }
    
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
    res.json({
        message: `Welcome ${user.username}!`,
        token: token,
        tokenPayload
    })
  } catch(err) {
      next(err)
    }
});

module.exports = router;
