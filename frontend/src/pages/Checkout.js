import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import { apiCreateOrder, apiCreatePaymentUrl } from "../services/orderApi";

// 1. Import Toastify
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, selectedItems, removePurchasedItems } = useCart();

  // Lấy state được gửi từ trang Cart (chứa các sản phẩm đã chọn - Buy Now)
  const location = useLocation();
  const navigate = useNavigate();

  const itemsFromLocation = location.state?.items;

  // Lấy items từ Context (trường hợp người dùng chọn checkbox trong giỏ rồi bấm Checkout)
  const itemsFromContext = cartItems.filter((item) =>
    selectedItems.includes(item.itemId)
  );

  // Logic gộp: Ưu tiên Location, nếu không có thì lấy Context
  const itemsToCheckout =
    itemsFromLocation && itemsFromLocation.length > 0
      ? itemsFromLocation
      : itemsFromContext;

  // Validate: Nếu rỗng thì đá về giỏ hàng
  useEffect(() => {
    if (itemsToCheckout.length === 0) {
      toast.warning("Vui lòng chọn sản phẩm để thanh toán."); // Thêm thông báo cho user hiểu
      navigate("/cart");
    }
  }, [itemsToCheckout, navigate]);

  const checkoutTotal = itemsToCheckout.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const checkoutTotalFormatted = checkoutTotal.toLocaleString("vi-VN");

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    city: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 2. VALIDATION DÙNG TOAST ---
    // Kiểm tra từng trường một để báo lỗi cụ thể
    if (!formData.fullname.trim()) {
      toast.error("Vui lòng nhập Họ tên người nhận.");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập Số điện thoại.");
      return;
    }
    // Regex đơn giản để check số điện thoại VN (tùy chọn)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      toast.warning("Số điện thoại không đúng định dạng.");
      return;
    }

    if (
      !formData.city ||
      !formData.district ||
      !formData.ward ||
      !formData.street.trim()
    ) {
      toast.error("Vui lòng điền đầy đủ địa chỉ giao hàng.");
      return;
    }

    if (formData.email && !formData.email.includes("@")) {
      toast.error("Email không hợp lệ.");
      return;
    }

    setIsLoading(true);

    // Mapping lại địa chỉ
    const shippingAddress = {
      fullName: formData.fullname,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      district: formData.district,
      ward: formData.ward,
      streetAddress: formData.street,
    };

    const orderData = {
      orderItems: itemsToCheckout,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      orderNotes: formData.ordernotes,
    };

    try {
      const response = await apiCreateOrder(orderData);

      if (response.success) {
        const createdOrder = response.order;
        const boughtItemIds = itemsToCheckout.map((item) => item.itemId);

        // Xóa sản phẩm đã mua khỏi giỏ hàng (Context)
        removePurchasedItems(boughtItemIds);

        if (paymentMethod === "VNPAY") {
          // --- Case VNPay ---
          toast.loading("Đang chuyển hướng sang VNPay..."); // Hiện loading

          const vnpayData = {
            orderId: createdOrder._id,
            amount: checkoutTotal,
            language: "vn",
          };

          const vnpayResponse = await apiCreatePaymentUrl(vnpayData);

          if (vnpayResponse.success) {
            window.location.href = vnpayResponse.url;
          } else {
            toast.dismiss(); // Tắt loading
            toast.error("Lỗi tạo URL thanh toán VNPay");
          }
        } else {
          // --- Case COD ---
          toast.success("Đặt hàng thành công! 🎉");

          // Chuyển hướng sau 1 chút để user kịp đọc thông báo (tùy chọn)
          setTimeout(() => {
            navigate("/profile", { replace: true });
          }, 1000);
        }
      } else {
        toast.error(response.message || "Tạo đơn hàng thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi kết nối server");
    } finally {
      // Chỉ tắt loading nếu KHÔNG PHẢI là VNPay (vì VNPay sẽ chuyển trang)
      if (paymentMethod !== "VNPAY") {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="checkout-wrapper">
        <div className="checkout-layout">
          <CheckoutForm formData={formData} handleChange={handleChange} />
          <CheckoutSummary
            items={itemsToCheckout}
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
