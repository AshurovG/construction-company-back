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

router.post('/ventilated_facades', upload.single('file'), ventilatedFacadesController.createVentilatedFacade)
router.get('/ventilated_facades', ventilatedFacadesController.getVentilatedFacades)
router.get('/ventilated_facades/:id', ventilatedFacadesController.getOneVentilatedFacade)
router.put('/ventilated_facades/:id', upload.single('file'), ventilatedFacadesController.updateVentilatedFacade) //обновление данных
router.delete('/ventilated_facades/:id', ventilatedFacadesController.deleteVentilatedFacade)

module.exports = router