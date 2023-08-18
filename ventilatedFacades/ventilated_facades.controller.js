const { VentilatedFacadesDAO } = require('./ventilated_facades.DAO')
const sharp = require('sharp')
const fs = require('fs')

// try {
//     await sharp(req.files[0].path)
//         .toFile(`../static/${req.files[0].originalname}`)
// fs.unlink(req.files[0].path, () => {
//     res.json({ file: `../static/${req.files[0].originalname}` })
// })
// } catch (err) {
//     res.status(422).json({ err })
// }

class VentilatedFacadesController {
    async createVentilatedFacade(req, res) {
        const { title, desc } = req.body
        await sharp(req.file.path)
            .toFile(`./static/${req.file.originalname}`)

        const url = `http://localhost:8000/static/${req.file.originalname}`
        console.log(`url: ${url}`)
        console.log(`title: ${title}`)
        console.log(`desc: ${desc}`)
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            console.log(req.file.path)
        })
        VentilatedFacadesDAO.insertNew(title, url, desc)
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

    async getVentilatedFacades(req, res) {
        VentilatedFacadesDAO.getAll()
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

    async getOneVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        VentilatedFacadesDAO.getById(id)
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

    async deleteVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        VentilatedFacadesDAO.deleteById(id)
            .then(() => {
                res.json('Запись удалена из БД !')
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

    // const { title, desc } = req.body
    // await sharp(req.file.path)
    //     .toFile(`./static/${req.file.originalname}`)

    // const url = `http://localhost:8000/static/${req.file.originalname}`
    // console.log(`url: ${url}`)
    // console.log(`title: ${title}`)
    // console.log(`desc: ${desc}`)
    // fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
    //     console.log(req.file.path)
    // })

    async updateVentilatedFacade(req, res) {
        const { id, title, desc } = req.body
        await sharp(req.file.path)
            .toFile(`./static/${req.file.originalname}`)
        const url = `http://localhost:8000/static/${req.file.originalname}`
        console.log(`url: ${url}`)
        console.log(`title: ${title}`)
        console.log(`desc: ${desc}`)
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            console.log(req.file.path)
        })
        VentilatedFacadesDAO.updateById(id, title, url, desc)
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

module.exports = new VentilatedFacadesController()