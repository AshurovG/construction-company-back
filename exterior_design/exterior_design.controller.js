const { ExteriorDesignDAO } = require('./exterior_design.DAO')
const sharp = require('sharp')
const fs = require('fs')

class ExteriorDesignController {
    async createExteriorDesign(req, res) {
        const { title, desc } = req.body
        await sharp(req.file.path)
            .toFile(`./static/${req.file.originalname}`)

        const url = `http://localhost:8000/static/${req.file.originalname}`
        fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
            console.log(req.file.path)
        })
        ExteriorDesignDAO.insertNew(title, url, desc)
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

    async getExteriorDesign(req, res) {
        ExteriorDesignDAO.getAll()
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

    async getOneExteriorDesign(req, res) {
        const id = req.params.id //id - из url страницы
        ExteriorDesignDAO.getById(id)
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

    async deleteExteriorDesign(req, res) {
        const id = req.params.id //id - из url страницы
        ExteriorDesignDAO.deleteById(id)
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

    async updateExteriorDesign(req, res) {
        const { id, title, desc, imgUrl, isFileChanged } = req.body
        const searchString = "8000/";
        const startIndex = imgUrl.indexOf(searchString) + searchString.length;
        const deletingFilePath = imgUrl.substring(startIndex);
        if (isFileChanged == 1) {
            console.log('Файл загружен успешно !')
            await sharp(req.file.path)
                .toFile(`./static/${req.file.originalname}`)
            const url = `http://localhost:8000/static/${req.file.originalname}`
            fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
                console.log(req.file.path)
            })
            fs.unlink(deletingFilePath, () => { // Для удаления закодированных файлов после использования
                console.log(deletingFilePath)
            })
            ExteriorDesignDAO.updateById(id, title, url, desc)
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
            ExteriorDesignDAO.updateByIdWithoutUrl(id, title, desc)
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

module.exports = new ExteriorDesignController()