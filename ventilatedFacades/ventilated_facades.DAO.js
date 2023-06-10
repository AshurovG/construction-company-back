const {VentilatedFacadesRepository} = require('./ventilated_facades.repository')

class VentilatedFacadesDAO {
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
        if (await VentilatedFacadesRepository.getById(id) === undefined) {
            let error = new Error('no such id found')
            error.status = 404
            throw error
        }
    }

    static async insertNew(title, url) {
        await this._validate({title, url})
        return await VentilatedFacadesRepository.insertNew(title, url)
    }

    static async getAll() {
        try {
            const query = await VentilatedFacadesRepository.getAll()
            return query
        } catch(error) {
            throw error
        }
    }

    static async getById(id) {   
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await VentilatedFacadesRepository.getById(id)
            return query
        } catch(error){
            throw error
        }
    }

    static async updateById(id, title, url) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            await this._validate({title, url})
            return await VentilatedFacadesRepository.updateById(id, title, url)
        } catch(error) {
            throw error
        }
    }

    static async deleteById(id) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await VentilatedFacadesRepository.deleteById(id)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    VentilatedFacadesDAO
}