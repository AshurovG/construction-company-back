const {VentilatedFacadesItemsRepository} = require('./ventilated_facade_items.repository')

class VentilatedFacadesItemsDAO {
    constructor(id, url) {
        this.id = id
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
        if (await (ventilatedFacade.url=== undefined ||
            ventilatedFacade.ventilatedFacadeId === undefined)
        ) {
            let error = new Error('invalidate ventilated facade items data');
            error.status = 400
            throw  error
        }
    }

    static async isExistsIdOneAndIdMany(idOne, idMany) { // Проверка на наличие обоих индексов в таблице
        if (await VentilatedFacadesItemsRepository.getByIdOneToMany(idOne, idMany) === undefined) {
            let error = new Error('no such ventilated_facades_id or ventilated_facades_id found')
            error.status = 404
            throw error
        }
    }

    static async isExistsIdMany(idMany) { // Проверка на наличие внешнего ключа в таблице
        if (await VentilatedFacadesItemsRepository.getByIdMany(idMany) === undefined) {
            let error = new Error('no such ventilated_facades_id found')
            error.status = 404
            throw error
        }
    }

    static async insertNew(url, ventilatedFacadeId) {
        await this._validate({url, ventilatedFacadeId})
        return await VentilatedFacadesItemsRepository.insertNew(url, ventilatedFacadeId)
    }

    static async getAll(ventilatedFacadeId) {
        try {
            await this._validateId(ventilatedFacadeId)
            await this.isExistsIdMany(ventilatedFacadeId)
            const query = await VentilatedFacadesItemsRepository.getAll(ventilatedFacadeId)
            return query
        } catch(error) {
            throw error
        }
    }

    static async deleteById(idOne, idMany) {
        try {
            await this._validateId(idOne) // Проверяем каждый индекс по отдельности
            await this._validateId(idMany)
            await this.isExistsIdOneAndIdMany(idOne, idMany)
            const query = await VentilatedFacadesItemsRepository.deleteById(idOne, idMany)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    VentilatedFacadesItemsDAO
}