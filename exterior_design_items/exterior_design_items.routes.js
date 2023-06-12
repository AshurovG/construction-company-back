const Router = require('express')
const router = new Router()
const exteriorDesignItemsController = require('./exterior_design_items.controller')

router.post('/exteriorDesignCards', exteriorDesignItemsController.createExteriorDesignItem)
router.get('/exteriorDesignCards:id', exteriorDesignItemsController.getItemsFromOneExteriorDesign)
router.delete('/exteriorDesignCards/:id', exteriorDesignItemsController.deleteItemsFromOneExteriorDesign)

module.exports = router