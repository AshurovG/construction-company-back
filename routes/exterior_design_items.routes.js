const Router = require('express')
const router = new Router()
const exteriorDesignItemsController = require('../controllers/exterior_design_items.controller')

router.post('/exteriorDesignCards', exteriorDesignItemsController.createExteriorDesignItem)
router.get('/exteriorDesignCards', exteriorDesignItemsController.getItemsFromOneExteriorDesign)
router.delete('/exteriorDesignCards/:id', exteriorDesignItemsController.deleteItemsFromOneExteriorDesign)

module.exports = router