const Router = require('express')
const router = new Router()
const exteriorDesignItemsController = require('./exterior_design_items.controller')

router.post('/exteriorDesignitems', exteriorDesignItemsController.createExteriorDesignItem)
router.get('/exteriorDesignitems/:id', exteriorDesignItemsController.getExteriorDesignItemsFromOneExteriorDesign)
router.delete('/exteriorDesignitems/:id', exteriorDesignItemsController.deleteExteriorDesignItem)

module.exports = router