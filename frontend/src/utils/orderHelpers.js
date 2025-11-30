export const formatMoney = (amount) => {
    return amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getStatusInfo = (status) => {
    switch (status) {
        case 'Pending':
            return { text: 'CHỜ XÁC NHẬN', color: '#ee4d2d', icon: '⏳' };
        case 'Confirmed':
            return { text: 'ĐÃ XÁC NHẬN', color: '#4caf50', icon: '📝' };
        case 'Processing':
            return { text: 'ĐANG CHUẨN BỊ HÀNG', color: '#2196f3', icon: '📦' };
        case 'Shipping':
            return { text: 'ĐANG GIAO HÀNG', color: '#26aa99', icon: '🚚' };
        case 'Delivered':
            return { text: 'HOÀN THÀNH', color: '#26aa99', icon: '✅' };
        case 'Cancelled':
            return { text: 'ĐÃ HỦY', color: '#757575', icon: '❌' };
        default:
            return { text: status, color: '#000', icon: '' };
    }
};

export const ORDER_TABS = [
    { id: 'All', label: 'Tất cả' },
    { id: 'Pending', label: 'Chờ xác nhận' }, 
    { id: 'Shipping', label: 'Đang giao' },   
    { id: 'Delivered', label: 'Hoàn thành' },
    { id: 'Cancelled', label: 'Đã hủy' },
];