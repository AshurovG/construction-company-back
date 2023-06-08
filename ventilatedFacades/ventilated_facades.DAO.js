const {ventilatedFacadesRepository} = require('./ventilated_facades.repository')

class ventilatedFacadesDAO {
    constructor(id, title, url) {
        this.id = id
        this.title = title
        this.url = url
    }

    static _validateId(id) { // Проверка на пустоту индекса
        if (Number.isNaN(id)) {
            throw new Error('invalidate id');
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

    static isExistsId(id) { // Проверка на наличие этого индекса в таблице
        this._validateId(id)
        try {
            ventilatedFacadesRepository.getById(id)
        } catch(err) {
            throw new Error(err)
        }
    }

    static insertNew(title, url) {
        _validate()
        return ventilatedFacadesRepository.insertNew(title, url)
    }

    static getAll() {
        return ventilatedFacadesRepository.getAll()
    }

    static getById(id) {
        this._validateId(id)
        this.isExistsId(id)
        return ventilatedFacadesRepository.getById(id)
    }

    static updateById(id) {
        this._validateId(id)
        this._validate()
        this.isExistsId(id)
        return ventilatedFacadesRepository.updateById(id)
    }

    static deleteById(id) {
        this._validateId(id)
        this.isExistsId(id)
        return ventilatedFacadesRepository.deleteById(id)
    }
}

module.exports = {
    ventilatedFacadesDAO
}