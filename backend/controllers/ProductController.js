const Product = require('../models/ProductModel');

// GET /api/product/:id - Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Sản phẩm không tồn tại'
            });
        }

        // Transform data để match với format frontend mong đợi
        // Xử lý description: nếu là string thì split thành array, nếu đã là array thì giữ nguyên
        let description = product.description || '';
        if (typeof description === 'string') {
            // Split theo newline hoặc dấu chấm để tạo mảng
            description = description.split(/\n|\./).filter(line => line.trim().length > 0);
            if (description.length === 0) {
                description = ['Chưa có mô tả cho sản phẩm này.'];
            }
        } else if (!Array.isArray(description)) {
            description = ['Chưa có mô tả cho sản phẩm này.'];
        }

        // Xử lý images - đảm bảo luôn là mảng
        const images = product.images || [];
        const transformedImages = images.length > 0 
            ? images.map((img, index) => {
                // Nếu images là string, tạo object với color và url
                // Lấy color từ variants nếu có
                const variants = product.variants || [];
                const variant = variants[index % (variants.length || 1)];
                return typeof img === 'string' 
                    ? { color: variant?.color || 'default', url: img }
                    : img;
            })
            : [{ color: 'default', url: '' }]; // Fallback nếu không có ảnh

        // Extract colors từ variants (đảm bảo có fallback)
        const variants = product.variants || [];
        const uniqueColors = variants.length > 0 
            ? [...new Set(variants.map(v => v.color))]
            : ['Mặc định'];
        
        const colors = uniqueColors.map(color => ({
            name: color,
            image: images[0] || '' // Dùng ảnh đầu tiên làm đại diện
        }));

        // Extract sizes từ variants
        const sizes = variants.length > 0
            ? [...new Set(variants.map(v => v.size))]
            : ['F']; // Fallback size

        const transformedProduct = {
            _id: product._id,
            productId: product._id.toString(),
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            description: description,
            images: transformedImages,
            colors: colors,
            availableColors: colors, // Alias
            sizes: sizes,
            variants: variants
        };

        res.json(transformedProduct);
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy sản phẩm',
            error: error.message
        });
    }
};

// GET /api/best-sellers - Lấy sản phẩm bán chạy
const getBestSellers = async (req, res) => {
    try {
        const { excludeId } = req.query;
        
        // Query để lấy sản phẩm (có thể thêm logic tính toán best sellers sau)
        let query = {};
        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        // Tạm thời lấy 4 sản phẩm đầu tiên (sau này có thể sort theo số lượng bán)
        const products = await Product.find(query).limit(4);

        // Transform data để match với format frontend
        const transformedProducts = products.map(product => ({
            _id: product._id,
            productId: product._id.toString(),
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            images: product.images.map((img, index) => {
                const variant = product.variants[index % product.variants.length];
                return typeof img === 'string' 
                    ? { color: variant?.color || 'default', url: img }
                    : img;
            }),
            // Lấy ảnh đầu tiên để hiển thị
            image: product.images[0] || ''
        }));

        res.json(transformedProducts);
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm bán chạy:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy sản phẩm bán chạy',
            error: error.message
        });
    }
};

// GET /api/products - Lấy danh sách sản phẩm (có thể thêm filter, pagination)
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category } = req.query;
        
        let query = {};
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        // Tính toán pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const products = await Product.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        // Transform data
        const transformedProducts = products.map(product => ({
            _id: product._id,
            productId: product._id.toString(),
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            images: product.images.map((img, index) => {
                const variant = product.variants[index % product.variants.length];
                return typeof img === 'string' 
                    ? { color: variant?.color || 'default', url: img }
                    : img;
            }),
            image: product.images[0] || ''
        }));

        res.json({
            success: true,
            products: transformedProducts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách sản phẩm',
            error: error.message
        });
    }
};

module.exports = {
    getProductById,
    getBestSellers,
    getProducts
};

