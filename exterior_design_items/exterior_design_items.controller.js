const db = require('../db')
const {ExteriorDesignItemsDAO} = require('./exterior_design_items.DAO')

class ExteriorDesignsItemsItemsController {
    createExteriorDesignItem(req, res) {
        const {url, exteriorDesignId} = req.body
        ExteriorDesignItemsDAO.insertNew(url, exteriorDesignId)
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

    async getExteriorDesignItemsFromOneExteriorDesign(req, res) {
        const exteriorDesignId = req.params.id
        ExteriorDesignItemsDAO.getAll(exteriorDesignId)
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

    async deleteExteriorDesignItem(req, res) {
        const idOne = req.query.id
        const idMany = req.params.id
        ExteriorDesignItemsDAO.deleteById(idOne, idMany)
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

module.exports = new ExteriorDesignsItemsItemsController()