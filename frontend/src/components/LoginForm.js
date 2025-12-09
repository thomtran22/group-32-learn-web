import React from 'react';

function LoginForm({ formData, handleChange, handleSubmit, toggleForm }) {
  
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Email*</label>
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
            <label>Mật khẩu*</label>
            <input 
                type="password" 
                name="password"
                placeholder="Mật khẩu" 
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>
        
        <button type="submit" className="btn-main-action">
            ĐĂNG NHẬP
        </button>

        <div className="modal-footer-links">
            <p>Khách hàng mới? <button className="link-btn" onClick={() => toggleForm(false)}>Tạo tài khoản</button></p>
            <p>Quên mật khẩu? <button className="link-btn">Khôi phục mật khẩu</button></p>
        </div>
    </form>
  );
}

export default LoginForm;