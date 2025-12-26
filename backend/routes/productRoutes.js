import express from 'express';
import { getProducts, getProductBySku, searchProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/search', searchProducts);
router.route('/').get(getProducts); 
router.route('/:sku').get(getProductBySku); 

export default router;