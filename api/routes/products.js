const express = require('express');
const router = express.Router();

const multer = require('multer')

const ProductController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// get products
router.get('/', ProductController.products_get_all);

// get product detail
router.get('/:productId', ProductController.products_get_detail);

router.post('/', upload.single('productImage'), ProductController.products_create);

// router.delete('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Deleted product!'
//     });
// });

router.patch('/:productId', ProductController.products_update_product);

router.delete('/:productId', ProductController.products_delete);

module.exports = router;

