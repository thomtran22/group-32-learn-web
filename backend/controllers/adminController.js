import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import ShipperInfo from '../models/ShipperInfo.js';
import { differenceInDays, startOfDay, endOfDay } from 'date-fns';
import mongoose from 'mongoose';

// --- DASHBOARD ---
export const getDashboardStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalRevenue = await Order.aggregate([
            { $match: { status: 'Delivered', isPaid: true } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const todayRevenue = await Order.aggregate([
            { 
                $match: { 
                    status: 'Delivered', 
                    isPaid: true,
                    deliveredAt: { $gte: today }
                } 
            },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const orderStats = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const totalProducts = await Product.countDocuments();
        
        const lowStockProducts = await Product.countDocuments({
            'variants.quantity': { $lt: 10 }
        });

        const totalCustomers = await User.countDocuments({ role: 'customer' });
        const totalShippers = await User.countDocuments({ role: 'shipper' });

        res.json({
            success: true,
            data: {
                revenue: {
                    total: totalRevenue[0]?.total || 0,
                    today: todayRevenue[0]?.total || 0
                },
                orders: orderStats,
                products: {
                    total: totalProducts,
                    lowStock: lowStockProducts
                },
                users: {
                    customers: totalCustomers,
                    shippers: totalShippers
                }
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// --- REVENUE CHART ---
export const getRevenueStats = async (req, res) => {
    try {
        // Lấy từ query, mặc định 7 ngày qua
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp ngày bắt đầu và kết thúc.' });
        }
        
        const startDate = startOfDay(new Date(from));
        const endDate = endOfDay(new Date(to));

        const daysDiff = differenceInDays(endDate, startDate);

        let groupBy = {};
        let dateFormat = ''; // Dùng để format _id cho dễ xử lý ở frontend

        // Tự động quyết định cách nhóm dữ liệu
        if (daysDiff <= 1) { // Xem trong 1 ngày -> nhóm theo giờ
            groupBy = {
                year: { $year: '$deliveredAt' },
                month: { $month: '$deliveredAt' },
                day: { $dayOfMonth: '$deliveredAt' },
                hour: { $hour: '$deliveredAt' }
            };
            dateFormat = '%Y-%m-%dT%H:00:00.000Z'; // Format ISO để dễ parse giờ
        } else if (daysDiff <= 90) { // Xem dưới 3 tháng -> nhóm theo ngày
            groupBy = {
                year: { $year: '$deliveredAt' },
                month: { $month: '$deliveredAt' },
                day: { $dayOfMonth: '$deliveredAt' }
            };
            dateFormat = '%Y-%m-%d';
        } else { // Xem dài hạn -> nhóm theo tháng
            groupBy = {
                year: { $year: '$deliveredAt' },
                month: { $month: '$deliveredAt' }
            };
            dateFormat = '%Y-%m';
        }
        
        const revenueData = await Order.aggregate([
            {
                $match: {
                    status: 'Delivered',
                    isPaid: true,
                    deliveredAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: dateFormat, date: "$deliveredAt" } },
                    totalRevenue: { $sum: '$totalPrice' },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.json({ success: true, data: revenueData });
    } catch (error) {
        console.error('Revenue stats error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- ORDERS ---
export const getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, search } = req.query;
        const filter = {};

        if (status) filter.status = status;

        if (search) {
            const isObjectId = mongoose.Types.ObjectId.isValid(search);
            filter.$or = [
                { 'shippingAddress.fullName': { $regex: search, $options: 'i' } },
                { 'shippingAddress.phone': { $regex: search, $options: 'i' } }
            ];
            if (isObjectId) {
                filter.$or.push({ _id: search });
            }
        }

        const skip = (page - 1) * limit;
        const orders = await Order.find(filter)
            .populate('user', 'fullName email')
            .populate('shipperId', 'fullName')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Order.countDocuments(filter);

        res.json({
            success: true,
            orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, note } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ success: false, message: 'Đơn hàng không tồn tại' });

        order.status = status;
        if (note) order.orderNotes = (order.orderNotes ? order.orderNotes + '\n' : '') + `[Admin]: ${note}`;

        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = new Date();
            order.isPaid = true;
            order.paidAt = new Date();
        }

        await order.save();
        res.json({ success: true, message: 'Cập nhật thành công', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- PRODUCTS & INVENTORY ---
export const getInventoryStatus = async (req, res) => {
    try {
        const { lowStock = 10, limit = 50 } = req.query;

        const products = await Product.find({
            'variants.quantity': { $lt: parseInt(lowStock) }
        }).select('name sku variants').limit(parseInt(limit));

        let totalLowStockVariants = 0;
        const formattedProducts = products.map(p => {
            const lowVariants = p.variants.filter(v => v.quantity < parseInt(lowStock));
            totalLowStockVariants += lowVariants.length;
            
            const totalStock = p.variants.reduce((sum, v) => sum + v.quantity, 0);

            return {
                _id: p._id,
                name: p.name,
                sku: p.sku,
                totalStock,
                variants: p.variants
            };
        });

        res.json({
            success: true,
            data: {
                total: products.length,
                lowStock: totalLowStockVariants,
                products: formattedProducts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { limit = 20, search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter)
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ success: true, message: 'Tạo sản phẩm thành công', product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Không tìm thấy sản phẩm' 
            });
        }

        res.json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.json({ success: true, message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- SHIPPERS ---
export const getAllShippers = async (req, res) => {
    try {
        const shippersUser = await User.find({ role: 'shipper' }).select('-password').lean();

        const detailedShippers = await Promise.all(shippersUser.map(async (user) => {
            const info = await ShipperInfo.findOne({ userId: user._id }) || {};
            
            const totalOrders = await Order.countDocuments({ shipperId: user._id });
            const deliveredOrders = await Order.countDocuments({ shipperId: user._id, status: 'Delivered' });
            
            return {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                info: {
                    status: info.status || 'INACTIVE',
                    vehicleType: info.vehicleType,
                    licensePlate: info.licensePlate,
                    workingArea: info.workingArea,
                    rating: info.rating
                },
                performance: {
                    totalDeliveries: totalOrders,
                    successfulDeliveries: deliveredOrders
                }
            };
        }));

        res.json({ success: true, shippers: detailedShippers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateShipperStatus = async (req, res) => {
    try {
        const { shipperId } = req.params;
        const { status } = req.body;

        const updatedInfo = await ShipperInfo.findOneAndUpdate(
            { userId: shipperId },
            { status: status },
            { new: true, upsert: true }
        );

        res.json({ success: true, message: 'Cập nhật trạng thái thành công', info: updatedInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- USERS ---
export const getAllUsers = async (req, res) => {
    try {
        const { search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(filter).select('-password').sort({ createdAt: -1 }).limit(50);
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserStatus = async (req, res) => {
    res.json({ success: true, message: 'Tính năng đang phát triển' });
};