const express = require('express');
const router = express.Router();
const multer = require('multer');

const exteriorDesignItemsController = require('./exterior_design_items.controller')

const MAX_SIZE = 2000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/exteriorDesignitems', upload.single('file'), exteriorDesignItemsController.createExteriorDesignItem)
router.get('/exteriorDesignitems/:id', exteriorDesignItemsController.getExteriorDesignItemsFromOneExteriorDesign)
router.delete('/exteriorDesignitems/:id', exteriorDesignItemsController.deleteExteriorDesignItem)

module.exports = router