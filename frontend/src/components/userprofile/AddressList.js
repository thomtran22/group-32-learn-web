import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaHome,
  FaCheckCircle,
  FaPhone,
} from "react-icons/fa";

import axiosClient from "../../utils/axiosConfig";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("/user/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Lỗi khi tải địa chỉ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const newAddressTemplate = {
    receiverName: "",
    phone: "",
    addressDetail: "",
    ward: "",
    district: "",
    city: "",
    isDefault: false,
    type: "Nhà riêng",
  };

  const openModal = (address = null) => {
    setCurrentAddress(address || newAddressTemplate);
    setIsModalOpen(true);
  };

  const saveAddress = async () => {
    if (!currentAddress.receiverName || !currentAddress.phone) {
      alert("Vui lòng nhập đầy đủ Tên người nhận và Số điện thoại.");
      return;
    }
    setIsLoading(true);

    const addressToSave = { ...currentAddress };
    delete addressToSave._id;
    delete addressToSave.userId;

    try {
      if (currentAddress._id) {
        await axiosClient.put(
          `/user/addresses/${currentAddress._id}`,
          addressToSave
        );
      } else {
        await axiosClient.post("/user/addresses", addressToSave);
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ:", error);
      setIsLoading(false);
      alert("Lưu địa chỉ thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  const deleteAddress = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      setIsLoading(true);
      try {
        await axiosClient.delete(`/user/addresses/${id}`);
        fetchAddresses();
      } catch (error) {
        console.error("Lỗi khi xóa địa chỉ:", error);
        setIsLoading(false);
        alert("Xóa địa chỉ thất bại.");
      }
    }
  };

  const setDefault = async (id) => {
    setIsLoading(true);
    try {
      const addressToUpdate = addresses.find((addr) => addr._id === id);

      await axiosClient.put(`/user/addresses/${id}`, {
        ...addressToUpdate,
        isDefault: true,
      });

      fetchAddresses();
    } catch (error) {
      console.error("Lỗi khi đặt mặc định:", error);
      setIsLoading(false);
      alert("Đặt mặc định thất bại.");
    }
  };

  const AddressCard = ({ address }) => (
    <div
      style={{
        border: address.isDefault ? "2px solid #c90000" : "1px solid #ddd",
        padding: "15px",
        borderRadius: "6px",
        marginBottom: "15px",
        position: "relative",
        backgroundColor: address.isDefault ? "#fff5f5" : "white",
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
        {address.receiverName} ({address.type})
      </p>
      <p style={{ margin: "0 0 5px 0", color: "#555" }}>
        <FaPhone style={{ marginRight: "5px" }} /> {address.phone}
      </p>
      <p style={{ margin: "0", color: "#555" }}>
        <FaHome style={{ marginRight: "5px" }} />{" "}
        {`${address.addressDetail}, ${address.ward ? address.ward + ", " : ""}${
          address.district
        }, ${address.city}`}
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
            onClick={() => setDefault(address._id)}
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
        {!address.isDefault && (
          <button
            onClick={() => deleteAddress(address._id)}
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
        )}
      </div>
    </div>
  );

  const AddressModal = () => {
    if (!isModalOpen || !currentAddress) return null;

    const inputStyle = {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "90%",
      marginBottom: "15px",
    };

    const isEditing = !!currentAddress._id;

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
          <h3>{isEditing ? "Chỉnh Sửa Địa Chỉ" : "Thêm Địa Chỉ Mới"}</h3>
          <hr style={{ marginBottom: "20px" }} />

          <label>Tên Người Nhận:</label>
          <input
            style={inputStyle}
            value={currentAddress.receiverName || ""}
            onChange={(e) =>
              setCurrentAddress({
                ...currentAddress,
                receiverName: e.target.value,
              })
            }
          />

          <label>Số Điện Thoại:</label>
          <input
            style={inputStyle}
            value={currentAddress.phone || ""}
            onChange={(e) =>
              setCurrentAddress({ ...currentAddress, phone: e.target.value })
            }
          />

          <label>Địa Chỉ Chi Tiết (Số nhà, đường...):</label>
          <input
            style={inputStyle}
            value={currentAddress.addressDetail || ""}
            onChange={(e) =>
              setCurrentAddress({
                ...currentAddress,
                addressDetail: e.target.value,
              })
            }
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label>Phường/Xã:</label>
              <input
                style={inputStyle}
                value={currentAddress.ward || ""}
                onChange={(e) =>
                  setCurrentAddress({ ...currentAddress, ward: e.target.value })
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Quận/Huyện:</label>
              <input
                style={inputStyle}
                value={currentAddress.district || ""}
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    district: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <label>Tỉnh/Thành phố:</label>
          <input
            style={inputStyle}
            value={currentAddress.city || ""}
            onChange={(e) =>
              setCurrentAddress({
                ...currentAddress,
                city: e.target.value,
              })
            }
          />

          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              id="isDefault"
              checked={currentAddress.isDefault || false}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  isDefault: e.target.checked,
                })
              }
              style={{ marginRight: "10px" }}
            />
            <label htmlFor="isDefault">Đặt làm địa chỉ mặc định</label>
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
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
            <button
              onClick={saveAddress}
              disabled={isLoading}
              style={{
                padding: "10px",
                backgroundColor: "#c90000",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Đang xử lý..." : "Lưu Địa Chỉ"}
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
          disabled={isLoading}
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

      {isLoading ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Đang tải địa chỉ...
        </p>
      ) : addresses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Bạn chưa có địa chỉ nào được lưu.
        </p>
      ) : (
        addresses.map((addr) => <AddressCard key={addr._id} address={addr} />)
      )}

      <AddressModal />
    </div>
  );
};

export default AddressList;
