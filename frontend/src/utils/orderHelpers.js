export const formatMoney = (amount) => {
    return amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getStatusInfo = (status) => {
    switch (status) {
        case 'Pending':
            return { text: 'Chờ xác nhận', color: '#ffad0d' }; // Vàng cam
        case 'Processing':
            return { text: 'Đang chuẩn bị hàng', color: '#2196f3' }; // Xanh dương
        case 'Shipping':
            return { text: 'Đang giao hàng', color: '#00bcd4' }; // Cyan
        case 'Delivered':
            return { text: 'Giao thành công', color: '#4caf50' }; // Xanh lá
        case 'Cancelled':
            return { text: 'Đã hủy', color: '#f44336' }; // Đỏ
        default:
            return { text: status, color: '#333' };
    }
};

export const ORDER_TABS = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'PENDING', label: 'Chờ thanh toán' }, // Map với status Pending
    { id: 'PROCESSING', label: 'Vận chuyển' }, // Gom Processing + Shipping vào 1 tab cho gọn (hoặc tách ra tùy bạn)
    { id: 'DELIVERED', label: 'Hoàn thành' },
    { id: 'CANCELLED', label: 'Đã hủy' },
];

