const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmYzMmJhODkyYjEwMzQ1Y2ZlNGUzYyIsImlhdCI6MTc2NDcwMDkzMCwiZXhwIjoxNzY3MjkyOTMwfQ.6yXBpmYf1CQWMSE8NqSp4DJGUCdr_TKVw_Rlx1GxE44";
const BASE_URL = "http://localhost:5000/api";

// ID sản phẩm đã tạo ở Bước 1
const PRODUCT_1_ID = "656e12345678901234567890"; // Áo Thun
const PRODUCT_2_ID = "656e12345678901234567891"; // Quần Jean

// Hàm gọi API
async function callApi(endpoint, method, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    };

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        console.log(`[${method}] ${endpoint}:`, response.status);
        if(!response.ok) console.error("Error:", data);
        return data;
    } catch (error) {
        console.error(`Request failed: ${endpoint}`, error);
    }
}

async function runSeed() {
    console.log("=== BẮT ĐẦU TEST DỮ LIỆU ===");

    // 1. Thêm sản phẩm vào GIỎ HÀNG (Cart)
    console.log("\n--- 1. Thêm vào giỏ hàng ---");
    
    // Thêm Áo thun (Màu Trắng, Size M, SL: 2)
    await callApi('/cart', 'POST', {
        productId: PRODUCT_1_ID,
        quantity: 2,
        color: "Trắng",
        size: "M"
    });

    // Thêm Quần Jean (Màu Xanh Đậm, Size 30, SL: 1)
    await callApi('/cart', 'POST', {
        productId: PRODUCT_2_ID,
        quantity: 1,
        color: "Xanh Đậm",
        size: "30"
    });

    // Xem giỏ hàng để kiểm tra
    const cartData = await callApi('/cart', 'GET');
    console.log("Giỏ hàng hiện tại:", cartData?.items?.length || 0, "sản phẩm");


    // 2. Tạo Đơn hàng COD (Thanh toán khi nhận hàng)
    console.log("\n--- 2. Tạo đơn hàng COD ---");
    const codOrder = {
        orderItems: [
            {
                product: PRODUCT_1_ID,
                name: "Áo Thun Basic Cotton",
                quantity: 2,
                image: "https://via.placeholder.com/150",
                price: 250000,
                color: "Trắng",
                size: "M"
            }
        ],
        shippingAddress: {
            fullName: "Nguyễn Văn Test",
            phone: "0987654321",
            email: "test@example.com",
            city: "Hà Nội",
            district: "Cầu Giấy",
            ward: "Dịch Vọng",
            streetAddress: "123 Đường Test"
        },
        paymentMethod: "COD",
        itemsPrice: 500000,
        shippingPrice: 30000,
        totalPrice: 530000
    };

    const orderRes = await callApi('/orders', 'POST', codOrder);
    if(orderRes?.success || orderRes?._id) {
        console.log("✅ Tạo đơn COD thành công! ID:", orderRes.order?._id || orderRes._id);
    }


    // 3. Tạo Đơn hàng VNPAY (Thanh toán online)
    console.log("\n--- 3. Tạo đơn hàng VNPAY ---");
    const vnpayOrder = {
        orderItems: [
            {
                product: PRODUCT_2_ID,
                name: "Quần Jean Slim Fit",
                quantity: 1,
                image: "https://via.placeholder.com/150",
                price: 500000,
                color: "Xanh Đậm",
                size: "30"
            }
        ],
        shippingAddress: {
            fullName: "Trần Thị Online",
            phone: "0909090909",
            email: "online@example.com",
            city: "TP. Hồ Chí Minh",
            district: "Quận 1",
            ward: "Bến Nghé",
            streetAddress: "456 Đường Payment"
        },
        paymentMethod: "VNPAY",
        itemsPrice: 500000,
        shippingPrice: 30000,
        totalPrice: 530000
    };

    const vnpOrderRes = await callApi('/orders', 'POST', vnpayOrder);
    
    if (vnpOrderRes?.paymentUrl) {
        console.log("✅ Tạo đơn VNPAY thành công!");
        console.log("👉 Link thanh toán:", vnpOrderRes.paymentUrl);
    } else {
        console.log("Kết quả tạo đơn VNPAY:", vnpOrderRes);
    }

    console.log("\n=== KẾT THÚC TEST ===");
}

// Chạy hàm
runSeed();