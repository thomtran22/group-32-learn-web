import React, { useState } from 'react';
import LoginForm from './LoginForm';      
import RegisterForm from './RegisterForm'; 

function LoginModal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Female', 
    birthDay: '1',
    birthMonth: '12',
    birthYear: new Date().getFullYear().toString(),
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
        // Todo: Logic gọi API để xử lý việc xác thực và lưu trữ dữ liệu người dùng
      console.log("Đăng nhập:", formData.email, formData.password);
      alert("Xử lý Đăng nhập...");
    } else {
      console.log("Đăng ký chi tiết:", formData);
      alert("Xử lý Đăng ký...");
    }
  };
  
  const toggleForm = (shouldBeLogin) => {
    setIsLogin(shouldBeLogin);
    // Reset data khi chuyển đổi
    setFormData({ 
        email: '', 
        password: '', 
        firstName: '', 
        lastName: '',
        gender: 'Female',
        birthDay: '1',
        birthMonth: '12',
        birthYear: new Date().getFullYear().toString(),
    }); 
  }

  return (
    <div className="modal-backdrop" onClick={closeModal}> 
      <div 
        className={isLogin ? "login-modal-content login-style" : "login-modal-content register-style"} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hiển thị form tương ứng */}
        {isLogin ? (
            <LoginForm 
                formData={formData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                toggleForm={toggleForm}
            />
        ) : (
            <RegisterForm
                formData={formData} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit}
                toggleForm={toggleForm}
            />
        )}
        
      </div>
    </div>
  );
}

export default LoginModal;