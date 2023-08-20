const { VentilatedFacadesItemsDAO } = require('./ventilated_facade_items.DAO')
const sharp = require('sharp')
const fs = require('fs')

class VentilatedFacadesItemsItemsController {
    async createVentilatedFacadeItem(req, res) {
        const { ventilatedFacadeId } = req.body
        await sharp(req.file.path)
            .toFile(`./static/items/${req.file.originalname}`)

        const url = `http://localhost:8000/static/items/${req.file.originalname}`
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            console.log(req.file.path)
        })
        VentilatedFacadesItemsDAO.insertNew(url, ventilatedFacadeId)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 500) {
                    res.status(500).send({ status: 'Problem', message: 'Problem with database' })
                } else {
                    res.status(400).send({ status: 'Bad Request', message: error.message })
                }
            });
    }

    async getVentilatedFacadeItemsFromOneVentilatedFacade(req, res) {
        const ventilatedFacadeId = req.params.id
        VentilatedFacadesItemsDAO.getAll(ventilatedFacadeId)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 500) {
                    res.status(500).send({ status: 'Problem', message: 'Problem with database' })
                } else {
                    res.status(400).send({ status: 'Bad Request', message: error.message })
                }
            });
    }

    async deleteVentilatedFacadeItem(req, res) {
        const idOne = req.query.id
        const idMany = req.params.id
        VentilatedFacadesItemsDAO.deleteById(idOne, idMany)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    res.status(error.status).send({ status: 'Not found', message: error.message })
                } else if (error.status === 500) {
                    res.status(500).send({ status: 'Problem', message: 'Problem with database' })
                } else {
                    res.status(400).send({ status: 'Bad Request', message: error.message })
                }
            });
    }
}

module.exports = new VentilatedFacadesItemsItemsController()