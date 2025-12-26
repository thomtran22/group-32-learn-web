// import React from "react";

// function UserRoleBanner({ role, fullName }) {
//   if (!role) return null;

//   let label = "";
//   if (role === "shipper") label = "Tôi là Shipper";
//   if (role === "customer") label = "Tôi là Khách hàng";
// // client gửi token jwt(được server cấp khi đăng nhập ) cho server,
// // server giải mã lấy ra role, kiểm tra -> trả về trang tương ứng 
//   return (
//     <div style={{
//       padding: "10px 20px",
//       background: "#f0f0f0",
//       marginBottom: "20px",
//       borderRadius: "6px",
//       fontWeight: "bold",
//     }}>
//       👋 Xin chào {fullName}! — {label}
//     </div>
//   );
// }

// export default UserRoleBanner;