export const getVnpayMessage = (code) => {
    const config = {
        "00": { icon: "success", title: "Thanh toán thành công", msg: "Giao dịch của bạn đã hoàn tất." },
        "07": { icon: "warning", title: "Giao dịch nghi ngờ", msg: "Trừ tiền thành công nhưng giao dịch bị nghi ngờ gian lận." },
        "09": { icon: "error", title: "Thanh toán thất bại", msg: "Thẻ/Tài khoản chưa đăng ký Internet Banking." },
        "10": { icon: "error", title: "Thanh toán thất bại", msg: "Xác thực thông tin thẻ/tài khoản không đúng quá 3 lần." },
        "11": { icon: "warning", title: "Hết hạn chờ", msg: "Đã hết hạn chờ thanh toán. Vui lòng thực hiện lại." },
        "12": { icon: "error", title: "Thẻ bị khóa", msg: "Thẻ/Tài khoản của quý khách bị khóa." },
        "13": { icon: "error", title: "Sai OTP", msg: "Quý khách nhập sai mật khẩu xác thực (OTP)." },
        "24": { icon: "warning", title: "Đã hủy giao dịch", msg: "Quý khách đã hủy giao dịch." },
        "51": { icon: "error", title: "Số dư không đủ", msg: "Tài khoản không đủ số dư để thực hiện giao dịch." },
        "65": { icon: "error", title: "Vượt quá hạn mức", msg: "Tài khoản đã vượt quá hạn mức giao dịch trong ngày." },
        "75": { icon: "error", title: "Ngân hàng bảo trì", msg: "Ngân hàng thanh toán đang bảo trì." },
        "79": { icon: "error", title: "Sai mật khẩu", msg: "Nhập sai mật khẩu thanh toán quá số lần quy định." },
        "99": { icon: "error", title: "Lỗi không xác định", msg: "Lỗi hệ thống hoặc lỗi chưa xác định từ VNPay." }
    };

    // Nếu mã lỗi trả về không nằm trong danh sách trên thì trả về lỗi mặc định (99)
    return config[code] || config["99"];
};