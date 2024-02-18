const {QuestionsDAO} = require('./questions.DAO')
const dotenv = require('dotenv')
dotenv.config()

class QuestionsController {
    createQuestions(req, res) {
        const {title, text, jwt} = req.body
        console.log('jwt', jwt)
        if (!jwt || jwt !== process.env.JWT_TOKEN) {
            res.status(403).send({ message: 'Ivalid JWT'})
        } else {
            QuestionsDAO.insertNew(title, text)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 500) {
                    res.status(500).send({status: 'Problem', message: 'Problem with database'})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
        }
    }

    async getQuestions(req, res) {
        QuestionsDAO.getAll()
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 500) {
                    res.status(500).send({status: 'Problem', message: 'Problem with database'})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
    }
    
    async getOneQuestions(req, res) {
        const id = req.params.id //id - из text страницы
        QuestionsDAO.getById(id)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    res.status(error.status).send({status: 'Not found', message: error.message})
                } else if (error.status === 500) {
                    res.status(500).send({status: 'Problem', message: 'Problem with database'})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
    }

    async deleteQuestions(req, res) {
        const id = req.params.id //id - из text страницы
        const { jwt } = req.body
        console.log('jwt is', jwt)
        if (!jwt || jwt !== process.env.JWT_TOKEN) {
            res.status(403).send({ message: 'Ivalid JWT'})
        } else {
            QuestionsDAO.deleteById(id)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    res.status(error.status).send({status: 'Not found', message: error.message})
                } else if (error.status === 500) {
                    res.status(500).send({status: 'Problem', message: 'Problem with database'})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
        }
    }

    async updateQuestions(req, res) {
        const {id, title, text, jwt} = req.body
        if (!jwt || jwt !== process.env.JWT_TOKEN) {
            res.status(403).send({ message: 'Ivalid JWT'})
        } else {
            QuestionsDAO.updateById(id, title, text)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    res.status(error.status).send({status: 'Not found', message: error.message})
                } else if (error.status === 500) {
                    res.status(500).send({status: 'Problem', message: 'Problem with database'})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
        }
    }
}

module.exports = new QuestionsController()