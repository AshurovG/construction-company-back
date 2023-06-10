const db = require('../db')
const {ventilatedFacadesDAO} = require('./ventilated_facades.DAO')

class VentilatedFacadesController {
    createVentilatedFacade(req, res) {
        const {title, url} = req.body
        ventilatedFacadesDAO.insertNew(title, url)
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
        ventilatedFacadesDAO.getAll()
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
        ventilatedFacadesDAO.getById(id)
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
        ventilatedFacadesDAO.deleteById(id)
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
        ventilatedFacadesDAO.updateById(id, title, url)
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
    
    




   

    // async getVentilatedFacades(req, res) {
    //     try 
    //     {
    //         // const ventilatedFacades = await db.query('SELECT * FROM ventilated_facades')
    //         // res.json(ventilatedFacades.rows) // Возвращаем весь select
    //     } catch(err) {
    //        res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    // async getOneVentilatedFacade(req, res) {
    //     try 
    //     {
    //         const id = req.params.id //id - из url страницы
    //         const ventilatedFacades = await db.query('SELECT * FROM ventilated_facades where ventilated_facades_id = $1', [id])
    //         res.json(ventilatedFacades.rows[0]) // Возвращаем полученную карточку
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    // async updateVentilatedFacade(req, res) {
    //     try
    //     {
    //         const {ventilatedFacadesId, ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
    //         const ventilatedFacades = await db.query('UPDATE ventilated_facades set ventilated_facades_title = $1, ventilated_facades_url = $2 where ventilated_facades_id = $3 RETURNING *',
    //         [ventilatedFacadesTitle, ventilatedFacadesUrl, ventilatedFacadesId])
    //         res.json(ventilatedFacades.rows[0])
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }
    
    // async deleteVentilatedFacade(req, res) {
    //     try
    //     {
    //         const id = req.params.id //id - из url страницы
    //         const ventilatedFacades = await db.query('DELETE FROM ventilated_facades where ventilated_facades_id = $1', [id])
    //         res.json(ventilatedFacades.rows[0]) // Возвращаем полученную карточку
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }
    
}

module.exports = new VentilatedFacadesController()