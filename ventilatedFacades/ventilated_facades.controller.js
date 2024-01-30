const { VentilatedFacadesDAO } = require('./ventilated_facades.DAO')
const sharp = require('sharp')
const fs = require('fs')

class VentilatedFacadesController {
    async createVentilatedFacade(req, res) {
        const { title, desc } = req.body

        await sharp(req.file.path)
            .toFile(`/usr/src/app/static/facades/${req.file.originalname}`)

        const url = `https://frolfasd.ru/static/facades/${req.file.originalname}`
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            return
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

    async updateVentilatedFacade(req, res) {
        const { id, title, desc, imgUrl, isFileChanged } = req.body
        const searchString = "ru/";
        const startIndex = imgUrl.indexOf(searchString) + searchString.length;
        const deletingFilePath = imgUrl.substring(startIndex);
        if (isFileChanged == 1) {
            fs.unlink(deletingFilePath, () => { // Для удаления старых файлов
                return
            })
            await sharp(req.file.path)
                .toFile(`/usr/src/app/static/facades/${req.file.originalname}`)
            const url = `https://frolfasd.ru/static/facades/${req.file.originalname}`
            fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
                return
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
        } else {
            VentilatedFacadesDAO.updateByIdWithoutUrl(id, title, desc)
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
            console.log('Файл не был загружен !')
        }

    }
}

module.exports = new VentilatedFacadesController()