const { Router } = require('express')
const router = Router()
const { SignUp, SignIn, Me, Tasks, PrivateTask, VerifyToken } = require('./controllers/authController')

// authorization start
router.post('/signUp', SignUp)

router.post('/signIn', SignIn)
// authorization end
router.get('/me', Me)
router.get('/tasks', Tasks)
router.get('/private-tasks', VerifyToken, PrivateTask)


module.exports = router