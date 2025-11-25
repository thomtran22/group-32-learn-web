import React, {useState, useEffect} from "react";

const CheckoutForm = ({formData, handleChange}) => {

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tỉnh thành:", error);
            }
        };
        fetchProvinces();
    }, []);

    {/*Xử lí khi chọn Tỉnh thành phố*/}
    const handleProvinceChange = async (e) => {
        handleChange(e);
        handleChange({ target: { name: 'district', value: '' } });
        handleChange({ target: { name: 'ward', value: '' } });
        setDistricts([]);
        setWards([]);

        {/*Lấy danh sách Quận/Huyện mới dựa trên code Tỉnh*/}
        const provinceCode = e.target.value;
        if (provinceCode) {
            try {
                const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
                const data = await res.json();
                setDistricts(data.districts);
            } catch (error) {
                console.error("Lỗi lấy quận huyện:", error);
            }
        }
    };

    {/*Xu li khi chon quan huyen */}
    const handleDistrictChange = async (e) => {
        handleChange(e);

        handleChange({target: {name: 'ward', value: ''}});
        setWards([]);

        const districtCode = e.target.value;
        if(districtCode) {
            try {
                const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
                const data = await res.json();
                setWards(data.wards);
            } catch (error) {
                console.error("Lỗi lấy xã phường:", error);
            }
        }
    };

    return (
        <section className="billing-details">
            <h2 className="section-title">ĐỊA CHỈ GIAO HÀNG</h2>
            <form action="#" method="POST">
                {/*Nhap ho ten*/}
                <div className="form-group">
                    <label htmlFor="fullname">Họ và tên *</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname" 
                        placeholder="Họ tên của bạn"
                        value={formData.fullname} // <-- Kết nối với state
                        onChange={handleChange}     // <-- Kết nối với hàm xử lý
                    />
                </div>
                
                {/*Nhap so dien thoai*/}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input 
                            type="tel" id="phone"
                            name="phone"
                            placeholder="Số điện thoại của bạn"
                            value={formData.phone} // <-- Kết nối với state
                            onChange={handleChange}     // <-- Kết nối với hàm xử lý
                        />
                    </div>

                    {/*Nhap email*/}
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input 
                            type="email"
                            id="email" name="email"
                            placeholder="Email của bạn"
                            value={formData.email} // <-- Kết nối với state
                            onChange={handleChange}     // <-- Kết nối với hàm xử lý
                        />
                    </div>
                </div>

                <div className="form-row">
                    {/*Chon tinh thanh pho*/}
                    <div className="form-group">
                        <label htmlFor="city">Tỉnh/Thành phố *</label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city} // <-- Kết nối với state
                            onChange={handleProvinceChange}    // <-- Kết nối với hàm xử lý
                        >
                            <option value="" >Hà Nội</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*Chon quan huyen*/}
                    <div className="form-group">
                        <label htmlFor="district">Quận/Huyện *</label>
                        <select
                            id="district"
                            name="district"
                            value={formData.district} // <-- Kết nối với state
                            onChange={handleDistrictChange} // Dùng hàm xử lý riêng
                            disabled={!formData.city}
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
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
                            onChange={handleChange} // Xã phường chỉ cần handleChange gốc
                            disabled={!formData.district} // Khóa nếu chưa chọn Huyện
                        >
                            <option value="">Chọn xã/phường</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Địa chỉ cụ thể *</label>
                        <input 
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Số nhà, tên đường..."
                            value={formData.street} // <-- Kết nối với state
                            onChange={handleChange}     // <-- Kết nối với hàm xử lý
                        />
                    </div>
                </div>
                
                <h2 className="section-title" style={{ marginTop: '30px' }}>THÔNG TIN BỔ SUNG</h2>
                <div className="form-group">
                    <label htmlFor="ordernotes">Order notes (optional)</label>

                    <textarea
                        id="ordernotes"
                        name="ordernotes"
                        rows="4"
                        placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
                        value={formData.ordernotes}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>
            </form>
        </section>
    );
};

export default CheckoutForm;