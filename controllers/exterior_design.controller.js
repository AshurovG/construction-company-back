const db = require('../db')

class VentilatedFacadesController {
    async createExteriorDesign(req, res) {
        const {exteriorDesignTitle, exteriorDesignUrl} = req.body
        const newExteriorDesign = await db.query('INSERT INTO exterior_design(exterior_design_title, exterior_design_url) VALUES ($1, $2) RETURNING *',
        [exteriorDesignTitle, exteriorDesignUrl])
        res.json(newExteriorDesign.rows[0]) // Возвращаем только добавленный элемент
    }

    async getExteriorDesign(req, res) {
        const exteriorDesign = await db.query('SELECT * FROM exterior_design')
        res.json(exteriorDesign.rows) // Возвращаем весь select
    }

    async getOneExteriorDesign(req, res) {
        const id = req.params.id //id - из url страницы
        const exteriorDesign = await db.query('SELECT * FROM exterior_design where exterior_design_id = $1', [id])
        res.json(exteriorDesign.rows[0]) // Возвращаем полученную карточку
    }

    async updateExteriorDesign(req, res) {
        const {exteriorDesignId, exteriorDesignTitle, exteriorDesignUrl} = req.body
        const exteriorDesign = await db.query('UPDATE exterior_design set exterior_design_title = $1, exterior_design_url = $2 where exterior_design_id = $3 RETURNING *',
        [exteriorDesignTitle, exteriorDesignUrl, exteriorDesignId])
        res.json(exteriorDesign.rows[0])
    }
    
    async deleteExteriorDesign(req, res) {
        const id = req.params.id //id - из url страницы
        const exteriorDesign = await db.query('DELETE FROM exterior_design where exterior_design_id = $1', [id])
        res.json(exteriorDesign.rows[0]) // Возвращаем полученную карточку
    }
}

module.exports = new VentilatedFacadesController()