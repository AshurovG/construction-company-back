const Router = require('express')
const router = new Router()

const authController = require('./auth.controller')

router.post('/login', authController.login)
router.post('/check', authController.check)

module.exports = router