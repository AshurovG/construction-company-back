const Router = require('express')
const router = new Router()
const ventilatedFacadeItemsController = require('../controllers/ventilated_facade_items.controller')

router.post('/ventilatedFacadesCards', ventilatedFacadeItemsController.createVentilatedFacadeItem)
router.get('/ventilatedFacadesCards', ventilatedFacadeItemsController.getItemsFromOneVentilatedFacade)
// router.get('/ventilatedFacades/:id', ventilatedFacadeItemsController.getOne)
router.delete('/ventilatedFacadesCards/:id', ventilatedFacadeItemsController.deleteItemsFromOneVentilatedFacade)

module.exports = router