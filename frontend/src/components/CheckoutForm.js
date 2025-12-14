import React from "react";

const CheckoutForm = ({ formData, handleChange }) => {
  return (
    <section className="billing-details">
      <h2 className="section-title">ĐỊA CHỈ GIAO HÀNG</h2>
      <form action="#" method="POST">
        <div className="form-group">
          <label htmlFor="fullname">Họ và tên *</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Họ tên của bạn"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Số điện thoại của bạn"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">Tỉnh/Thành phố *</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="hanoi">Hà Nội</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">Quận/Huyện *</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
            >
              <option value="" disabled>
                Chọn quận huyện
              </option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ward">Xã/Phường *</label>
            <select
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
            >
              <option value="" disabled>
                Chọn xã/phường
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street address *</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Ví dụ: Số 20, ngõ 90"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2 className="section-title" style={{ marginTop: "30px" }}>
          THÔNG TIN BỔ SUNG
        </h2>
        <div className="form-group">
          <label htmlFor="ordernotes">Order notes (optional)</label>

          <textarea
            id="ordernotes"
            name="ordernotes"
            rows="4"
            placeholder="Notes about your order, e.g. special notes for delivery."
            value={formData.ordernotes}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
