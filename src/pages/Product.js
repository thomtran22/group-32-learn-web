// ...existing code...
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product || !id) return;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Lỗi"))
      .finally(() => setLoading(false));
  }, [id, product]);

  if (loading) return <div style={{ padding: 20 }}>Đang tải...</div>;
  if (error)
    return <div style={{ padding: 20, color: "red" }}>Lỗi: {error}</div>;
  if (!product)
    return <div style={{ padding: 20 }}>Sản phẩm không tìm thấy</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
        Quay lại
      </button>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 320px", textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "100%", maxHeight: 360, objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 8px" }}>{product.title}</h1>
          <p style={{ margin: "0 0 8px", color: "#666" }}>{product.category}</p>
          <p style={{ fontSize: 20, fontWeight: "bold", margin: "8px 0" }}>
            {typeof product.price === "number"
              ? product.price.toFixed(2) + " ₫"
              : product.price}
          </p>

          <div style={{ marginTop: 12 }}>
            <h3 style={{ margin: "8px 0" }}>Mô tả</h3>
            <p style={{ whiteSpace: "pre-wrap", color: "#333" }}>
              {product.description}
            </p>
          </div>

          {product.rating && (
            <div style={{ marginTop: 12, color: "#444" }}>
              Đánh giá: {product.rating.rate} / 5 ({product.rating.count} lượt)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// ...existing code...
