// import React, { useState } from 'react';
// import { Link, NavLink } from "react-router-dom";
// import logo from "../../assets/images/logo.svg";
// import LoginModal from '../login/LoginModal';
// import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
// import { useCart } from '../../context/CartContext';
// function Header() {
//   const { cartCount } = useCart();

//   // Menu link với hiệu ứng gạch chân mượt mà hơn
//   const navLinkClass = ({ isActive }) =>
//     `relative text-sm md:text-base font-semibold tracking-[0.1em] transition-all duration-300 uppercase py-2 ${
//       isActive
//         ? "text-red-600 after:w-full"
//         : "text-gray-600 hover:text-red-600 after:w-0"
//     } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full`;

//   return (
//     <>
//       {/* Top Header*/}
//       <div className="bg-[#111] py-1 text-center text-[11px] md:text-[13px] text-gray-300 font-light tracking-widest uppercase">
//         <div className="container mx-auto px-4 max-w-[1200px]">
//           Free shipping cho đơn hàng từ 500k • Hotline: 0973 285 886
//         </div>
//       </div>

//       {/* Main Header*/}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
//         <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
//           <div className="inner-wrap py-4 lg:py-6">
//             <div className="flex items-center justify-between gap-10">
//               {/* Logo */}
//               <Link to="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
//                 <img src={logo} alt="Logo" className="w-[120px] md:w-[150px]" />
//               </Link>

//               {/* Search*/}
//               <form className="hidden md:flex flex-1 max-w-xl relative group">
//                 <input
//                   type="text"
//                   placeholder="Tìm kiếm sản phẩm..."
//                   className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-200 border rounded-full py-2.5 px-6 pl-12 outline-none text-sm transition-all duration-300"
//                 />
//                 <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
//               </form>

//               {/* Actions */}
//               <div className="flex items-center gap-2 md:gap-5">
//                 <Link to="/cart" className="p-2 text-gray-700 hover:text-red-600 transition-colors relative">
//                   <FaShoppingCart className="text-2xl" />
//                   {cartCount > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//                 <Link to="/profile" className="p-2 text-gray-700 hover:text-red-600 transition-colors relative">
//                   <FaUser className="text-xl" />
//                 </Link>
//               </div>
//             </div>

//             {/* Navigation */}
//             <nav className="mt-6 border-t border-gray-50 pt-4">
//               <ul className="flex justify-between items-center gap-10 list-none p-0 m-0">
//                 <li><NavLink to="/" end className={navLinkClass}>Trang chủ</NavLink></li>
//                 <li><NavLink to="/category/ao-nam" className={navLinkClass}>Áo Nam</NavLink></li>
//                 <li><NavLink to="/category/quan-nam" className={navLinkClass}>Quần Nam</NavLink></li>
//                 <li><NavLink to="/category/phu-kien" className={navLinkClass}>Phụ kiện</NavLink></li>
//               </ul>
//             </nav>

//           </div>
//         </div>
//       </header>
//     </>
//   );
// }
//  export default Header;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import LoginModal from '../login/LoginModal';
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion'; // Thêm Framer Motion cho badge

function Header() {
  const { cartCount } = useCart();

  // Menu link với hiệu ứng gạch chân mượt mà hơn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate(); 

  const navLinkClass = ({ isActive }) =>
    `relative text-sm md:text-base font-semibold tracking-[0.1em] transition-all duration-300 uppercase py-2 ${
      isActive
        ? "text-red-600 after:w-full"
        : "text-gray-600 hover:text-red-600 after:w-0"
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full`;

  const handleUserClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile"); // đúng route của Anh
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Header*/}
      <div className="bg-[#111] py-1 text-center text-[11px] md:text-[13px] text-gray-300 font-light tracking-widest uppercase">
        <div className="container mx-auto px-4 max-w-[1200px]">
          Free shipping cho đơn hàng từ 500k • Hotline: 0973 285 886
        </div>
      </div>

      {/* Main Header*/}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
          <div className="inner-wrap py-4 lg:py-6">
            <div className="flex items-center justify-between gap-10">
              {/* Logo */}
              <Link to="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
                <img src={logo} alt="Logo" className="w-[120px] md:w-[150px]" />
              </Link>

              {/* Search*/}
              <form className="hidden md:flex flex-1 max-w-xl relative group">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-gray-200 border rounded-full py-2.5 px-6 pl-12 outline-none text-sm transition-all duration-300"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
              </form>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-5">
                <Link to="/cart" className="p-2 text-gray-700 hover:text-red-600 transition-colors relative group">
                  <FaShoppingCart className="text-2xl transition-transform group-hover:scale-110" />
                  
                  {/* Badge số lượng với hiệu ứng nảy số */}
                  <AnimatePresence mode="popLayout">
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount} // Key thay đổi mỗi khi cartCount đổi giúp trigger animation nảy
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md ring-2 ring-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              
                {/* User – CHỈ ĐỔI onClick */}
                <div
                  className="flex items-center gap-2 group p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer"
                  onClick={handleUserClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ")
                      handleUserClick();
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-red-100 transition-colors">
                    <FaUser className="text-xl text-gray-600 group-hover:text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 border-t border-gray-50 pt-4">
              <ul className="flex justify-between items-center gap-10 list-none p-0 m-0">
                <li><NavLink to="/" end className={navLinkClass}>Trang chủ</NavLink></li>
                <li><NavLink to="/category/ao-nam" className={navLinkClass}>Áo Nam</NavLink></li>
                <li><NavLink to="/category/quan-nam" className={navLinkClass}>Quần Nam</NavLink></li>
                <li><NavLink to="/category/phu-kien" className={navLinkClass}>Phụ kiện</NavLink></li>
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