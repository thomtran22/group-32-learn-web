import React, { useState, useEffect } from "react";

const CheckoutForm = ({ formData, handleChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCodes, setSelectedCodes] = useState({
        city: '',
        district: '',
        ward: ''
    });

    //Lấy danh sách Tỉnh/Thành phố
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
                const result = await response.json();
                if (result.error === 0) {
                    setProvinces(result.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tỉnh thành:", error);
            }
        };
        fetchProvinces();
    }, []);

    //Xử lý khi chọn Tỉnh/Thành phố
    const handleProvinceChange = async (e) => {
        const provinceCode = e.target.value;
        setSelectedCodes(prev => ({ ...prev, city: provinceCode, district: '', ward: '' }));

        const selectedProvince = provinces.find(p => p.id === provinceCode);
        const provinceName = selectedProvince ? selectedProvince.full_name : '';

        // Cập nhật formData
        handleChange({ target: { name: 'city', value: provinceName } });
        handleChange({ target: { name: 'district', value: '' } });
        handleChange({ target: { name: 'ward', value: '' } });

        setDistricts([]);
        setWards([]);

        if (provinceCode) {
            try {
                const res = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`);
                const result = await res.json();
                if (result.error === 0) {
                    setDistricts(result.data);
                }
            } catch (error) {
                console.error("Lỗi lấy quận huyện:", error);
            }
        }
    };

    //Xử lý khi chọn Quận/Huyện
    const handleDistrictChange = async (e) => {
        const districtCode = e.target.value;
        setSelectedCodes(prev => ({ ...prev, district: districtCode, ward: '' }));

        const selectedDistrict = districts.find(d => d.id === districtCode);
        const districtName = selectedDistrict ? selectedDistrict.full_name : '';

        handleChange({ target: { name: 'district', value: districtName } });
        handleChange({ target: { name: 'ward', value: '' } });
        setWards([]);

        if (districtCode) {
            try {
                const res = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`);
                const result = await res.json();
                if (result.error === 0) {
                    setWards(result.data);
                }
            } catch (error) {
                console.error("Lỗi lấy xã phường:", error);
            }
        }
    };

    //Xử lý khi chọn Xã/Phường
    const handleWardChange = (e) => {
        const wardCode = e.target.value;
        setSelectedCodes(prev => ({ ...prev, ward: wardCode }));

        const selectedWard = wards.find(w => w.id === wardCode);
        const wardName = selectedWard ? selectedWard.full_name : '';

        handleChange({ target: { name: 'ward', value: wardName } });
    };

    return (
        <section className="billing-details">
            <h2 className="section-title">ĐỊA CHỈ GIAO HÀNG</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="fullname">Họ và tên *</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Họ tên của bạn"
                        value={formData.fullname || ''}
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
                            value={formData.phone || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email của bạn"
                            value={formData.email || ''}
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
                            value={selectedCodes.city}
                            onChange={handleProvinceChange}
                        >
                            <option value="">-- Chọn Tỉnh/Thành phố --</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="district">Quận/Huyện *</label>
                        <select
                            id="district"
                            name="district"
                            value={selectedCodes.district}
                            onChange={handleDistrictChange}
                            disabled={districts.length === 0}
                        >
                            <option value="">-- Chọn Quận/Huyện --</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.full_name}
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
                            value={selectedCodes.ward}
                            onChange={handleWardChange}
                            disabled={wards.length === 0}
                        >
                            <option value="">-- Chọn Xã/Phường --</option>
                            {wards.map((ward) => (
                                <option key={ward.id} value={ward.id}>
                                    {ward.full_name}
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
                            value={formData.street || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h2 className="section-title">THÔNG TIN BỔ SUNG</h2>
                <div className="form-group">
                    <label htmlFor="ordernotes">Ghi chú đơn hàng (tùy chọn)</label>
                    <textarea
                        id="ordernotes"
                        name="ordernotes"
                        rows="4"
                        placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
                        value={formData.ordernotes || ''}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </section>
    );
};

export default CheckoutForm;