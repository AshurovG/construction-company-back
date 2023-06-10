const Router = require('express')
const router = new Router()
const VentilatedFacadeItemsController = require('./ventilated_facade_items.controller')

router.post('/ventilatedFacadeitems', VentilatedFacadeItemsController.createVentilatedFacadeItem)
router.get('/ventilatedFacadeitems/:id', VentilatedFacadeItemsController.getVentilatedFacadeItemsFromOneVentilatedFacade)
router.delete('/ventilatedFacadeitems/:id', VentilatedFacadeItemsController.deleteVentilatedFacadeItem)

module.exports = router