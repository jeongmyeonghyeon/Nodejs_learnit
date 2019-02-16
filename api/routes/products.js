const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }

    // mongoDB 에서 가져옴...
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product success'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

// router.delete('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Deleted product!'
//     });
// });

module.exports = router;

