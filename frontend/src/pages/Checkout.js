import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';

const Checkout = () => {

    const { cartItems } = useCart();

    //Lấy state được gửi từ trang Cart (chứa các sản phẩm đã chọn)
    const location = useLocation();
    const navigate = useNavigate();

    const itemsToCheckout = location.state?.items || cartItems || [];

    const checkoutTotal = itemsToCheckout.reduce((total, item) => total + (item.price * item.quantity), 0);
    const checkoutTotalFormatted = checkoutTotal.toLocaleString('vi-VN');

    const [paymentMethod, setPaymentMethod] = useState('COD');

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

    const handleSubmit = (e) => {
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

        const orderDetails = {
            customerInfo: formData, // Thông tin khách hàng từ form
            orderItems: itemsToCheckout,    // Thông tin sản phẩm từ giỏ hàng
            totalAmount: checkoutTotal, // Dùng số, không dùng chuỗi đã format
            paymentMethod: paymentMethod,
            orderDate: new Date().toISOString()
        };

        console.log('===== ĐƠN HÀNG CHI TIẾT =====');
        console.log(orderDetails);
        console.log('============================');
        
        switch(paymentMethod) {
            case 'COD':
                alert('✅ Đặt hàng thành công!\n\nBạn sẽ thanh toán khi nhận hàng.\nChúng tôi sẽ liên hệ với bạn sớm nhất.');
                // TODO: Gửi đơn hàng lên server
                break;
                
            case 'BANKING':
                alert('✅ Đặt hàng thành công!\n\nVui lòng chuyển khoản theo thông tin QR Code đã hiển thị.\nĐơn hàng sẽ được xử lý sau khi nhận được thanh toán.');
                // TODO: Gửi đơn hàng lên server với trạng thái "chờ thanh toán"
                break;
                
            case 'VNPAY':
                alert('Đang chuyển hướng đến cổng thanh toán VNPay...');
                // TODO: Gọi API tạo URL thanh toán VNPay
                // window.location.href = vnpayUrl;

                break;
                
            default:
                alert('Vui lòng chọn phương thức thanh toán.');
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
                    />
                </div>
            </div>
        </>
    );
};

export default Checkout;