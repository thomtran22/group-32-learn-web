import React from "react";

function RegisterForm({ formData, handleChange, handleSubmit, toggleForm }) {
  const inputClassName =
    "w-full rounded-xl bg-gray-100 px-4 py-2.5 text-base font-medium " +
    "outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-black transition";

  // Radio viền đen + chấm đen ở giữa khi checked
  const radioClassName =
    "h-4 w-4 appearance-none rounded-full border-2 border-black bg-white " +
    "checked:shadow-[inset_0_0_0_4px_#000] " +
    "focus:outline-none focus:ring-2 focus:ring-black/30 transition";

  // Link hiệu ứng underline trồi lên -> nở thành background
  const fancyLinkClassName =
    "relative inline-block font-semibold text-gray-800 px-1 rounded-[4px] " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] " +
    "after:bg-black after:transition-all after:duration-300 after:origin-left after:z-0 " +
    "hover:after:bottom-[2px] hover:after:h-full hover:text-white transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <h2 className="text-xl font-bold text-center">Tạo tài khoản mới</h2>

      {/* Họ & tên */}
      <div className="space-y-1">
        <label className="font-semibold">Họ và tên</label>
        <input
          className={inputClassName}
          type="text"
          name="fullName"
          placeholder="Nguyễn Văn A"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Date + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        {/* Ngày sinh */}
        <div className="space-y-1">
          <label className="font-semibold">Ngày sinh</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
            className={inputClassName}
          />
        </div>

        {/* Giới tính (căn giữa cụm radio) */}
        <div className="space-y-1">
          <label className="font-semibold">Giới tính</label>

          <div className="flex items-center justify-center gap-6 pt-2">
            {[
              { label: "Nữ", value: "Female" },
              { label: "Nam", value: "Male" },
              { label: "Khác", value: "Custom" },
            ].map((genderOption) => (
              <label
                key={genderOption.value}
                className="flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="gender"
                  value={genderOption.value}
                  checked={formData.gender === genderOption.value}
                  onChange={handleChange}
                  className={radioClassName}
                />
                <span className="leading-none">{genderOption.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="font-semibold">Email</label>
        <input
          className={inputClassName}
          type="email"
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Mật khẩu */}
      <div className="space-y-1">
        <label className="font-semibold">Mật khẩu</label>
        <input
          className={inputClassName}
          type="password"
          name="password"
          placeholder="Tối thiểu 8 ký tự"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-xl bg-black py-2.5 text-base font-bold text-white
                   hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                   active:scale-[0.98] transition"
      >
        ĐĂNG KÝ
      </button>

      {/* Back to login */}
      <p className="text-center">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={() => toggleForm(true)}
          className={fancyLinkClassName}
        >
          <span className="relative z-10">Đăng nhập</span>
        </button>
      </p>
    </form>
  );
}

export default RegisterForm;
