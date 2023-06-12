const {VentilatedFacadesDAO} = require('./ventilated_facades.DAO')

class VentilatedFacadesController {
    createVentilatedFacade(req, res) {
        const {title, url} = req.body
        VentilatedFacadesDAO.insertNew(title, url)
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

    async getVentilatedFacades(req, res) {
        VentilatedFacadesDAO.getAll()
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
    
    async getOneVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        VentilatedFacadesDAO.getById(id)
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

    async deleteVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        VentilatedFacadesDAO.deleteById(id)
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

    async updateVentilatedFacade(req, res) {
        const {id, title, url} = req.body
        VentilatedFacadesDAO.updateById(id, title, url)
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

module.exports = new VentilatedFacadesController()