import React, { useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaHome,
  FaCheckCircle,
  FaPhone,
} from "react-icons/fa";

// --- Dữ liệu Mock ---
const MOCK_ADDRESSES = [
  {
    id: 1,
    receiver: "Nguyễn Văn A",
    phone: "0901234567",
    detail: "Số 123, Đường XYZ",
    ward: "Phường 1",
    district: "Quận 3",
    city: "TP.HCM",
    isDefault: true,
    type: "Nhà riêng",
  },
  {
    id: 2,
    receiver: "Nguyễn Văn A",
    phone: "0901234567",
    detail: "Tòa nhà ABC, Tầng 5",
    ward: "Phường 2",
    district: "Quận 1",
    city: "TP.HCM",
    isDefault: false,
    type: "Cơ quan",
  },
];

const AddressList = () => {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const openModal = (address = null) => {
    setCurrentAddress(
      address || {
        id: Date.now(),
        receiver: "",
        phone: "",
        detail: "",
        ward: "",
        district: "",
        city: "",
        isDefault: false,
        type: "Nhà riêng",
      }
    );
    setIsModalOpen(true);
  };

  const saveAddress = () => {
    if (currentAddress.id > 1000) {
      // Thêm mới
      setAddresses([
        ...addresses.map((a) => ({ ...a, isDefault: false })),
        currentAddress,
      ]);
    } else {
      // Cập nhật
      setAddresses(
        addresses.map((a) => (a.id === currentAddress.id ? currentAddress : a))
      );
    }
    setIsModalOpen(false);
  };

  const deleteAddress = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const setDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const AddressCard = ({ address }) => (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "6px",
        marginBottom: "15px",
        position: "relative",
      }}
    >
      {address.isDefault && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#c90000",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.8em",
          }}
        >
          <FaCheckCircle style={{ marginRight: "5px" }} /> Mặc định
        </span>
      )}

      <p style={{ margin: "0 0 5px 0", fontWeight: "bold", fontSize: "1.1em" }}>
        {address.receiver} ({address.type})
      </p>
      <p style={{ margin: "0 0 5px 0", color: "#555" }}>
        <FaPhone style={{ marginRight: "5px" }} /> {address.phone}
      </p>
      <p style={{ margin: "0", color: "#555" }}>
        <FaHome style={{ marginRight: "5px" }} />{" "}
        {`${address.detail}, ${address.ward}, ${address.district}, ${address.city}`}
      </p>

      <div
        style={{
          marginTop: "15px",
          borderTop: "1px dashed #eee",
          paddingTop: "10px",
        }}
      >
        {!address.isDefault && (
          <button
            onClick={() => setDefault(address.id)}
            style={{
              padding: "5px 10px",
              marginRight: "10px",
              border: "1px solid #007bff",
              backgroundColor: "white",
              color: "#007bff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Đặt làm mặc định
          </button>
        )}
        <button
          onClick={() => openModal(address)}
          style={{
            padding: "5px 10px",
            marginRight: "10px",
            border: "1px solid #ffc107",
            backgroundColor: "white",
            color: "#ffc107",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <FaEdit /> Chỉnh sửa
        </button>
        <button
          onClick={() => deleteAddress(address.id)}
          style={{
            padding: "5px 10px",
            border: "1px solid #dc3545",
            backgroundColor: "white",
            color: "#dc3545",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <FaTrashAlt /> Xóa
        </button>
      </div>
    </div>
  );

  // Modal đơn giản (dùng cho mục đích demo)
  const AddressModal = () => {
    if (!isModalOpen || !currentAddress) return null;

    const inputStyle = {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "90%",
      marginBottom: "15px",
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            width: "450px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h3>
            {currentAddress.id > 1000
              ? "Thêm Địa Chỉ Mới"
              : "Chỉnh Sửa Địa Chỉ"}
          </h3>
          <hr style={{ marginBottom: "20px" }} />

          <label>Tên Người Nhận:</label>
          <input
            style={inputStyle}
            value={currentAddress.receiver}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, receiver: e.target.value })
            }
          />

          <label>Số Điện Thoại:</label>
          <input
            style={inputStyle}
            value={currentAddress.phone}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, phone: e.target.value })
            }
          />

          <label>Địa Chỉ Chi Tiết (Số nhà, đường...):</label>
          <input
            style={inputStyle}
            value={currentAddress.detail}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, detail: e.target.value })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label>Phường/Xã:</label>
              <input
                style={inputStyle}
                value={currentAddress.ward}
                onChange={(e) =>
                  setCurrentAddress({ ...currentAddress, ward: e.target.value })
                }
              />
            </div>
            <div>
              <label>Quận/Huyện:</label>
              <input
                style={inputStyle}
                value={currentAddress.district}
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    district: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Hủy
            </button>
            <button
              onClick={saveAddress}
              style={{
                padding: "10px",
                backgroundColor: "#c90000",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Lưu Địa Chỉ
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={() => openModal()}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <FaPlus style={{ marginRight: "5px" }} /> Thêm Địa chỉ Mới
        </button>
      </div>

      {addresses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Bạn chưa có địa chỉ nào được lưu.
        </p>
      ) : (
        addresses.map((addr) => <AddressCard key={addr.id} address={addr} />)
      )}

      <AddressModal />
    </div>
  );
};

export default AddressList;
