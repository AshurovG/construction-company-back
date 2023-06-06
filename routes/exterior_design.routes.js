const Router = require('express')
const router = new Router()
const exteriorDesignController = require('../controllers/exterior_design.controller')

router.post('/exteriorDesign', exteriorDesignController.createExteriorDesign)
router.get('/exteriorDesign', exteriorDesignController.getExteriorDesign)
router.get('/exteriorDesign/:id', exteriorDesignController.getOneExteriorDesign)
router.put('/exteriorDesign', exteriorDesignController.updateExteriorDesign) //обновление данных
router.delete('/exteriorDesign/:id', exteriorDesignController.deleteExteriorDesign)

module.exports = router