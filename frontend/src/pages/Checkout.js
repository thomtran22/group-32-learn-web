import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSummary from '../components/checkout/CheckoutSummary';


import { apiCreateOrder, apiCreatePaymentUrl } from '../services/orderApi';

const Checkout = () => {

    const { cartItems, clearCart, selectedItems, removePurchasedItems } = useCart();

    //Lấy state được gửi từ trang Cart (chứa các sản phẩm đã chọn)
    const location = useLocation();
    const navigate = useNavigate();

    const itemsFromLocation = location.state?.items;

    // Lấy items từ Context (trường hợp người dùng F5 hoặc điều hướng bình thường từ giỏ)
    const itemsFromContext = cartItems.filter(item => selectedItems.includes(item.itemId)); 

    // 3. Logic gộp: Ưu tiên Location, nếu không có thì lấy Context
    const itemsToCheckout = (itemsFromLocation && itemsFromLocation.length > 0) 
                            ? itemsFromLocation 
                            : itemsFromContext;

    // 4. Nếu vẫn rỗng (người dùng gõ thẳng URL /checkout mà chưa chọn gì), về trang chủ hoặc giỏ hàng
    useEffect(() => {
        if (itemsToCheckout.length === 0) {
            navigate('/cart');
        }
    }, [itemsToCheckout, navigate]);

    const checkoutTotal = itemsToCheckout.reduce((total, item) => total + (item.price * item.quantity), 0);
    const checkoutTotalFormatted = checkoutTotal.toLocaleString('vi-VN');

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        ordernotes: ''
    });

    const handleChange = (e) => {
        // e.target chính là thẻ input/select/textarea đang được thay đổi
        const { name, value } = e.target;
        
        // Cập nhật lại state
        setFormData(prevState => ({
            ...prevState, // Giữ lại tất cả các giá trị cũ
            [name]: value // Chỉ cập nhật thuộc tính có `name` tương ứng với giá trị `value` mới
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullname || !formData.phone) {
            alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
            return; // Dừng lại nếu thiếu thông tin
        }

        if (!formData.district || !formData.ward || !formData.street) {
            alert('Vui lòng điền đầy đủ địa chỉ giao hàng.');
            return;
        }

        // Validate email format nếu có nhập
        if (formData.email && !formData.email.includes('@')) {
            alert('Email không hợp lệ.');
            return;
        }

        setIsLoading(true);

        // Mapping lại địa chỉ theo cấu trúc Schema Backend
        const shippingAddress = {
            fullName: formData.fullname,
            phone: formData.phone,
            email: formData.email,
            city: formData.city, // Giá trị mặc định hoặc từ form
            district: formData.district,
            ward: formData.ward,
            streetAddress: formData.street
        };

        const orderData = {
            orderItems: itemsToCheckout,    // Thông tin sản phẩm từ giỏ hàng
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            // itemsPrice: checkoutTotal,
            // shippingPrice: 0, // Hardcode freeship hoặc tính toán
            // totalPrice: checkoutTotal,
            orderNotes: formData.ordernotes
        };

        try {
            const response = await apiCreateOrder(orderData);

            if (response.success) {

                const createdOrder = response.order;
                
                const boughtItemIds = itemsToCheckout.map(item => item.itemId);
                if (paymentMethod === 'VNPAY') {
                    console.log("Đang tạo URL thanh toán VNPay...");

                    removePurchasedItems(boughtItemIds);

                    const vnpayData = {
                        orderId: createdOrder._id, // Dùng ID đơn hàng vừa tạo làm mã giao dịch
                        amount: checkoutTotal,     // Số tiền
                        language: 'vn'
                    };

                    const vnpayResponse = await apiCreatePaymentUrl(vnpayData);

                    if (vnpayResponse.success) {
                        // Chuyển hướng người dùng sang VNPay Gateway
                        window.location.href = vnpayResponse.url;
                    } else {
                        alert('Lỗi tạo URL thanh toán');
                    }
                } else {
                    // COD
                    removePurchasedItems(boughtItemIds);
                    
                    // Điều hướng tới trang Cảm ơn hoặc Lịch sử đơn hàng
                    // Truyền theo orderId để hiển thị chi tiết
                    // replace: true để user không back lại trang checkout được
                    navigate('/orders', { replace: true });
                }
            } else {
                alert(response.message || 'Tạo đơn hàng thất bại');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || 'Có lỗi xảy ra kết nối server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container">

                <div className="coupon-banner">
                    Have a coupon? <a href="#">Click here to enter your code</a>
                </div>

                <div className="checkout-layout">
                    <CheckoutForm formData={formData} handleChange={handleChange}/>
                    <CheckoutSummary 
                        items={itemsToCheckout} // Truyền đúng biến itemsToCheckout
                        totalAmountFormatted={checkoutTotalFormatted} 
                        totalAmount={checkoutTotal}
                        onSubmit={handleSubmit}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        isLoading={isLoading} 
                    />
                </div>
            </div>
        </>
    );
};

export default Checkout;