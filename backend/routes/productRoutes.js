const router = require('express').Router();
const Product = require('../models/Product');

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId }); 
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: `Sản phẩm ID: ${productId} không tồn tại trong CSDL.` 
            });
        }
        
        res.status(200).json(product);
        
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi Server khi truy vấn CSDL.',
            errorDetail: error.message 
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi tải danh sách' });
    }
});

module.exports = router;