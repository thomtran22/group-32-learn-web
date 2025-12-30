import express from 'express';
const router = express.Router();
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { verifyToken} from '../middleware/authMiddleware.js';

router.get('/', getCategories);
router.post('/', verifyToken, createCategory);

export default router;