const express = require('express');
const router = express.Router();
const multer = require('multer');

const VentilatedFacadeItemsController = require('./ventilated_facade_items.controller')

const MAX_SIZE = 2000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/ventilated_facade_items', upload.single('file'), VentilatedFacadeItemsController.createVentilatedFacadeItem)
router.get('/ventilated_facade_items/:id', VentilatedFacadeItemsController.getVentilatedFacadeItemsFromOneVentilatedFacade)
router.get('/ventilated_facade_item/:id', VentilatedFacadeItemsController.getOneVentilatedFacadeItem)
router.delete('/ventilated_facade_items/:id', VentilatedFacadeItemsController.deleteVentilatedFacadeItem)

module.exports = router