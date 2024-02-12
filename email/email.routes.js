const Router = require('express')
const router = new Router()

const emailController = require('./email.controller')

router.post('/email', emailController.sendEmail)

module.exports = router