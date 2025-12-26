import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, getStatusInfo } from "../../utils/orderHelpers";
import OrderItem from "./OrderItem";

// Thêm prop onOrderClick
const OrderCard = ({
  order,
  onCancelOrder,
  onConfirmReceived,
  onOrderClick,
  onPayNow,
  onReorder,
}) => {
  const navigate = useNavigate();
  const statusInfo = getStatusInfo(order.status);

  const handleCardClick = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;

    if (onOrderClick) {
      onOrderClick(order._id);
    } else {
      navigate(`/orders/${order._id}`);
    }
  };

  const renderOrderActions = () => {
    if (order.status === "Delivered") {
      return (
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            onConfirmReceived(order._id); // Gọi API confirmOrder ở trên
          }}
        >
          Đã nhận được hàng
        </button>
      );
    }
    if (order.status === "Completed") {
      return (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Ngăn việc bấm vào card nhảy vào trang chi tiết
              onReorder(order); // Gọi logic xử lý ở cha
            }}
            className="btn btn-secondary"
          >
            Mua lại
          </button>
        </>
      );
    }
    if (order.status === "Cancelled") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Ngăn việc bấm vào card nhảy vào trang chi tiết
            onReorder(order); // Gọi logic xử lý ở cha
          }}
          className="btn btn-secondary"
        >
          Mua lại
        </button>
      );
    }
    // if (order.status === 'Shipping') {
    //     return (
    //         <button
    //             className="btn btn-primary"
    //             onClick={() => onConfirmReceived(order._id)}
    //         >
    //             Đã nhận được hàng
    //         </button>
    //     );
    // }
    if (order.status === "Pending") {
      return (
        <>
          {order.paymentMethod === "VNPAY" && !order.isPaid && (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn click lan ra thẻ card
                onPayNow(order);
              }}
            >
              Thanh toán ngay
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onCancelOrder(order._id);
            }}
          >
            Hủy đơn hàng
          </button>
        </>
      );
    }
    if (order.status === "Processing") {
      return (
        <button className="btn btn-secondary" disabled>
          Đang chuẩn bị hàng
        </button>
      );
    }
    return null;
  };

  return (
    <div
      className="order-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="order-card__header">
        <div className="shop-info">
          <span className="shop-name">SHOP THỜI TRANG</span>
        </div>
        <div className="status-group">
          <span className="payment-method-badge">{order.paymentMethod}</span>
          <div className="separator">|</div>
          <span className="status-text" style={{ color: statusInfo.color }}>
            {statusInfo.text.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="order-card__body">
        {order.orderItems.map((item) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </div>

      <div className="order-card__footer">
        <div className="total-section">
          <span className="label">Thành tiền:</span>
          <span className="total-price">{formatMoney(order.totalPrice)}</span>
        </div>

        <div className="action-buttons">
          <span className="shipping-status-text">
            {order.status === "Shipping"
              ? "Đơn hàng đang trên đường giao đến bạn"
              : ""}
          </span>
          <div className="buttons-wrapper">
            {renderOrderActions()}
            {/* Nút Liên hệ */}
            <Link to={`/contact/${order._id}`} className="btn btn-outline">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
