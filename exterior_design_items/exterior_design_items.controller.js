const { ExteriorDesignItemsDAO } = require('./exterior_design_items.DAO')
const sharp = require('sharp')
const fs = require('fs')

class ExteriorDesignsItemsItemsController {

    async createExteriorDesignItem(req, res) {
        const { exteriorDesignId } = req.body
        console.log(os.userInfo().username);
        if (!req.file) {
            res.status(400).send({message: 'file was not transferred'})
            return
        }
        await sharp(req.file.path)
            .toFile(`/usr/src/app/static/exteriorsItems/${req.file.originalname}`)

        const url = `https://frolfasd.ru/static/exteriorsItems/${req.file.originalname}`
        console.log('изменение!!!')
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            console.log(req.file.path)
        })
        ExteriorDesignItemsDAO.insertNew(url, exteriorDesignId)
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

    async getExteriorDesignItemsFromOneExteriorDesign(req, res) {
        const exteriorDesignId = req.params.id
        ExteriorDesignItemsDAO.getAll(exteriorDesignId)
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

    async getOneExteriorDesignItem(req, res) {
        const id = req.params.id //id - из url страницы
        ExteriorDesignItemsDAO.getById(id)
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

    async deleteExteriorDesignItem(req, res) {
        const idOne = req.query.id
        const idMany = req.params.id
        ExteriorDesignItemsDAO.deleteById(idOne, idMany)
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

module.exports = new ExteriorDesignsItemsItemsController()