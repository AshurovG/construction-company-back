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

    static _validate(ventilatedFacade) { // Проверка на определенность каждого параметра
        if (
            // ventilatedFacade.id === undefined ||
            ventilatedFacade.title === undefined ||
            ventilatedFacade.url === undefined
        ) {
            throw new Error('invalidate ventilated facade data');
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

    static updateById(id) {
        this._validateId(id)
        this._validate()
        // this.isExistsId(id)
        return ventilatedFacadesRepository.updateById(id)
    }

    static deleteById(id) {
        this._validateId(id)
        // this.isExistsId(id)
        return ventilatedFacadesRepository.deleteById(id)
    }
}

module.exports = {
    ventilatedFacadesDAO
}