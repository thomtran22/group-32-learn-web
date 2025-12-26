import React from "react";
import logo from "../../assets/images/logo.svg";
import footerImg from "../../assets/images/footer.jpg";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* MENU 1 */}
          <div>
            <h3 className="font-bold text-gray-900 text-[13px] uppercase tracking-widest mb-4 inline-block">
              Hệ thống cửa hàng
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="hover:text-black cursor-pointer transition-colors">27 Chùa Bộc, Đống Đa, HN</li>
              <li className="hover:text-black cursor-pointer transition-colors">242 Thái Hà, Đống Đa, HN</li>
              <li className="hover:text-black cursor-pointer transition-colors">63 Đại Cổ Việt, Hai Bà Trưng, HN</li>
              <li className="hover:text-black cursor-pointer transition-colors">69 Quang Trung, Hà Đông, HN</li>
              <li className="hover:text-black cursor-pointer transition-colors">272 Tô Hiệu, Lê Chân, HP</li>
            </ul>
          </div>

          {/* MENU 2 */}
          <div>
            <h3 className="font-bold text-gray-900 text-[13px] uppercase tracking-widest mb-4 inline-block">
              Chính sách & Quy định
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="hover:text-black cursor-pointer transition-colors">Hướng Dẫn Mua Hàng</li>
              <li className="hover:text-black cursor-pointer transition-colors">Hình Thức Thanh Toán</li>
              <li className="hover:text-black cursor-pointer transition-colors">Quy Định Và Bảo Mật Thông Tin</li>
              <li className="hover:text-black cursor-pointer transition-colors">Chính Sách Bảo Hành</li>
              <li className="hover:text-black cursor-pointer transition-colors">Chính Sách Đổi Hàng</li>
              <li className="hover:text-black cursor-pointer transition-colors">Chính Sách Vận Chuyển</li>
              <li className="hover:text-black cursor-pointer transition-colors">Điều Khoản Dịch Vụ</li>
            </ul>
          </div>

          {/* MENU 3 */}
          <div>
            <h3 className="font-bold text-gray-900 text-[13px] uppercase tracking-widest mb-4 inline-block">
              Địa chỉ
            </h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="font-semibold text-black uppercase">Công ty cổ phần thời trang 360</li>
              <li>VPGD: Đội 6, Xã Phương Đình, Huyện Đan Phượng, Hà Nội</li>
              <li>Facebook: <span className="text-blue-600 font-medium cursor-pointer">360Boutique</span></li>
              <li>Hotline: <span className="font-medium text-black">0973 285 886</span></li>
            </ul>
          </div>

          {/* FANPAGE */}
          <div>
            <h3 className="font-bold text-gray-900 text-[13px] uppercase tracking-widest mb-4 inline-block">
              Fanpage
            </h3>
            <div className="border rounded-lg overflow-hidden shadow-sm max-w-[280px]">
              <div className="relative h-24 w-full overflow-hidden bg-gray-200">
                <img 
                  src={footerImg} 
                  alt="fanpage cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white flex items-center gap-3">
                <div className="bg-white p-1 rounded-full border border-gray-100 shadow-sm shrink-0 -mt-6 z-10">
                    <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex flex-col -mt-1">
                  <span className="text-sm font-bold text-gray-800">360 Boutique</span>
                  <span className="text-[10px] text-gray-500">540k lượt thích</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;