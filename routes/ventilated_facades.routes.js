const Router = require('express')
const router = new Router()
const ventilatedFacadesController = require('../controllers/ventilated_facades.controller')

router.post('/ventilatedFacades', ventilatedFacadesController.createVentilatedFacade)
router.get('/ventilatedFacades', ventilatedFacadesController.getVentilatedFacades)
router.get('/ventilatedFacades/:id', ventilatedFacadesController.getOneVentilatedFacade)
router.put('/ventilatedFacades', ventilatedFacadesController.updateVentilatedFacade) //обновление данных
router.delete('/ventilatedFacades/:id', ventilatedFacadesController.deleteVentilatedFacade)

module.exports = router