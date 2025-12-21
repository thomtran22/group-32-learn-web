import React from "react";

function LoginForm({ formData, handleChange, handleSubmit, toggleForm, goForgotPassword }) {
  const inputClassName =
    "mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-lg font-medium " +
    "outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-black transition";

  // Underline trồi lên -> nở thành background khi hover (chữ luôn nổi lên trên nền)
  const fancyLinkClassName =
    "relative inline-block font-semibold text-gray-800 px-1 rounded-[4px] " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] " +
    "after:bg-black after:transition-all after:duration-300 after:origin-left after:z-0 " +
    "hover:after:bottom-[2px] hover:after:h-full hover:text-white " +
    "active:opacity-80 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <label className="text-xl font-bold">Email*</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClassName}
        />
      </div>

      <div className="form-group">
        <label className="text-xl font-bold">Mật khẩu*</label>
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black py-3 text-lg font-bold text-white tracking-wide
                   hover:bg-white hover:text-black hover:ring-2 hover:ring-black
                   active:scale-[0.98] transition"
      >
        ĐĂNG NHẬP
      </button>

      <div className="space-y-2 text-center text-lg">
        <p>
          Khách hàng mới?{" "}
          <button
            type="button"
            className={fancyLinkClassName}
            onClick={() => toggleForm(false)}
          >
            <span className="relative z-10">Tạo tài khoản</span>
          </button>
        </p>

        <p>
          Quên mật khẩu?{" "}
<button
  type="button"
  className={fancyLinkClassName}
  onClick={goForgotPassword}
>
  <span className="relative z-10">Khôi phục mật khẩu</span>
</button>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;