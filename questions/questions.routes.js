const Router = require('express')
const router = new Router()
const questions = require('./questions.controller')

router.post('/questions', questions.createQuestions)
router.get('/questions', questions.getQuestions)
router.get('/questions/:id', questions.getOneQuestions)
router.put('/questions', questions.updateQuestions) //обновление данных
router.delete('/questions/:id', questions.deleteQuestions)

module.exports = router