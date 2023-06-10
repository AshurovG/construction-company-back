const {ExteriorDesignReoisitory} = require('./exterior_design.repository')

class ExteriorDesignDAO {
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

    static async _validate(exteriorDesign) { // Проверка на определенность каждого параметра
        if (await (exteriorDesign.title === undefined ||
            exteriorDesign.url === undefined)
        ) {
            let error = new Error('invalidate exterior design data');
            error.status = 400
            throw  error
        }
    }

    static async isExistsId(id) { // Проверка на наличие этого индекса в таблице
        if (await ExteriorDesignReoisitory.getById(id) === undefined) {
            let error = new Error('no such id found')
            error.status = 404
            throw error
        }
    }

    static async insertNew(title, url) {
        await this._validate({title, url})
        return await ExteriorDesignReoisitory.insertNew(title, url)
    }

    static async getAll() {
        try {
            const query = await ExteriorDesignReoisitory.getAll()
            return query
        } catch(error) {
            throw error
        }
    }

    static async getById(id) {   
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await ExteriorDesignReoisitory.getById(id)
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
            return await ExteriorDesignReoisitory.updateById(id, title, url)
        } catch(error) {
            throw error
        }
    }

    static async deleteById(id) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await ExteriorDesignReoisitory.deleteById(id)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    ExteriorDesignDAO
}