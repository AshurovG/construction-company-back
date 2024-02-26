const express = require('express');
const router = express.Router();
const multer = require('multer');

const exteriorDesignItemsController = require('./exterior_design_items.controller')

const MAX_SIZE = 5000000

const upload = multer({
    dest: 'files/',
    limits: {
        fileSize: MAX_SIZE
    }
})

router.post('/exterior_design_items', upload.single('file'), exteriorDesignItemsController.createExteriorDesignItem)
router.get('/exterior_design_items/:id', exteriorDesignItemsController.getExteriorDesignItemsFromOneExteriorDesign)
router.get('/exterior_design_item/:id', exteriorDesignItemsController.getOneExteriorDesignItem)
router.delete('/exterior_design_items/:id', exteriorDesignItemsController.deleteExteriorDesignItem)

module.exports = router