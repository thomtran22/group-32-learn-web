import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import LoginModal from '../login/LoginModal';
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      {/* Top Header */}
      <div className="bg-[#F5F5F5] py-4 md:py-[18px] text-center text-xl md:text-base font-['Inter_Tight']">
        <div className="container mx-auto px-4 md:px-[15px] max-w-[1180px]">
          <div className="inner-title">
            Hotline Mua Hàng: **0973 285 886** | Hotline CSKH: **1900 886 803** - Ext 1 | Email CSKH: **360boutique.vn@gmail.com**
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="py-10 md:py-[40px] lg:pb-[25px]">
        <div className="container mx-auto px-4 md:px-[15px] max-w-[1180px]">
          <div className="inner-wrap">
            {/* Header Top Section */}
            <div className="inner-top flex items-end gap-[8%] pb-6 border-b border-[#E6D7D7]">
              {/* Logo */}
              <Link to="/" className="inner-logo shrink-0">
                <img src={logo} alt="Logo" className="max-w-[140px]" />
              </Link>
              
              {/* Search Form */}
              <form className="inner-form flex-1 h-10">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full border-none outline-none py-2 px-4 lg:pl-[100px] bg-[#F5F5F5] text-xl md:text-lg placeholder-gray-500"
                />
              </form>

              {/* Actions (Cart & Login) */}
              <div className="header-actions flex gap-2 shrink-0">
                <Link to="/cart" className="btn-cart">
                <FaShoppingCart className="btn-cart-1"/>
              </Link>
                <div 
                className="btn-login"
                onClick={()=> setIsModalOpen(true)}>
                  <FaUser className="btn-user"/>
              </div> 
              </div>
            </div>

            {/* Navigation*/}
            <nav className="inner-bottom mt-4">
              <ul className="flex justify-between items-center list-none p-0 m-0">
                <li><Link to="/" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150">Trang chủ</Link></li>
                <li><Link to="/products/ao-len" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150">Áo thu đông</Link></li>
                <li><Link to="/" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150">Áo xuân hè</Link></li>
                <li><Link to="/" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150">Phụ kiện</Link></li>
                <li><Link to="/" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150 hidden lg:inline">Hệ thống cửa hàng</Link></li>
                <li><Link to="/" className="text-xl md:text-lg font-normal hover:text-red-600 transition duration-150 hidden md:inline">Thông tin</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {isModalOpen && <LoginModal closeModal = {closeModal}/>}
    </>
  );
}

export default Header;