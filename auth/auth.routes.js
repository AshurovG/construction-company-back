const Router = require('express')
const router = new Router()

const authController = require('./auth.controller')

router.post('/login', authController.login)
router.get('/auth', authController.auth)

module.exports = router