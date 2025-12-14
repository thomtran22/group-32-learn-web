import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:3000/api";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [relatedProductsData, setRelatedProductsData] = useState([]);

  const updateImagesByColor = useCallback((colorName, productData) => {
    if (!productData?.colors) return;

    const colorObj = productData.colors.find((c) => c.name === colorName);

    if (colorObj?.image) {
      setMainImage(colorObj.image);
    }

    if (Array.isArray(productData.images)) {
      setThumbnails(productData.images);
    }
  }, []);

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    updateImagesByColor(colorName, product);
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/products/getproduct/${id}`);
        const data = await res.json();

        setProduct(data);

        const defaultColor = data.colors?.[0]?.name || null;
        const defaultSize = data.sizes?.[0] || null;

        setSelectedColor(defaultColor);
        setSelectedSize(defaultSize);

        if (data.images?.length > 0) {
          setThumbnails(data.images);
          setMainImage(data.images[0]);
        }

        if (defaultColor) {
          updateImagesByColor(defaultColor, data);
        }

        const relatedRes = await fetch(`${BASE_URL}/products/related/${id}`);
        if (relatedRes.ok) {
          setRelatedProductsData(await relatedRes.json());
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, updateImagesByColor]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu và size");
      return;
    }

    alert(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  if (!product)
    return <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>;

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },

    detailMainWrap: {
      display: "grid",
      gridTemplateColumns: "420px 1fr",
      gap: "40px",
      marginBottom: "50px",
    },

    detailImages: {},
    mainImage: {
      border: "1px solid #eee",
      marginBottom: "10px",
    },
    mainImageImg: {
      width: "100%",
      display: "block",
    },

    thumbImages: {
      display: "flex",
      gap: "10px",
    },
    thumbnailImg: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid transparent",
    },
    thumbnailActive: {
      borderColor: "#DC3545",
    },

    productInfoColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },

    productName: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    productPrice: {
      fontSize: "24px",
      color: "#DC3545",
      fontWeight: "bold",
    },

    optionGroup: {
      borderTop: "1px solid #eee",
      paddingTop: "15px",
    },
    optionTitle: {
      fontWeight: "bold",
      marginBottom: "10px",
    },

    colorOptions: {
      display: "flex",
      gap: "10px",
    },
    colorItem: {
      border: "1px solid #ccc",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      gap: "5px",
      alignItems: "center",
    },
    colorItemSelected: {
      borderColor: "#DC3545",
      background: "#fde7e7",
    },
    colorItemImg: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
    },

    sizeOptions: {
      display: "flex",
      gap: "10px",
    },
    sizeItem: {
      border: "1px solid #ccc",
      padding: "8px 15px",
      cursor: "pointer",
    },
    sizeItemSelected: {
      background: "#DC3545",
      color: "#fff",
      borderColor: "#DC3545",
    },

    purchaseActions: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      marginTop: "20px",
    },

    quantityControl: {
      display: "flex",
      border: "1px solid #ccc",
    },
    quantityButton: {
      width: "30px",
      cursor: "pointer",
    },
    quantityInput: {
      width: "40px",
      textAlign: "center",
      border: "none",
    },

    btnAdd: {
      background: "#DC3545",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },

    productDescription: {
      borderTop: "1px solid #eee",
      paddingTop: "20px",
    },

    relatedWrap: {
      marginTop: "60px",
    },
    productListWrap: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.detailMainWrap}>
        <div style={styles.detailImages}>
          <div style={styles.mainImage}>
            <img
              src={mainImage}
              alt={product.name}
              style={styles.mainImageImg}
            />
          </div>

          <div style={styles.thumbImages}>
            {thumbnails.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => handleThumbnailClick(img)}
                style={{
                  ...styles.thumbnailImg,
                  ...(mainImage === img ? styles.thumbnailActive : {}),
                }}
              />
            ))}
          </div>
        </div>

        <div style={styles.productInfoColumn}>
          <h1 style={styles.productName}>{product.name}</h1>
          <div style={styles.productPrice}>
            {product.price.toLocaleString("vi-VN")} VNĐ
          </div>

          <div style={styles.optionGroup}>
            <h3 style={styles.optionTitle}>Màu sắc</h3>
            <div style={styles.colorOptions}>
              {product.colors.map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleColorSelect(c.name)}
                  style={{
                    ...styles.colorItem,
                    ...(selectedColor === c.name
                      ? styles.colorItemSelected
                      : {}),
                  }}
                >
                  <img src={c.image} style={styles.colorItemImg} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.optionGroup}>
            <h3 style={styles.optionTitle}>Size</h3>
            <div style={styles.sizeOptions}>
              {product.sizes.map((s) => (
                <div
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    ...styles.sizeItem,
                    ...(selectedSize === s ? styles.sizeItemSelected : {}),
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.purchaseActions}>
            <div style={styles.quantityControl}>
              <button
                style={styles.quantityButton}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <input value={quantity} readOnly style={styles.quantityInput} />
              <button
                style={styles.quantityButton}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button style={styles.btnAdd} onClick={handleAddToCart}>
              THÊM VÀO GIỎ
            </button>
          </div>

          <div style={styles.productDescription}>
            <h3 style={styles.optionTitle}>Mô tả</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <div style={styles.relatedWrap}>
        <h2>SẢN PHẨM LIÊN QUAN</h2>
        <div style={styles.productListWrap}>
          {relatedProductsData.map((p) => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
