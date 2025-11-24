import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import LoginModal from '../login/LoginModal';
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from '../../context/CartContext';

function Header() {
  const { cartCount } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const navLinkClass = ({ isActive }) =>
    `text-xl md:text-lg font-bold tracking-widest transition duration-150 uppercase border-b-2 pb-1 ${isActive
      ? "text-red-600 border-red-600"
      : "text-gray-800 border-transparent hover:text-red-600"
    }`;
  return (
    <>
      {/* Top Header */}
      <div className="bg-[#F5F5F5] py-4 md:py-[6px] text-center text-xl md:text-base font-['Inter_Tight']">
        <div className="container mx-auto px-4 md:px-[15px] max-w-[1180px]">
          <div className="inner-title">
            Hotline Mua Hàng: **0973 285 886** | Hotline CSKH: **1900 886 803** - Ext 1 | Email CSKH: **360boutique.vn@gmail.com**
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky py-5 shadow-md md:py-[5px] lg:pb-[25px]">
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
              <div className="header-actions flex items-center gap-4 shrink-0">
                {/* Giỏ hàng */}
                {/* Giỏ hàng */}
                <Link to="/cart" className="relative group p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
                  <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-red-600" />

                  {/* Hiển thị số lượng: Chỉ hiện khi lớn hơn 0 */}
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Người dùng */}
              <div
                className="flex items-center gap-2 group p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setIsModalOpen(true);
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-red-100 transition-colors">
                  <FaUser className="text-xl text-gray-600 group-hover:text-red-600" />
                </div>
              </div>
              </div>
            </div>

            {/* Navigation*/}
            <nav className="inner-bottom mt-4">
              <ul className="flex justify-between items-center list-none p-0 m-0">
                <li>
                  <NavLink to="/" end className={navLinkClass}>TRANG CHỦ</NavLink>
                </li>
                <li>
                  <NavLink to="/category/ao-nam" className={navLinkClass}>ÁO NAM</NavLink>
                </li>
                <li>
                  <NavLink to="/category/quan-nam" className={navLinkClass}>QUẦN NAM</NavLink>
                </li>
                <li>
                  <NavLink to="/category/phu-kien" className={navLinkClass}>PHỤ KIỆN</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default Header;