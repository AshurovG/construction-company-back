const Router = require('express')
const router = new Router()
const multer = require('multer');

const VentilatedFacadeItemsController = require('./ventilated_facade_items.controller')

const MAX_SIZE = 2000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/ventilatedFacadeitems', upload.single('file'), VentilatedFacadeItemsController.createVentilatedFacadeItem)
router.get('/ventilatedFacadeitems/:id', VentilatedFacadeItemsController.getVentilatedFacadeItemsFromOneVentilatedFacade)
router.delete('/ventilatedFacadeitems/:id', VentilatedFacadeItemsController.deleteVentilatedFacadeItem)

module.exports = router