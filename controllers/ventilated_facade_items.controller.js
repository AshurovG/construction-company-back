const db = require('../db')

class VentilatedFacadeItems {
    async createVentilatedFacadeItem(req, res) {
        const {ventilatedFacadeItemsUrl, ventilatedFacadesId} = req.body
        const newVentilatedFacadeItem = await db.query('INSERT INTO ventilated_facade_items(ventilated_facade_items_url, ventilated_facades_id) VALUES ($1, $2) RETURNING *',
        [ventilatedFacadeItemsUrl, ventilatedFacadesId])
        res.json(newVentilatedFacadeItem.rows[0]) // Возвращаем только добавленный элемент
    }

    async getItemsFromOneVentilatedFacade(req, res) {
        const id = req.query.id // Получаем айди как отдельный query параметр (после "?")
        const ventilatedFacadeItems = await db.query('SELECT * FROM ventilated_facade_items WHERE ventilated_facades_id = $1', [id])
        res.json(ventilatedFacadeItems.rows)
    }

    async deleteItemsFromOneVentilatedFacade(req, res) {
        const id1 = req.query.id
        const id2 = req.params.id
        const ventilatedFacadeItems = await db.query('DELETE FROM ventilated_facade_items WHERE ventilated_facades_id = $1 AND ventilated_facade_items_id = $2',
        [id1, id2])
        res.json(ventilatedFacadeItems.rows[0])
    }
}

module.exports = new VentilatedFacadeItems()