const { Router } = require('express')
const router = Router()
const { SignUp, SignIn, Me } = require('./controllers/authController')

// authorization start
router.post('/signUp', SignUp)

router.post('/signIn', SignIn)

router.get('/me', Me)
// authorization end



module.exports = router