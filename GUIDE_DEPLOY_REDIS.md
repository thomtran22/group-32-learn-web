
# HƯỚNG DẪN TRIỂN KHAI (DEPLOYMENT GUIDE)

Tài liệu này hướng dẫn bạn cách thiết lập Redis trên Cloud và định hướng các bước để đưa toàn bộ dự án (Frontend + Backend) lên môi trường internet (Production).

---

## PHẦN 1: TRIỂN KHAI REDIS TRÊN CLOUD

Để không phải cài đặt Redis nặng máy và để database có thể truy cập từ mọi nơi (cả localhost lẫn khi deploy sau này), chúng ta sẽ dùng **Redis Cloud** (gói miễn phí trọn đời 30MB, đủ cho dự án học tập/portfolio).

### Bước 1: Đăng ký tài khoản
1. Truy cập: [https://redis.com/try-free/](https://redis.com/try-free/)
2. Đăng ký bằng Google hoặc GitHub.

### Bước 2: Tạo Database
1. Sau khi đăng nhập, chọn **"New Subscription"**.
2. Chọn gói **Fixed Size** (hoặc Free).
3. Chọn Cloud Provider: **AWS** (hoặc Google Cloud).
4. Chọn Region: **Singapore** hoặc **Tokyo** (gần Việt Nam nhất để load nhanh).
5. Đặt tên Database (ví dụ: `learn-web-cache`).
6. Bấm **Create Subscription**.

### Bước 3: Lấy thông tin kết nối (Connection String)
Sau khi tạo xong, bấm vào Database vừa tạo, bạn sẽ thấy:
1. **Public Endpoint**: Ví dụ `redis-12345.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:12345`
2. **Security / Password**: Kéo xuống dưới phần Security để thấy **Default User Password** -> Bấm copy.

### Bước 4: Cấu hình vào dự án
Mở file `backend/.env` trong VS Code và thêm dòng sau:

```env
REDIS_URI=redis://:<MAT_KHAU_CUA_BAN>@<PUBLIC_ENDPOINT_CUA_BAN>
```

**Ví dụ thực tế:**
Nếu endpoint là `redis-18000.abc.com:18000` và mật khẩu là `xyzw123`, thì dòng config sẽ là:
`REDIS_URI=redis://:xyzw123@redis-18000.abc.com:18000`

> **Lưu ý:** Sau khi lưu file `.env`, bạn cần khởi động lại Backend (`CTRL + C` rồi `npm run dev` hoặc `node server.js`) để code nhận cấu hình mới.

---

## PHẦN 2: HƯỚNG DẪN DEPLOY DỰ ÁN (SAU NÀY)

Khi bạn muốn đưa web lên mạng cho mọi người dùng, bạn cần tách Frontend và Backend ra 2 nơi khác nhau. Dưới đây là bộ công cụ miễn phí, dễ dùng và phổ biến nhất cho bộ MERN Stack.

### 1. Kiến trúc tổng quan
*   **Database**: **MongoDB Atlas** (Bạn đã có).
*   **Cache**: **Redis Cloud** (Vừa làm ở trên).
*   **Backend (NodeJS)**: Dùng **Render.com** (Khuyên dùng) hoặc **Railway.app**.
*   **Frontend (ReactJS)**: Dùng **Vercel.com** (Tốt nhất cho React) hoặc **Netlify**.

### 2. Các bước triển khai Backend (Lên Render)
1. Đẩy code Backend lên GitHub.
2. Đăng ký tài khoản [Render.com](https://render.com).
3. Chọn **New +** -> **Web Service**.
4. Kết nối với repo GitHub của bạn.
5. Setup các dòng lệnh:
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
6. **Quan trọng - Environment Variables**:
    *   Vào mục "Environment", copy toàn bộ nội dung trong file `backend/.env` (PORT, MONGO_URI, JWT_SECRET, REDIS_URI...) paste vào đây.
7. Bấm **Create Web Service**. Render sẽ cấp cho bạn 1 đường link ví dụ: `https://my-backend-api.onrender.com`.

### 3. Các bước triển khai Frontend (Lên Vercel)
Trước khi deploy frontend, bạn cần vào code frontend, tìm các chỗ gọi API (ví dụ `http://localhost:4000`) và thay thế bằng đường link Backend mới của Render (`https://my-backend-api.onrender.com`).
*Mẹo: Nên dùng biến môi trường `REACT_APP_API_URL` để tự động đổi.*

1. Đẩy code Frontend lên GitHub.
2. Đăng ký tài khoản [Vercel.com](https://vercel.com).
3. Bấm **Add New Project**.
4. Chọn repo Frontend.
5. Mục **Build & Output Settings**: Mặc định Vercel tự hiểu React (Build command: `npm run build`, Output: `build` hoặc `dist`).
6. Bấm **Deploy**.
7. Vercel sẽ cấp cho bạn domain ví dụ: `https://my-shop.vercel.app`.

### 4. Bước cuối - Đồng bộ
*   Quay lại Google Cloud Console / Facebook Developers (nếu có dùng login GG/FB) để thêm domain mới (`vercel.app` và `onrender.com`) vào danh sách các domain được phép hoạt động (Authorized Domains).

---
**Chúc bạn triển khai thành công!**
