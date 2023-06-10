const db = require('../db')

class ExteriorDesignController {
    async getExteriorDesign(req, res) {
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


    // async createExteriorDesign(req, res) {
    //     try
    //     {
    //         const {exteriorDesignTitle, exteriorDesignUrl} = req.body
    //         const newExteriorDesign = await db.query('INSERT INTO exterior_design(exterior_design_title, exterior_design_url) VALUES ($1, $2) RETURNING *',
    //         [exteriorDesignTitle, exteriorDesignUrl])
    //         res.json(newExteriorDesign.rows[0]) // Возвращаем только добавленный элемент
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    // async getExteriorDesign(req, res) {
    //     try
    //     {
    //         const exteriorDesign = await db.query('SELECT * FROM exterior_design')
    //         res.json(exteriorDesign.rows) // Возвращаем весь select
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    // async getOneExteriorDesign(req, res) {
    //     try
    //     {
    //     const id = req.params.id //id - из url страницы
    //     const exteriorDesign = await db.query('SELECT * FROM exterior_design where exterior_design_id = $1', [id])
    //     res.json(exteriorDesign.rows[0]) // Возвращаем полученную карточку
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }

    // async updateExteriorDesign(req, res) {
    //     try
    //     {
    //         const {exteriorDesignId, exteriorDesignTitle, exteriorDesignUrl} = req.body
    //         const exteriorDesign = await db.query('UPDATE exterior_design set exterior_design_title = $1, exterior_design_url = $2 where exterior_design_id = $3 RETURNING *',
    //         [exteriorDesignTitle, exteriorDesignUrl, exteriorDesignId])
    //         res.json(exteriorDesign.rows[0])
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }
    
    // async deleteExteriorDesign(req, res) {
    //     try
    //     {
    //         const id = req.params.id //id - из url страницы
    //         const exteriorDesign = await db.query('DELETE FROM exterior_design where exterior_design_id = $1', [id])
    //         res.json(exteriorDesign.rows[0]) // Возвращаем полученную карточку
    //     } catch(err) {
    //         res.status(400).send({status: 'Bad Request', message: err.message})
    //     }
    // }
}

module.exports = new ExteriorDesignController()