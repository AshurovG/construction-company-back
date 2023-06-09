const {ventilatedFacadesDAO} = require('./ventilated_facades.DAO')

class ventilatedFacadesService {
    static async getAll() {
        const data = await ventilatedFacadesDAO.getAll()
        return data
    }

    static async getById(id) {
        if (id !== undefined) {
            const data = await ventilatedFacadesRepository.getById(id)
        } else {
            
        }
    }
}

module.exports = {
    ventilatedFacadesService
}