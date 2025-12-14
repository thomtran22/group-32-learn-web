const products = [
    {
        name: "Áo nỉ Fitted L.1 (Navy)",
        price: 399000,
        sku: "AN001DEN", // SKU duy nhất 1
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Đen", "Trắng"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-ni-thun-dai-tay", 
        description: ["Chất liệu nỉ, Phom REGULAR"],
        isBestSeller: true, 
    },
    {
        name: "Áo nỉ Fitted L.2 (Xám)",
        price: 499000,
        sku: "ANH002XAM", // SKU duy nhất 2
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594864/ao_ni_3_zsgafy.jpg"],
        colors: ["Xám", "Đen"],
        sizes: ["L", "XL"],
        category_slug: "ao-ni-thun-dai-tay", 
        description: ["Chất liệu nỉ bông, Phom OVERSIZE"],
        isBestSeller: false, 
    },
    {
        name: "Áo nỉ Fitted L.3 (Trắng)",
        price: 379000,
        sku: "ATD003TRANG", // SKU duy nhất 3
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594848/ao_ni_2_j0tcx3.jpg"],
        colors: ["Trắng", "Xanh navy"],
        sizes: ["M", "L"],
        category_slug: "ao-ni-thun-dai-tay", 
        description: ["Chất liệu cotton dày dặn, Phom REGULAR"],
        isBestSeller: true, 
    },
    {
        name: "Áo nỉ Fitted L.4 (Kem khóa kéo)",
        price: 550000,
        sku: "ANCK004KEM", // SKU duy nhất 4
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594842/ao_ni_1_wly1xc.jpg"],
        colors: ["Kem", "Nâu"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-ni-thun-dai-tay", 
        description: ["Chất liệu nỉ, có khóa kéo cổ"],
        isBestSeller: false, 
    },
    {
        name: "Áo Len Cổ Tròn Dày",
        price: 450000,
        sku: "AL005DEN", // SKU duy nhất 5 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Đen", "Trắng"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-len", 
        description: ["Len dệt kim, Phom REGULAR"],
        isBestSeller: true, 
    },
    {
        name: "Áo Len Cổ Lọ",
        price: 599000,
        sku: "AL006TRANG", // SKU duy nhất 6 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Trắng", "Xám"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-len", 
        description: ["Len cao cấp, Phom SLIM"],
        isBestSeller: true, 
    },
    {
        name: "Áo Len Cổ Lọ",
        price: 599000,
        sku: "AB006TRAN", // SKU duy nhất 6 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Trắng", "Xám"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-cardigan", 
        description: ["Len cao cấp, Phom SLIM"],
        isBestSeller: true, 
    },
    {
        name: "Áo Len Cổ Lọ",
        price: 599000,
        sku: "AB006TRANG", // SKU duy nhất 6 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Trắng", "Xám"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-cardigan", 
        description: ["Len cao cấp, Phom SLIM"],
        isBestSeller: true, 
    },
    {
        name: "Áo Len Cổ Lọ",
        price: 599000,
        sku: "AK006TRANG", // SKU duy nhất 6 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Trắng", "Xám"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-khoac", 
        description: ["Len cao cấp, Phom SLIM"],
        isBestSeller: true, 
    },
    {
        name: "Áo Len Cổ Lọ",
        price: 599000,
        sku: "AK006TRAN", // SKU duy nhất 6 (Mã mới cho Áo Len)
        images: ["https://res.cloudinary.com/dpu2qy4do/image/upload/v1765594870/ao_ni_4_cv0vql.jpg"],
        colors: ["Trắng", "Xám"],
        sizes: ["M", "L", "XL"],
        category_slug: "ao-khoac", 
        description: ["Len cao cấp, Phom SLIM"],
        isBestSeller: true, 
    },
];

export default products;