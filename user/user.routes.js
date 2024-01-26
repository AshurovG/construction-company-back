const Router = require('express')
const router = new Router()
const userController = require('./user.controller')

router.post('/auth', userController.auth)


module.exports = router