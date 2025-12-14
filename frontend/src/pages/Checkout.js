import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";

const Checkout = () => {
  const { cartItems, totalAmount, totalAmountFormatted } = useCart();

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "nguyenvathienkf3232@gmail.com",
    city: "hanoi",
    district: "",
    ward: "",
    street: "",
    ordernotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.phone) {
      alert("Vui lòng điền đầy đủ Họ tên và Số điện thoại.");
      return;
    }

    const orderDetails = {
      customerInfo: formData,
      orderItems: cartItems,
      totalAmount: totalAmount,
    };

    console.log("ĐƠN HÀNG SẴN SÀNG ĐỂ GỬI ĐI:", orderDetails);
    alert("Đặt hàng thành công! (Kiểm tra console để xem chi tiết)");
  };

  return (
    <>
      <div className="container">
        <div className="coupon-banner">
          Have a coupon? <a href="#">Click here to enter your code</a>
        </div>

        <div className="checkout-layout">
          <CheckoutForm formData={formData} handleChange={handleChange} />
          <CheckoutSummary
            items={cartItems}
            total={totalAmountFormatted}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
