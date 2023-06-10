const {ventilatedFacadesRepository} = require('./ventilated_facades.repository')

class ventilatedFacadesDAO {
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
        console.log(11111)

            let error = new Error('invalidate ventilated facade data');
            error.status = 400
            throw  error
        }

        this._validateId(ventilatedFacade.id);
    }

    static async isExistsId(id) { // Проверка на наличие этого индекса в таблице
        if (await ventilatedFacadesRepository.getById(id) === undefined) {
            let error = new Error('no such id found')
            error.status = 404
            throw error
        }
    }

    static insertNew(title, url) {
        this._validate()
        return ventilatedFacadesRepository.insertNew(title, url)
    }

    static async getAll() {
        try {
            const query = await ventilatedFacadesRepository.getAll()
            return {
                query: query,
                error: {}
            }
        } catch(err) {
            return {
                query: '',
                error: {status: 500, title: "select problem in the database"}
            }
        }
    }

    static async getById(id) {   
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await ventilatedFacadesRepository.getById(id)
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
            return await ventilatedFacadesRepository.updateById(id, title, url)
        } catch(error) {
            throw error
        }
    }

    static async deleteById(id) {
        try {
            await this._validateId(id)
            await this.isExistsId(id)
            const query = await ventilatedFacadesRepository.deleteById(id)
            return query
        } catch(error) {
            throw error
        }
        
    }
}

module.exports = {
    ventilatedFacadesDAO
}