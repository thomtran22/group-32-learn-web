import express from 'express';
import { getProducts, getProductBySku, searchProducts } from '../controllers/productController.js';
const router = express.Router();

router.get('/search', searchProducts);
router.get('/', getProducts); 
router.get('/:sku', getProductBySku); 

export default router;