const db = require('../db')

class VentilatedFacadesController {
    async createVentilatedFacade(req, res) {
        const {ventilatedFacadesTitle, ventilatedFacadesUrl} = req.body
        const newVentilatedFacades = await db.query('INSERT INTO ventilated_facades(ventilated_facades_title, ventilated_facades_url) VALUES ($1, $2) RETURNING *',
        [ventilatedFacadesTitle, ventilatedFacadesUrl])
        res.json(newVentilatedFacades)
    }

    async getVentilatedFacades(req, res) {
        
    }

    async getOneVentilatedFacade(req, res) {
        
    }

    async updateVentilatedFacade(req, res) {
        
    }
    
    async deleteVentilatedFacade(req, res) {
        
    }
}

module.exports = new VentilatedFacadesController()