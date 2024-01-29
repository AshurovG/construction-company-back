const { VentilatedFacadesItemsDAO } = require('./ventilated_facade_items.DAO')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path');
// const directoryPath = './static/facadesItems/';
const os = require('os');        // await sharp(req.file.path)
// .toFile(path.resolve(__dirname, `./static/facadesItems/${req.file.originalname}`))


class VentilatedFacadesItemsItemsController {
    async createVentilatedFacadeItem(req, res) {
        const { ventilatedFacadeId } = req.body
        console.log(os.userInfo().username);
        if (!req.file) {
            res.status(400).send({message: 'file was not transferred'})
            return
        }
        await sharp(req.file.path)
            .toFile(`/usr/src/app/static/facadesItems/${req.file.originalname}`)

        const url = `https://frolfasd.ru/static/facadesItems/${req.file.originalname}`
        console.log('изменение!!!')
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

    // async createVentilatedFacadeItem(req, res) {
    //     const { ventilatedFacadeId } = req.body
    
    //     try {
    //         // Проверяем существование каталога и создаем его, если нет
    //         await fs.access(directoryPath);
    //     } catch (error) {
    //         if (error.code === 'ENOENT') {
    //             await fs.mkdir(directoryPath, { recursive: true });
    //         }
    //     }
    
    //     await sharp(req.file.path)
    //         .toFile(`./static/facadesItems/${req.file.originalname}`)
    
    //     const url = `https://frolfasd.ru/static/facadesItems/${req.file.originalname}`
    //     console.log('изменение сработало!')
    //     fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
    //         console.log(req.file.path)
    //     })
    //     VentilatedFacadesItemsDAO.insertNew(url, ventilatedFacadeId)
    //         .then((data) => {
    //             res.json(data)
    //         })
    //         .catch((error) => {
    //             if (error.status === 500) {
    //                 res.status(500).send({ status: 'Problem', message: 'Problem with database' })
    //             } else {
    //                 res.status(400).send({ status: 'Bad Request', message: error.message })
    //             }
    //         });
    // }

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

    async getOneVentilatedFacadeItem(req, res) {
        const id = req.params.id //id - из url страницы
        VentilatedFacadesItemsDAO.getById(id)
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