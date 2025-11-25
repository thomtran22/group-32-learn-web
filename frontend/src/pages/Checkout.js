import React, {useState} from "react";
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';

const Checkout = () => {

    const { cartItems, totalAmount, totalAmountFormatted } = useCart();

    const [paymentMethod, setPaymentMethod] = useState('COD');

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: 'nguyenvathienkf3232@gmail.com',
        city: 'hanoi',
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

        const orderDetails = {
            customerInfo: formData, // Thông tin khách hàng từ form
            orderItems: cartItems,   // Thông tin sản phẩm từ giỏ hàng
            totalAmount: totalAmount, // Dùng số, không dùng chuỗi đã format
            paymentMethod: paymentMethod
        };

        console.log('ĐƠN HÀNG:', orderDetails);
        
        if(paymentMethod === 'VNPAY'){
            alert("Đang chuyển hướng sang cổng thanh toán VNPAY Sandbox...");

        } else if (paymentMethod === 'BANKING') {
            alert("Vui lòng hoàn tất chuyển khoản để chúng tôi giao hàng!");
        } else {
            alert('Đặt hàng COD thành công! Chúng tôi sẽ liên hệ sớm.');
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
                        items={cartItems}
                        total={totalAmountFormatted}
                        totalNumber={totalAmount}
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