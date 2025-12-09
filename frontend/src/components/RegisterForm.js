import React from 'react';

// Hàm hỗ trợ tạo danh sách tùy chọn cho Ngày/Tháng/Năm
const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
};

function RegisterForm({ formData, handleChange, handleSubmit, toggleForm }) {
    const currentYear = new Date().getFullYear();
    const years = generateOptions(1900, currentYear);
    const days = generateOptions(1, 31);
    const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="modal-title-register">Tạo tài khoản mới</h2>

            <div className="form-group">
                <input type="text" name="fullName" placeholder="Họ và Tên" value={formData.fullName} onChange={handleChange} required/>
            </div>
            {/* Ngày sinh */}
            <div className="form-group">
                <label className="label-with-icon">Ngày tháng năm sinh <span className="help-icon">?</span></label>
                <div className="form-row form-date">
                    <select name="birthDay" value={formData.birthDay || '1'} onChange={handleChange}>
                        {days}
                    </select>
                    <select name="birthMonth" value={formData.birthMonth || '12'} onChange={handleChange}>
                        {months.map((month, index) => (
                            <option key={index + 1} value={index + 1}>{month}</option>
                        ))}
                    </select>
                    <select name="birthYear" value={formData.birthYear || currentYear} onChange={handleChange}>
                        {years}
                    </select>
                </div>
            </div>

            {/* Giới tính */}
            <div className="form-group form-group-gender">
                <label className="label-with-icon">Giới tính ?</label>
                <div className="form-row form-gender">
                    {/* Tùy chọn 1: Female */}
                    <div className="gender-option">
                        <label htmlFor="gender-female">Nữ</label>
                        <input type="radio" id="gender-female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                    </div>
                    {/* Tùy chọn 2: Male */}
                    <div className="gender-option">
                        <label htmlFor="gender-male">Nam</label>
                        <input type="radio" id="gender-male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                    </div>
                    {/* Tùy chọn 3: Custom */}
                    <div className="gender-option">
                        <label htmlFor="gender-custom">Khác</label>
                        <input type="radio" id="gender-custom" name="gender" value="Custom" checked={formData.gender === 'Custom'} onChange={handleChange} />
                    </div>
                </div>
            </div>

            {/* Email/SĐT & Mật khẩu */}
            <div className="form-group">
                <input 
                    type="email" 
                    name="email"
                    placeholder="Nhập email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    name="password"
                    placeholder="Nhập mật khẩu" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn-main-action btn-register-green">
                Đăng ký
            </button>
            
            <p className="link-login-bottom"><a href="#" onClick={(e) => {e.preventDefault(); toggleForm(true);}}>Already have an account?</a></p>
        </form>
    );
}

export default RegisterForm;