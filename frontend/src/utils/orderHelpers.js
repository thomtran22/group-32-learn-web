export const formatMoney = (amount) => {
    return amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getStatusInfo = (status) => {
    switch (status) {
        case 'Pending':// chua thanh toan
            return { text: 'Chờ xác nhận', color: '#ffad0d' }; // Vàng cam
        case 'Processing'://da thanh toan
            return { text: 'Đang chuẩn bị hàng', color: '#2196f3' }; // Xanh dương
        case 'Shipping':// shipper nhìn thấy cả các đơn ở trạng thái Pending và Processing
                        // Với mỗi đơn mà shipper nhận đơn để vận chuyển, trạng thái của đơn đó
                        // sẽ lập tức chuyển sang Shipping (update về database)
            return { text: 'Đang giao hàng', color: '#00bcd4' }; // Cyan
        case 'Delivered':// Fix cứng bằng cách Shipper có một nút bấm giao hàng thành công
            return { text: 'Giao thành công', color: '#4caf50' }; // Xanh lá
        case 'Cancelled':// User bấm hủy đơn 
            return { text: 'Đã hủy', color: '#f44336' }; // Đỏ
        default:
            return { text: status, color: '#333' };
    }
};

export const ORDER_TABS = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'PENDING', label: 'Chờ thanh toán' }, // Map với status Pending
    { id: 'PROCESSING', label: 'Vận chuyển' }, 
    { id: 'DELIVERED', label: 'Hoàn thành' },
    { id: 'CANCELLED', label: 'Đã hủy' },
];

