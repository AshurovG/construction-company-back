const { ExteriorDesignDAO } = require('./exterior_design.DAO')
const sharp = require('sharp')
const fs = require('fs')

class ExteriorDesignController {
    async createExteriorDesign(req, res) {
        const { title, desc } = req.body
        // await sharp(req.file.path)
        //     .toFile(`./static/exteriors/${req.file.originalname}`)
        await sharp(req.file.path)
            .toFile(`/usr/src/app/static/exteriors/${req.file.originalname}`)

        // const url = `http://localhost:8000/static/exteriors/${req.file.originalname}`
        const url = `https://frolfasd.ru/static/exteriors/${req.file.originalname}`
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
        const id = req.params.id
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

    async updateExteriorDesign(req, res) {
        const  { title, desc, imgUrl, isFileChanged } = req.body
        const { id } = req.params
        let deletingFilePath = ''
        if (imgUrl) {
            const searchString = "ru/";
            const startIndex = imgUrl.indexOf(searchString) + searchString.length;
            deletingFilePath = imgUrl.substring(startIndex);
        }
        if (isFileChanged == 1) {
            fs.unlink(deletingFilePath, () => { // Для удаления cтарых файлов
                console.log(deletingFilePath)
            })
            // await sharp(req.file.path)
            //     .toFile(`./static/exteriors/${req.file.originalname}`)
            await sharp(req.file.path)
                .toFile(`/usr/src/app/static/exteriors/${req.file.originalname}`)
            const url = `https://frolfasd.ru/static/exteriors/${req.file.originalname}`
            // const url = `http://localhost:8000/static/exteriors/${req.file.originalname}`
            fs.unlink(req.file.path, () => { // Для удаления закодированных файлов после использования
                console.log(req.file.path)
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

    async getImportant(req, res) {
        ExteriorDesignDAO.getImportant()
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

    async updateImportant(req, res) {
        const { isImportant } = req.body
        const { id } = req.params;
        ExteriorDesignDAO.updateImportant(id, isImportant)
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

module.exports = new ExteriorDesignController()