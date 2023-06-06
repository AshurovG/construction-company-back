const db = require('../db')

class VentilatedFacadesController {
    async createVentilatedFacade(req, res) {
        const {ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
        const newVentilatedFacades = await db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url) VALUES ($1, $2) RETURNING *',
        [ventilatedFacadesTitle, ventilatedFacadesUrl])
        res.json(newVentilatedFacades.rows[0]) // Возвращаем только добавленный элемент
    }

    async getVentilatedFacades(req, res) {
        const ventilatedFacades = await db.query('SELECT * FROM ventilated_facades')
        res.json(ventilatedFacades.rows) // Возвращаем весь select
    }

    async getOneVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        const ventilatedFacades = await db.query('SELECT * FROM ventilated_facades where ventilated_facades_id = $1', [id])
        res.json(ventilatedFacades.rows[0]) // Возвращаем полученную карточку
    }

    async updateVentilatedFacade(req, res) {
        const {ventilatedFacadesId, ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
        const ventilatedFacades = await db.query('UPDATE ventilated_facades set ventilated_facades_title = $1, ventilated_facades_url = $2 where ventilated_facades_id = $3 RETURNING *',
        [ventilatedFacadesTitle, ventilatedFacadesUrl, ventilatedFacadesId])
        res.json(ventilatedFacades.rows[0])
    }
    
    async deleteVentilatedFacade(req, res) {
        const id = req.params.id //id - из url страницы
        const ventilatedFacades = await db.query('DELETE FROM ventilated_facades where ventilated_facades_id = $1', [id])
        res.json(ventilatedFacades.rows[0]) // Возвращаем полученную карточку
    }
}

module.exports = new VentilatedFacadesController()