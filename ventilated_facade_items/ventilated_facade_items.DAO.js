const {VentilatedFacadesItemsRepository} = require('./ventilated_facade_items.repository')

class VentilatedFacadesItemsDAO {
    constructor(id, title, url) {
        this.id = id
        this.title = title
        this.url = url
    }

    static _validateId(id) {
        if (isNaN(id) || id <= 0) {
            let error = new Error('invalid id')
            error.status = 400
            throw error
        }
    }

    static async _validate(ventilatedFacade) { // Проверка на определенность каждого параметра
        if (await (ventilatedFacade.title === undefined ||
            ventilatedFacade.url === undefined)
        ) {
            let error = new Error('invalidate ventilated facade data');
            error.status = 400
            throw  error
        }
    }

    static async isExistsId(id) { // Проверка на наличие этого индекса в таблице
        if (await VentilatedFacadesItemsRepository.getById(id) === undefined) {
            let error = new Error('no such id found')
            error.status = 404
            throw error
        }
    }

    static async insertNew(title, url) {
        await this._validate({title, url})
        return await VentilatedFacadesItemsRepository.insertNew(title, url)
    }

    static async getAll(id) {
        try {
            const query = await VentilatedFacadesItemsRepository.getAll(id)
            return query
        } catch(error) {
            throw error
        }
    }

    static async deleteById(id) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await VentilatedFacadesItemsRepository.deleteById(id)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    VentilatedFacadesItemsDAO
}