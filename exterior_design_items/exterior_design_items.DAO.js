const {exteriorDesignsItemsRepository} = require('./exterior_design.repository')

class ExteriorDesignItemsDAO {
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

    static async _validate(exteriorDesign) { // Проверка на определенность каждого параметра
        if (await (exteriorDesign.url=== undefined ||
            exteriorDesign.exteriorDesignId === undefined)
        ) {
            let error = new Error('invalidate exterior design items data');
            error.status = 400
            throw  error
        }
    }

    static async isExistsIdOneAndIdMany(idOne, idMany) { // Проверка на наличие обоих индексов в таблице
        if (await exteriorDesignsItemsRepository.getByIdOneToMany(idOne, idMany) === undefined) {
            let error = new Error('no such exterior_design_id or exterior_design_items_id found')
            error.status = 404
            throw error
        }
    }

    static async isExistsIdMany(idMany) { // Проверка на наличие внешнего ключа в таблице
        if (await exteriorDesignsItemsRepository.getByIdMany(idMany) === undefined) {
            let error = new Error('no such exterior_design_id found')
            error.status = 404
            throw error
        }
    }

    static async insertNew(url, exteriorDesignId) {
        await this._validate({url, exteriorDesignId})
        return await exteriorDesignsItemsRepository.insertNew(url, exteriorDesignId)
    }

    static async getAll(exteriorDesignId) {
        try {
            await this._validateId(exteriorDesignId)
            await this.isExistsIdMany(exteriorDesignId)
            const query = await exteriorDesignsItemsRepository.getAll(exteriorDesignId)
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
            const query = await exteriorDesignsItemsRepository.deleteById(idOne, idMany)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    ExteriorDesignItemsDAO
}