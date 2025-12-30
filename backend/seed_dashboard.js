
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/OrderModel.js';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import { subDays, subHours, subMinutes, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDashboard = async () => {
    await connectDB();

    try {
        // 1. Get Resources
        const users = await User.find({ role: 'customer' });
        const products = await Product.find({});

        if (users.length === 0 || products.length === 0) {
            console.log("Cần có users và products trong DB trước.");
            process.exit();
        }

        // 2. Clear Old Orders (Optional - uncomment to clear)
        console.log("Đang xóa đơn hàng cũ...");
        await Order.deleteMany({});

        const orders = [];
        const statuses = ["Pending", "Processing", "Shipping", "Delivered", "Completed", "Cancelled"];
        const deliveryStatuses = ["Delivered", "Completed"];

        // 3. Generate Data
        // Target: ~100 orders in last 30 days
        // High density in last 7 days

        const today = new Date();
        const last30Days = eachDayOfInterval({
            start: subDays(today, 29),
            end: today
        });

        for (const day of last30Days) {
            // Random 1-5 orders per day, more on weekends or random spikes
            const orderCount = getRandomInt(1, 6);

            for (let i = 0; i < orderCount; i++) {
                const user = getRandomItem(users);

                // Construct Order Items
                const itemCount = getRandomInt(1, 3);
                const orderItems = [];
                let itemsPrice = 0;

                for (let j = 0; j < itemCount; j++) {
                    const product = getRandomItem(products);

                    const variant = product.variants && product.variants.length > 0
                        ? getRandomItem(product.variants)
                        : { color: 'Default', size: 'Default' };

                    const quantity = getRandomInt(1, 2);
                    const price = product.price;

                    itemsPrice += price * quantity;

                    orderItems.push({
                        name: product.name,
                        quantity,
                        image: product.images[0] || "https://via.placeholder.com/150",
                        price,
                        color: variant.color,
                        size: variant.size,
                        product: product._id
                    });
                }

                const shippingPrice = 30000;
                const totalPrice = itemsPrice + shippingPrice;

                // Random Status
                // Logic: Older orders likely Delivered. Recent orders Pending/Shipping.
                let status = getRandomItem(statuses);
                let isPaid = false;
                let paidAt = null;
                let isDelivered = false;
                let deliveredAt = null;

                // Make data realistic based on time
                const daysAgo = (today.getTime() - day.getTime()) / (1000 * 3600 * 24);

                if (daysAgo > 5) {
                    status = Math.random() > 0.1 ? 'Completed' : 'Cancelled'; // 90% success older orders
                } else {
                    status = getRandomItem(['Pending', 'Processing', 'Shipping', 'Delivered']);
                }

                // Random Time in that day
                const orderDate = subMinutes(subHours(day, getRandomInt(0, 23)), getRandomInt(0, 59));

                if (['Delivered', 'Completed'].includes(status)) {
                    isPaid = true;
                    paidAt = orderDate;
                    isDelivered = true;
                    deliveredAt = orderDate; // For revenue chart which filters by deliveredAt
                } else if (Math.random() > 0.5) {
                    // Start Paid but not delivered (e.g. VNPAY)
                    isPaid = true;
                    paidAt = orderDate;
                }

                const order = new Order({
                    user: user._id,
                    orderItems,
                    shippingAddress: {
                        fullName: user.fullName || "Khách Vãng Lai",
                        phone: user.phone || "0901234567",
                        city: "Hà Nội",
                        district: "Hoàn Kiếm",
                        ward: "Hàng Bài",
                        streetAddress: "123 Phố Huế"
                    },
                    paymentMethod: Math.random() > 0.5 ? "COD" : "VNPAY",
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    isPaid,
                    paidAt,
                    isDelivered,
                    deliveredAt,
                    status,
                    createdAt: orderDate,
                    updatedAt: orderDate
                });

                orders.push(order);
            }
        }

        await Order.insertMany(orders);
        console.log(`Đã tạo ${orders.length} đơn hàng giả lập thành công!`);

        process.exit();
    } catch (error) {
        console.error("Lỗi:", error);
        process.exit(1);
    }
};

seedDashboard();
