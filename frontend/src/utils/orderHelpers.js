export const formatMoney = (amount) => {
  return amount?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const getStatusInfo = (status) => {
  switch (status) {
    case "Pending": // CODE
      return { text: "Chờ xác nhận", color: "#ffad0d" };
    case "Processing": // BANK
      return { text: "Đang chuẩn bị hàng", color: "#2196f3" };
    case "Shipping":
      return { text: "Đang giao hàng", color: "#00bcd4" };
    case "Delivered":
      return { text: "Giao thành công", color: "#4caf50" };
    case "Completed":
      return { text: "Đã hoàn thành", color: "#2e7d32" };
    case "Cancelled": // User bấm hủy đơn
      return { text: "Đã hủy", color: "#f44336" }; // Đỏ
    default:
      return { text: status, color: "#333" };
  }
};

export const ORDER_TABS = [
  { id: "ALL", label: "Tất cả" },
  { id: "PENDING", label: "Chờ thanh toán" },
  { id: "PROCESSING", label: "Đã thanh toán" },
  { id: "SHIPPING", label: "Vận chuyển" },
  { id: "COMPLETED", label: "Hoàn thành" },
  { id: "CANCELLED", label: "Đã hủy" },
];
