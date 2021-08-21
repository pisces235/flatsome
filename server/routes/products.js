const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

router.get('/', productsController.fetchAllProducts);
router.get('/:id', productsController.fetchProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.patch('/:id/restore', productsController.restoreProduct);
router.delete('/:id/force', productsController.forceDeleteProduct);

module.exports = router;
