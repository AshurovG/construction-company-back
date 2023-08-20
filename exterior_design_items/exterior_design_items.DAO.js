const { ExteriorDesignItemsRepository } = require('./exterior_design_items.repository')
const fs = require('fs')

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
        if (await (exteriorDesign.url === undefined ||
            exteriorDesign.exteriorDesignId === undefined)
        ) {
            let error = new Error('invalidate exterior design items data');
            error.status = 400
            throw error
        }
    }

    static async isExistsIdOneAndIdMany(idOne, idMany) { // Проверка на наличие обоих индексов в таблице
        if (await ExteriorDesignItemsRepository.getByIdOneToMany(idOne, idMany) === undefined) {
            let error = new Error('no such exterior_design_id or exterior_design_items_id found')
            error.status = 404
            throw error
        }
    }

    static async isExistsId(id) { // Проверка на наличие этого индекса в таблице
        if (await ExteriorDesignItemsRepository.getById(id) === undefined) {
            let error = new Error(`no such id found. id=${id}`)
            error.status = 404
            throw error
        }
    }

    static async insertNew(url, exteriorDesignId) {
        console.log(exteriorDesignId)
        await this._validate({ url, exteriorDesignId })
        return await ExteriorDesignItemsRepository.insertNew(url, exteriorDesignId)
    }

    static async getAll(exteriorDesignId) {
        try {
            await this._validateId(exteriorDesignId)
            const query = await ExteriorDesignItemsRepository.getAll(exteriorDesignId)
            return query
        } catch (error) {
            throw error
        }
    }

    static async getById(id) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await ExteriorDesignItemsRepository.getById(id)
            return query
        } catch (error) {
            throw error
        }
    }

    static async deleteById(idOne, idMany) {
        try {
            await this._validateId(idOne) // Проверяем каждый индекс по отдельности
            await this._validateId(idMany)
            await this.isExistsIdOneAndIdMany(idOne, idMany)
            const exteriorDesignItem = await this.getById(idMany)
            const fileUrl = exteriorDesignItem.exterior_design_items_url
            const newUrl = fileUrl.substring(fileUrl.indexOf("static"));
            fs.unlink(newUrl, () => { // Для удаления самих файлов картинок
                return
            })
            const query = await ExteriorDesignItemsRepository.deleteById(idOne, idMany)
            return query
        } catch (error) {
            throw error
        }

    }
}

module.exports = {
    ExteriorDesignItemsDAO
}