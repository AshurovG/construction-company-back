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
            ventilatedFacade.id === undefined ||
            ventilatedFacade.title === undefined ||
            ventilatedFacade.url === undefined
        ) {
            throw new Error('invalidate ventilated facade data');
        }

        this._validateId(ventilatedFacade.id);
    }

    static isExists(id) {
        this._validateId(id)
        try {
            ventilatedFacadesRepository.getById(id)
        } catch(err) {
            throw new Error(err)
        }
    }

    
}