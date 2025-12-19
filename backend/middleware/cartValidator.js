import { body, param, validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }
    next();
};

const addToCartRules = () => {
    return [
        body('productId').isMongoId().withMessage('ID sản phẩm không hợp lệ'),
        body('quantity').isInt({ min: 1, max: 100 }).withMessage('Số lượng phải từ 1 đến 100'),
        body('color').optional().isString().trim().escape(), // sanitize
        body('size').optional().isString().trim().escape(),
    ];
};

const updateCartRules = () => {
    return [
        body('items').isArray().withMessage('Danh sách sản phẩm không hợp lệ'),
        body('items.*.productId').isMongoId(),
        body('items.*.quantity').isInt({ min: 1 }),
    ];
};

export {
    validate,
    addToCartRules,
    updateCartRules
};