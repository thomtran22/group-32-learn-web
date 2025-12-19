import express from 'express';
const router = express.Router();
import { getCategories, createCategory } from '../controllers/categoryController.js'; 

router.route('/')
    .get(getCategories) 
    .post(createCategory); 

export default router;