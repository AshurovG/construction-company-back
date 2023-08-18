const express = require('express');
const router = express.Router();
const multer = require('multer');

const ventilatedFacadesController = require('./ventilated_facades.controller')

const MAX_SIZE = 2000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/ventilatedFacades', upload.single('file'), ventilatedFacadesController.createVentilatedFacade)
router.get('/ventilatedFacades', ventilatedFacadesController.getVentilatedFacades)
router.get('/ventilatedFacades/:id', ventilatedFacadesController.getOneVentilatedFacade)
router.put('/ventilatedFacades', upload.single('file'), ventilatedFacadesController.updateVentilatedFacade) //обновление данных
router.delete('/ventilatedFacades/:id', ventilatedFacadesController.deleteVentilatedFacade)

module.exports = router