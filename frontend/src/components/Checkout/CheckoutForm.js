import React, {useState, useEffect} from "react";

const CheckoutForm = ({formData, handleChange}) => {

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCodes, setSelectedCodes] = useState({
        city: '',
        district: '',
        ward: ''
    });

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
        const provinceCode = e.target.value;

        setSelectedCodes(prev => ({ ...prev, city: provinceCode, district: '', ward: '' }));

        {/*Lấy danh sách Quận/Huyện mới dựa trên code Tỉnh*/}
        const selectedProvince = provinces.find(p => p.code == provinceCode);
        const provinceName = selectedProvince ? selectedProvince.name : '';

        // Update formData: Lưu Tên Tỉnh, Reset Huyện và Xã
        handleChange({ target: { name: 'city', value: provinceName } }); 
        handleChange({ target: { name: 'district', value: '' } });
        handleChange({ target: { name: 'ward', value: '' } });
        
        setDistricts([]);
        setWards([]);

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
        const districtCode = e.target.value;
        
        setSelectedCodes(prev => ({ ...prev, district: districtCode, ward: '' }));

        const selectedDistrict = districts.find(d => d.code == districtCode);
        const districtName = selectedDistrict ? selectedDistrict.name : '';

        handleChange({ target: { name: 'district', value: districtName } });
        handleChange({ target: { name: 'ward', value: '' } });
        setWards([]);

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

    const handleWardChange = (e) => {
        const wardCode = e.target.value;

        setSelectedCodes(prev => ({ ...prev, ward: wardCode }));
        
        const selectedWard = wards.find(w => w.code == wardCode);
        const wardName = selectedWard ? selectedWard.name : '';
        
        handleChange({ target: { name: 'ward', value: wardName } });
    }

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
                        value={formData.fullname}
                        onChange={handleChange} 
                    />
                </div>
                
                <div className="form-row">
                    {/*Nhap so dien thoai*/}
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input 
                            type="tel" id="phone"
                            name="phone"
                            placeholder="Số điện thoại của bạn"
                            value={formData.phone} 
                            onChange={handleChange}
                        />
                    </div>

                    {/*Nhap email*/}
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input 
                            type="email"
                            id="email" name="email"
                            placeholder="Email của bạn"
                            value={formData.email}
                            onChange={handleChange}
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
                            value={selectedCodes.city} 
                            onChange={handleProvinceChange}
                        >
                            <option value="">-- Chọn Tỉnh/Thành phố --</option>
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
                            value={selectedCodes.district}
                            onChange={handleDistrictChange} // Dùng hàm xử lý riêng
                            disabled={districts.length === 0}
                        >
                            <option value="">-- Chọn Quận/Huyện --</option>
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
                            value={selectedCodes.ward}
                            onChange={handleWardChange} // Xã phường chỉ cần handleChange gốc
                            disabled={wards.length === 0} // Khóa nếu chưa chọn Huyện
                        >
                            <option value="">-- Chọn Xã/Phường --</option>
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
                            value={formData.street} 
                            onChange={handleChange}     
                        />
                    </div>
                </div>
                
                <h2 className="section-title">THÔNG TIN BỔ SUNG</h2>
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