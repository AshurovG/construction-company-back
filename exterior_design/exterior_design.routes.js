const Router = require('express')
const router = new Router()
const multer = require('multer');

const exteriorDesignController = require('./exterior_design.controller')

const MAX_SIZE = 2000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/exteriorDesign', upload.single('file'), exteriorDesignController.createExteriorDesign)
router.get('/exteriorDesign', exteriorDesignController.getExteriorDesign)
router.get('/exteriorDesign/:id', exteriorDesignController.getOneExteriorDesign)
router.put('/exteriorDesign', upload.single('file'), exteriorDesignController.updateExteriorDesign) //обновление данных переделать!!!
router.delete('/exteriorDesign/:id', exteriorDesignController.deleteExteriorDesign)

module.exports = router