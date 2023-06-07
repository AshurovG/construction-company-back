const db = require('../db')

class ExteriorDesignItems {
    async createExteriorDesignItem(req, res) {
        try
        {        
            const {exteriorDesignItemsUrl, exteriorDesignId} = req.body
            const newExteriorDesignItem = await db.query('INSERT INTO exterior_design_items(exterior_design_items_url, exterior_design_id) VALUES ($1, $2) RETURNING *',
            [exteriorDesignItemsUrl, exteriorDesignId])
            res.json(newExteriorDesignItem.rows[0]) // Возвращаем только добавленный элемент
        } catch(err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    async getItemsFromOneExteriorDesign(req, res) {
        try
        {
            const id = req.query.id // Получаем айди как отдельный query параметр (после "?")
            const exteriorDesignItems = await db.query('SELECT * FROM exterior_design_items WHERE exterior_design_id = $1', [id])
            res.json(exteriorDesignItems.rows)
        } catch(err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    async deleteItemsFromOneExteriorDesign(req, res) {
        try
        {
            const id1 = req.query.id
            const id2 = req.params.id
            const exteriorDesignItems = await db.query('DELETE FROM exterior_design_items WHERE exterior_design_id = $1 AND exterior_design_items_id = $2',
            [id1, id2])
            res.json(exteriorDesignItems.rows[0])
        } catch(err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

module.exports = new ExteriorDesignItems()