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

router.post('/exterior_design', upload.single('file'), exteriorDesignController.createExteriorDesign)
router.get('/exterior_design', exteriorDesignController.getExteriorDesign)
router.get('/exterior_design/:id', exteriorDesignController.getOneExteriorDesign)
router.put('/exterior_design', upload.single('file'), exteriorDesignController.updateExteriorDesign) //обновление данных переделать!!!
router.delete('/exterior_design/:id', exteriorDesignController.deleteExteriorDesign)

module.exports = router