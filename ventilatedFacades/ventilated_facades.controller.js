const db = require('../db')
const {ventilatedFacadesDAO} = require('./ventilated_facades.DAO')

class VentilatedFacadesController {
    // async createVentilatedFacade(req, res) {
    //     try{
    //         const {ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
    //         const newVentilatedFacades = await db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url) VALUES ($1, $2) RETURNING *',
    //         [ventilatedFacadesTitle, ventilatedFacadesUrl])
    //         res.json(newVentilatedFacades.rows[0]) // Возвращаем только добавленный элемент
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    async getVentilatedFacades(req, res) {
        let data
        try 
        {
            data = await ventilatedFacadesDAO.getAll()
            if (Object.keys(data.error).length === 0) {
                res.json(data.query) // Возвращаем весь select
            } else {
                res.status(data.error.status.send({status: 'Bad Request', message: data.error.title }))
            }
            
        } catch(err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    // async getOneVentilatedFacade(req, res) {
    //     const id = req.params.id //id - из url страницы
    //     ventilatedFacadesDAO.getById(id)
    //     .then((data) => {
    //         try {
    //             res.json(data)
    //         } catch(error) {
    //             res.status(404).send({status: 'Bad Request', message: error.message})
    //         }
    //         // catch(error) {
    //             // console.log(1111111111111)
    //             // res.status(error.status).send({status: 'Bad Request', message: error.message})
    //         // }
    //         // if (Object.keys(data.error).length === 0) {
    //         //     res.json(data.query)
    //         // } else {
    //         //     res.status(error.status).send({status: 'Bad Request', message: error.message})
    //         // }
    //     })
    //     .catch((err) => {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     });
    // }

    async getOneVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        ventilatedFacadesDAO.getById(id)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    res.status(404).send({status: 'Bad Request', message: error.message})
                } else {
                    res.status(400).send({status: 'Bad Request', message: error.message})
                }
            });
    }

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




    // async createVentilatedFacade(req, res) {
    //     try{
    //         const {ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
    //         const newVentilatedFacades = await db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url) VALUES ($1, $2) RETURNING *',
    //         [ventilatedFacadesTitle, ventilatedFacadesUrl])
    //         res.json(newVentilatedFacades.rows[0]) // Возвращаем только добавленный элемент
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

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