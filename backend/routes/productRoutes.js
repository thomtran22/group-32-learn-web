import express from 'express';
import { getProducts, getProductBySku } from '../controllers/productController.js';

const router = express.Router();
router.route('/').get(getProducts); 
router.route('/:sku').get(getProductBySku); 

export default router;