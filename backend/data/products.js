const products = [
  {
    name: "ÁO VEST NAM VESTK503",
    price: 1050000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK503-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-vest",
    sku: "VESTK503",
    variants: [
      {
        color: ["Black"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO NỈ AN657#",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AN657-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AN657-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AN657-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-ni",
    sku: "AN657",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL6619",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AN638-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AN638-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6619-5.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL6619",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL820",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/820-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-8-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/820-3-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL820",
    variants: [
      {
        color: ["Black", "White"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL611",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL611-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL611-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL611-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL611-3-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL611",
    variants: [
      {
        color: ["Yellow"],
        size: ["L"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8222",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/8222-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8222-2-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8222",
    variants: [
      {
        color: ["White", "Brown"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8133",
    price: 295000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/8133-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8188-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8133-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8133-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8133-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8133-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8133-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8188-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8188-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8188-4-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8133",
    variants: [
      {
        color: ["Gray"],
        size: ["M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI PSX200",
    price: 445000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/PSX200-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/PSX200-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/PSX200-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/PSX200-3-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Moss Green, Gray",
      "Size: M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "PSX200",
    variants: [
      {
        color: ["Moss Green", "Gray"],
        size: ["M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8982",
    price: 360000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL8982-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8982-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Red",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8982",
    variants: [
      {
        color: ["Black", "Red"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL18861",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL18861-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18861-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18861-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Indigo, Red",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL18861",
    variants: [
      {
        color: ["Indigo"],
        size: ["M", "L"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL18893",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL18893-5.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL18893",
    variants: [
      {
        color: ["Gray"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8101",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/8101-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-14-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-16-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-15-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-13-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-12-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-11-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-10-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-9-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-8-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/8101-3-Copy.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray, Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8101",
    variants: [
      {
        color: ["Black", "Brown", "Gray"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },

  {
    name: "ÁO SƠ MI NAM SMD3310",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/SMD3310-1-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SMD3310-5-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SMD3310-4-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SMD3310-3-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SMD3310-2-2.jpg"
    ],
    description: [
      "Vải cao cấp, khả năng thấm hút mồ hôi cực tốt",
      "Màu sắc: White, Beige",
      "Có đầy đủ các size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-so-mi",
    sku: "SMD3310",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM STNTK321",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QJDTK305-GIACN306-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QACTK306-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QACTK306-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QACTK306-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QACTK306-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QJDTK305-GIACN306.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QJDTK305-GIACN306-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/STNTK321-QJDTK305-GIACN306-1.jpg"
    ],
    description: [
      "Chất liệu: Cotton min",
      "Đặc tính: sợi dệt kim",
      "Kiểu dáng: Regular",
      "Màu sắc: Black, White",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống",
      "HƯỚNG DẪN CHỌN SIZE",
      "Size M: 50-57kg / Cao 1m53 – 1m68",
      "Size L: 58-64kg / Cao 1m57 – 1m70",
      "Size XL: 65-70kg / Cao 1m66 – 1m76",
      "Size XXL: 71-76kg / Cao 1m70 – 1m85."
    ],
    category_slug: "ao-so-mi",
    sku: "STNTK321",
    variants: [
      {
        color: ["Black", "White"],
        size: ["M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK610",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK610-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK610-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK610-4-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Navy Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK610",
    variants: [
      {
        color: ["Navy Blue"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP205",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP205-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP205-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP205-1.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: White hoa văn",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP205",
    variants: [
      {
        color: ["White"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP884",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP884-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP884-2.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: Pink",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP884",
    variants: [
      {
        color: ["Pink"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP8602",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP6802-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP6802-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP6802-2.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: Black",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP8602",
    variants: [
      {
        color: ["Black"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP188032",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP188032-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP188032-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP188032-3.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: White",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP188032",
    variants: [
      {
        color: ["White"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM P2501",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/P2501-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/P2501-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/P2501-3.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: Gray",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "P2501",
    variants: [
      {
        color: ["Gray"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP1811",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP1811-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP1811-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP1811-3.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Kiểu dáng: Áo thun không cổ, cộc tay",
      "Màu: White",
      "Size: S – M – L – XL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP1811",
    variants: [
      {
        color: ["White"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK651",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/APHTK651-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/APHTK651-2-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/APHTK651-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/APHTK651-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/APHTK651-3-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Beige",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK651",
    variants: [
      {
        color: ["Beige"],
        size: ["M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK005",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK005-3-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee.",
      "HƯỚNG DẪN CHỌN SIZE",
      "Size M: 50-57kg / Cao 1m53 – 1m68",
      "Size L: 58-64kg / Cao 1m57 – 1m70",
      "Size XL: 65-70kg / Cao 1m66 – 1m76",
      "Size XXL: 71-76kg / Cao 1m70 – 1m85."
    ],
    category_slug: "ao-phong",
    sku: "APHTK005",
    variants: [
      {
        color: ["White", "Gray"],
        size: ["L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APMTK351",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/APMTK351-QJDTK302.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK307-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/APMTK351-QJDTK307-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK307-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK307-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK302-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK302-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APMTK351-QJDTK302-2.jpg"
    ],
    description: [
      "Chất liệu: Cotton",
      "Dáng: Regular",
      "Đặc tính: Mềm mại, co giãn tốt, có độ thấm hút mồ hôi và hút ẩm cao, thoáng mát.",
      "Màu: Brown, White",
      "Hướng dẫn sử dụng:",
      "Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.",
      "Không được dùng hóa chất tẩy.",
      "Hạn chế sử dụng máy sấy, ủi ở nhiệt độ bình thường.",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống.",
      "HƯỚNG DẪN CHỌN SIZE",
      "Size M: 50-57kg / Cao 1m53 – 1m68",
      "Size L: 58-64kg / Cao 1m57 – 1m70",
      "Size XL: 65-70kg / Cao 1m66 – 1m76",
      "Size XXL: 71-76kg / Cao 1m70 – 1m85."
    ],
    category_slug: "ao-phong",
    sku: "APMTK351",
    variants: [
      {
        color: ["Brown", "White"],
        size: ["S", "M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8238#",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/238-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8238-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/238-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/238-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/238-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8238-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8238-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8238-4.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8238",
    variants: [
      {
        color: ["Brown"],
        size: ["XXL", "XXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK1810",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK1810-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1810-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1810-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK1810",
    variants: [
      {
        color: ["Black", "Gray"],
        size: ["L", "XL", "XXL", "XXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8838",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8838-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8838-5.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8838",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK18849",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8849-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8849-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8849-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK18849",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK9031",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9031-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9031-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9031-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9031",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK669",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK669-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK669-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK669-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK669-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK669-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK669",
    variants: [
      {
        color: ["Black", "Brown"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK080#",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK080-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK080-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK080-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK080",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK14LA51",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK14LA51-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK14LA51-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK14LA51-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK14LA51",
    variants: [
      {
        color: ["Black", "Brown"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8788",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8788-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8788-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8788",
    variants: [
      {
        color: ["Mặc định"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK6951",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK6951-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK6951-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK6951",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK6826",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK6826-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK6826-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK6826",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8871",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK5871-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK5871-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK5871-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8871",
    variants: [
      {
        color: ["Black", "Gray"],
        size: ["L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK1866",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK1866-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1866-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1866-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1866-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK1866",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8810",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8810-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8810-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8810-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8810-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8810",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK1802",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK18302-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18302-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18302-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Beige, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK1802",
    variants: [
      {
        color: ["Beige", "Black"],
        size: ["XL", "XXL", "XXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK58612",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK58612-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK58612-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK58612-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK58612-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK58612-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK58612",
    variants: [
      {
        color: ["Gray"],
        size: ["XXXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AKB1006",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKB1006-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1006-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1006-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1006-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1006-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AKB1006",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AKB1709-1",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKB1709-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1709-1-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Bạc",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AKB1709-1",
    variants: [
      {
        color: ["Mặc định"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AKB1788",
    price: 240000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKB1788-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKB1788-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Xanh",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AKB1788",
    variants: [
      {
        color: ["Xanh Sẫm"],
        size: ["M", "L"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8222",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8222-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8222-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8222-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8222-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Beige",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8222",
    variants: [
      {
        color: ["Beige"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8183",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-6-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8183-5-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8183",
    variants: [
      {
        color: ["Yellow"],
        size: ["XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK9812",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9812-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9812-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9812-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9812-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9812-6.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9812",
    variants: [
      {
        color: ["Black", "Gray"],
        size: ["XXXL", "XXXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK9158",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9158-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9158-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Red",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9158",
    variants: [
      {
        color: ["Red"],
        size: ["XXXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK9960",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9960-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9960-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9960-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9960-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9960",
    variants: [
      {
        color: ["Black"],
        size: ["L"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC NAM AKG1927",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKG1927-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKG1927-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKG1927-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray, Navy Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-khoac",
    sku: "AKG1927",
    variants: [
      {
        color: ["Gray", "Navy Blue"],
        size: ["L", "XL", "XXL", "XXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC NAM AKG1997",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKG1997-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKG1997-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKG1997-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKG1997-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-khoac",
    sku: "AKG1997",
    variants: [
      {
        color: ["Yellow"],
        size: ["L", "XL", "XXL", "XXXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QAUTK317",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QAUTK317-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QUATK317-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QUATK317-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QUATK317-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Brown",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "quan-au",
    sku: "QAUTK317",
    variants: [
      {
        color: ["Brown"],
        size: ["32", "33"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QV0321",
    price: 550000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Blue",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "quan-au",
    sku: "QV0321",
    variants: [
      {
        color: ["Blue"],
        size: ["28", "29", "30", "31", "32"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QA79-5",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QA79-5-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QA79-5-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QA79-5-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Blue",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "quan-au",
    sku: "QA79-5",
    variants: [
      {
        color: ["Blue"],
        size: ["28", "29", "30", "31", "32"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QV0321",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QV0321-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Blue",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "quan-au",
    sku: "QV0321-NEW",
    variants: [
      {
        color: ["Blue"],
        size: ["28", "29", "30", "31", "32"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QAUTK319",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APL3086-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK319-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Beige",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "quan-au",
    sku: "QAUTK319",
    variants: [
      {
        color: ["Beige"],
        size: ["33"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK236",
    price: 340000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK236-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK236-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK236-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK236-4.jpg"
    ],
    description: [
      "Chất liệu: Jeans cotton",
      "Đặc tính: có độ thấm hút mồ hôi và hút ẩm cao, thoáng mát.",
      "Màu sắc: Blue",
      "Kiểu dáng: tapered",
      "Hướng dẫn sử dụng:",
      "Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.",
      "Không được dùng hóa chất tẩy.",
      "Hạn chế sử dụng máy sấy, ủi ở nhiệt độ bình thường.",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống."
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK236",
    variants: [
      {
        color: ["Blue"],
        size: ["29", "30", "31", "32", "33", "34"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK229",
    price: 350000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK229-GIATK230-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK229-GIATK230-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK229-GIATK230-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK229-GIATK230-4.jpg"
    ],
    description: [
      "Chất liệu: Jeans cotton",
      "Đặc tính: có độ thấm hút mồ hôi và hút ẩm cao, thoáng mát.",
      "Màu sắc: Blue",
      "Kiểu dáng: slimfit",
      "Hướng dẫn sử dụng:",
      "Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.",
      "Không được dùng hóa chất tẩy.",
      "Hạn chế sử dụng máy sấy, ủi ở nhiệt độ bình thường.",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống."
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK229",
    variants: [
      {
        color: ["Blue"],
        size: ["29", "30", "31", "32", "33"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK237",
    price: 350000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK237-GIATK230-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK237-GIATK230-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK237-GIATK230-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QJDTK237-GIATK230-3.jpg"
    ],
    description: [
      "Chất liệu: Jeans cotton",
      "Đặc tính: có độ thấm hút mồ hôi và hút ẩm cao, thoáng mát.",
      "Màu sắc: Navy Blue",
      "Kiểu dáng: tapered",
      "Hướng dẫn sử dụng:",
      "Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.",
      "Không được dùng hóa chất tẩy.",
      "Hạn chế sử dụng máy sấy, ủi ở nhiệt độ bình thường.",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống."
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK237",
    variants: [
      {
        color: ["Navy Blue"],
        size: ["29", "30", "31", "32", "33", "34"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "BALO THỜI TRANG C1290",
    price: 150000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/C1290-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C1290-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C1290-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Thiết kế: đơn giản",
      "Màu: Black",
      "Kiểu dáng: Thời trang",
      "Thích hợp: Sử dụng đi học, đi du lịch",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "balo",
    sku: "C1290",
    variants: [
      {
        color: ["Black"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "BALO THỜI TRANG C1920",
    price: 150000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/C1920-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C1920-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C1920-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Thiết kế: đơn giản",
      "Màu: Black",
      "Kiểu dáng: Thời trang",
      "Thích hợp: Sử dụng đi học, đi du lịch",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "balo",
    sku: "C1920",
    variants: [
      {
        color: ["Black"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "BALO THỜI TRANG C2379",
    price: 150000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/C2379-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C2379-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C2379-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Thiết kế: đơn giản",
      "Màu: Black",
      "Kiểu dáng: Thời trang",
      "Thích hợp: Sử dụng đi học, đi du lịch",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "balo",
    sku: "C2379",
    variants: [
      {
        color: ["Black"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "BALO THỜI TRANG C3526-2",
    price: 150000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/C3526-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C3526-2-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/C3526-2-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Thiết kế: đơn giản",
      "Màu: Black",
      "Kiểu dáng: Thời trang",
      "Thích hợp: Sử dụng đi học, đi du lịch",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "balo",
    sku: "C3526-2",
    variants: [
      {
        color: ["Black"],
        size: ["F"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK138",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK138-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK138-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK138-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK138-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK138-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK138-4.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK138",
    variants: [
      {
        color: ["Brown"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL701",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL701-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL701-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL701-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL701",
    variants: [
      {
        color: ["Brown"],
        size: ["XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL6809",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL6809-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6809-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6809-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6809-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL6809",
    variants: [
      {
        color: ["Black"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL1730",
    price: 365000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL1730-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1730-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1730-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1730-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL1730",
    variants: [
      {
        color: ["Black"],
        size: ["M", "L", "XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL809",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL809-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL809-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL809",
    variants: [
      {
        color: ["Black", "White"],
        size: ["M", "L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AKX3010",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AKX3010-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKX3010-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKX3010-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKX3010-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AKX3010-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Yellow",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AKX3010",
    variants: [
      {
        color: ["Black", "Yellow"],
        size: ["XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QV320-2",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK1819-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1819-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1819-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK1819-2-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: xanh Black",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống."
    ],
    category_slug: "quan-au",
    sku: "QV320-2",
    variants: [
      {
        color: ["Black"],
        size: ["28", "29", "30", "31", "32"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL6665",
    price: 949000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6665-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL6665",
    variants: [
      {
        color: ["Brown"],
        size: ["L", "XL", "XXL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC DẠ AK996",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK996-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK996-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK996-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK996-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK996-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK996-6.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Beige, Orange, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK996",
    variants: [
      {
        color: ["Orange"],
        size: ["XL"],
        quantity: 100
      }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK141",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK141-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK141-13.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray, Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK141",
    variants: [
      { color: ["Gray"], size: ["L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK6669",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK6669-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK6669-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK6669",
    variants: [
      { color: ["Black", "Red", "Gray", "Indigo"], size: ["L", "XL", "XXL", "XXXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC DẠ AK9622",
    price: 699000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9622-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9622-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9622-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9622-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9622",
    variants: [
      { color: ["Gray"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8034",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL8034-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8034-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8034-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8034-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8034-5.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8034",
    variants: [
      { color: ["Black"], size: ["L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC DẠ AK9923",
    price: 295000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK9923-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK9923-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Red",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK9923",
    variants: [
      { color: ["Red"], size: ["L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL149",
    price: 295000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL149-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL149-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL149-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL149-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL149",
    variants: [
      { color: ["White"], size: ["L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL1801#",
    price: 1050000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL1801-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1801-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1801-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL1801",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO VEST NAM AV8109",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AV8109-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AV8109-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AV8109-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AV8109-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-vest",
    sku: "AV8109",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK18169",
    price: 295000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK18169-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18169-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18169-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18169-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK18169-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK18169",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK8163",
    price: 445000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK8163-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8163-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8163-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK8163-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK8163",
    variants: [
      { color: ["Yellow"], size: ["M", "L", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC AK180205",
    price: 379000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AK180205-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK180205-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK180205-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AK180205-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-khoac",
    sku: "AK180205",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN AL8005",
    price: 1050000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL8005-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8005-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8005-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8005-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL8005-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-len",
    sku: "AL8005",
    variants: [
      { color: ["Gray"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP606",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP606-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP606-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP606-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP606-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Green cây, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP606",
    variants: [
      { color: ["White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3015",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3015-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3015-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3015-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3015-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3015-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3015",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP608",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP608-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP608-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP608-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP608-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP608",
    variants: [
      { color: ["Black", "White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3037#",
    price: 580000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3037-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3037",
    variants: [
      { color: ["White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3032#",
    price: 949000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3032-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Indigo, White, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3032",
    variants: [
      { color: ["Black", "White", "Indigo"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3031#",
    price: 699000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3031-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3031-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3031-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3031-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3031",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3026",
    price: 580000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3026-6.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3026",
    variants: [
      { color: ["Black", "White"], size: ["L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP014",
    price: 495000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap014-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Red, Moss Green, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP014",
    variants: [
      { color: ["Moss Green"], size: ["M"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP3042#",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP3042-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3042-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3042-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP3042-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP3042",
    variants: [
      { color: ["Black", "White"], size: ["M", "L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP9804",
    price: 949000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP9804-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9804-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9804-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9804-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Indigo, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP9804",
    variants: [
      { color: ["White", "Indigo"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP9805",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP9805-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9805-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9805-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9805-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP9805",
    variants: [
      { color: ["White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP9820",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP9820-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9820-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9820-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9820-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9820-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Green, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP9820",
    variants: [
      { color: ["White"], size: ["XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP9826",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP9826-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP9826-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP9826",
    variants: [
      { color: ["White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP19004",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP19004-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19004-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19004-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19004-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP19004",
    variants: [
      { color: ["Black", "Yellow"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP19025",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP19025-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19025-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19025-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP19025",
    variants: [
      { color: ["White", "Yellow"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP19027",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP19027-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19027-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19027-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP19027",
    variants: [
      { color: ["Brown"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP19039",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP19039-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19039-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19039-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP19039-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP19039",
    variants: [
      { color: ["White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG ĐÔI AP819",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP819.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/Ap819-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm có mặt tại tất cả các shop trên hệ thống"
    ],
    category_slug: "ao-phong",
    sku: "AP819",
    variants: [
      { color: ["Brown"], size: ["L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QVTK310",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/SM710-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SM710-4.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Black",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "quan-au",
    sku: "QVTK310",
    variants: [
      { color: ["Black"], size: ["28", "29", "30", "31", "32"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP0077",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP0077-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "AP0077",
    variants: [
      { color: ["Brown", "White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP193",
    price: 315000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP193-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP193-7.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray, Beige",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "AP193",
    variants: [
      { color: ["Black", "Gray"], size: ["M", "L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP186",
    price: 1195000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP186-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP186-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP186-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP186-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "AP186",
    variants: [
      { color: ["Black", "Gray"], size: ["M", "L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APT018",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APT018-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APT018-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APT018-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APT018-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Navy Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APT018",
    variants: [
      { color: ["Navy Blue"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP616",
    price: 949000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP616-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP616-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP616-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP616-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Red, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "AP616",
    variants: [
      { color: ["Red", "Gray"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM AP601",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AP601-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP601-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP601-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AP601-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "AP601",
    variants: [
      { color: ["White", "Gray", "Moss Green"], size: ["M", "L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APTK602",
    price: 445000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APTK602-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APTK602-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APTK602-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APTK602-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Yellow, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APTK602",
    variants: [
      { color: ["Gray"], size: ["L"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APTK601",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APTK601-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APTK601-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APTK601-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Beige, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APTK601",
    variants: [
      { color: ["Beige", "White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH124#",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH124-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH124-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White, Red",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH124",
    variants: [
      { color: ["Black", "Red", "White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH002",
    price: 445000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH002-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH002-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH002",
    variants: [
      { color: ["Black", "White"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO TANH TOP NAM ATT326#",
    price: 360000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ATT326-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-ba-lo",
    sku: "ATT326",
    variants: [
      { color: ["Black", "Brown", "Gray"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QAUTK321",
    price: 360000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK321-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QUATK321-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QUATK321-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QUATK321-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QUATK321-4.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Black, Blue, Gray",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-au",
    sku: "QAUTK321",
    variants: [
      { color: ["Blue"], size: ["32", "33"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QAUTK322",
    price: 360000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK322-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK322-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK322-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Brown",
      "Kiểu dáng: Ống Suông",
      "Size: 28 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "quan-au",
    sku: "QAUTK322",
    variants: [
      { color: ["Black"], size: ["33"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK609",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-23.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-21.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-14.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-28.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-27.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-26.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-25.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-24.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-22.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-20.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-19.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-18.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-17.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-16.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-15.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-13.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK609-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Red, Green cây, Navy Blue, Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK609",
    variants: [
      { color: ["Red", "Green"], size: ["XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK608",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-18.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-17.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-16.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-15.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-14.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-13.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK608-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Yellow, Beige",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK608",
    variants: [
      { color: ["Beige", "Black", "Yellow"], size: ["M", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK614",
    price: 365000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-13.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK614-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Green, Gray, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK614",
    variants: [
      { color: ["Black", "Gray", "Green"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK613",
    price: 315000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK613-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK613",
    variants: [
      { color: ["White", "Gray"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APHTK612",
    price: 369000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APHTK612-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APHTK612",
    variants: [
      { color: ["White", "Blue"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH3096#",
    price: 1195000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH3096-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH3096-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH3096-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH3096-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH3096-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH3096",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH619",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH619-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH619-4-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Beige, Black, Moss Green, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH619",
    variants: [
      { color: ["Beige", "Black", "White", "Moss Green"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH194",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH194-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH194-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH194-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH194-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH194-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Green",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH194",
    variants: [
      { color: ["Green"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO PHÔNG NAM APH6005#",
    price: 369000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH6005-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH6005-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH6005-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH6005-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: White, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH6005",
    variants: [
      { color: ["White", "Gray"], size: ["L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN NAM ALE8807",
    price: 699000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/ALE8807-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ALE8807-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ALE8807-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ALE8807-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray, Black, Beige, White, Navy Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-len",
    sku: "ALE8807",
    variants: [
      { color: ["Beige", "Black", "White", "Gray", "Navy Blue"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO VEST NAM VESTK502",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK502-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-vest",
    sku: "VESTK502",
    variants: [
      { color: ["Black"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO THUN NAM TD9005",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/TD9005-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White, Green, Yellow",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-thun",
    sku: "TD9005",
    variants: [
      { color: ["Black", "White", "Yellow", "Green"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN NAM AL1708#",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1708-8.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Moss Green, Purple",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-len",
    sku: "AL1708",
    variants: [
      { color: ["Purple"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN NAM AL6811#",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL6811-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6811-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6811-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL6811-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Gray, Black",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-len",
    sku: "AL6811",
    variants: [
      { color: ["Black"], size: ["L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO LEN NAM AL1768#",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AL1768-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1768-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AL1768-3.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Brown",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-len",
    sku: "AL1768",
    variants: [
      { color: ["Brown"], size: ["M"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QAUTK348",
    price: 850000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK348-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QAUTK348-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu sắc: Black",
      "Kiểu dáng: Ống Suông",
      "Size: 29 – 32",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "quan-au",
    sku: "QAUTK348",
    variants: [
      { color: ["Black"], size: ["33"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO VEST NAM VESTK505",
    price: 1195000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/VESTK505-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK505.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK505-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK505-1.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Navy Blue",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-vest",
    sku: "VESTK505",
    variants: [
      { color: ["Navy Blue"], size: ["M", "L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO VEST NAM VESTK506",
    price: 369000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/VESTK506-5.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-vest",
    sku: "VESTK506",
    variants: [
      { color: ["Black", "Gray"], size: ["L", "XL", "XXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO HOODIE NAM AHD5007#",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/AHD5007-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AHD5007.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/AHD5007-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, White",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-hoodie",
    sku: "AHD5007",
    variants: [
      { color: ["Black", "White"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO KHOÁC NAM AKP9810",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/AKP9810-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/AKP9810-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/AKP9810-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/AKP9810-2.jpg"
    ],
    description: [
      "Chất liệu: Vải cao cấp",
      "Màu: Black, Gray",
      "Size: M – L – XL – XXL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống và Shopee."
    ],
    category_slug: "ao-khoac",
    sku: "AKP9810",
    variants: [
      { color: ["Black", "Gray"], size: ["XL", "XXL", "XXXL", "XXXXL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "MEN'S T-SHIRT APH2035",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-1-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-2-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-3-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/APH2035-4-2.jpg"
    ],
    description: [
      "Material: High-quality fabric",
      "Color: black, white, yellow, red",
      "Size: M – L – XL – XXL",
      "The product is available at all stores on the system and Shopee."
    ],
    category_slug: "ao-phong",
    sku: "APH2035",
    variants: [
      { color: ["Black", "Red", "White", "Yellow"], size: ["L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO CHỐNG NẮNG NAM NATK001",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/ACN003-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/NATK001-6.jpg"
    ],
    description: [
      "ÁO CHỐNG NẮNG CHỐNG TIA UV 360",
      "Ngăn tia UV 97%, chống sạm da và lão hóa",
      "Vải kim cương chuyên dụng, co giãn, thoáng khí",
      "Thiết kế mũ trùm sâu, tay dài xỏ ngón bảo vệ toàn diện",
      "Form dáng trẻ trung, 2 túi trước tiện lợi"
    ],
    category_slug: "ao-chong-nang",
    sku: "NATK001",
    variants: [
      { color: ["Blue"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN SHORT NAM QSNTK302",
    price: 315000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/QSNTK302-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QSNTK302-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/qsntk302-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/qsntk302-2-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/qsntk302-4-1.jpg"
    ],
    description: [
      "Chất liệu: lacoste mắt nhỏ",
      "Kiểu dáng: Relax",
      "Màu sắc: Beige, Black, Brown, White",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-short",
    sku: "QSNTK302",
    variants: [
      { color: ["Beige", "Black", "Brown", "White"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM SKDTK301",
    price: 315000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QATTK301-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKLTK205-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKLTK205-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKLTK205-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKLTK205-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKBTK304-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKBTK304-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKBTK304-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QKBTK304-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QATTK301-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QATTK301-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QATTK301-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/SKDTK301-QATTK301-4.jpg"
    ],
    description: [
      "Chất liệu: 100% Coton",
      "Kiểu dáng: Regular",
      "Màu sắc: xanh nhạt, Gray, White",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống",
      "HƯỚNG DẪN CHỌN SIZE: M(50-57kg), L(58-64kg), XL(65-70kg), XXL(71-76kg)"
    ],
    category_slug: "ao-so-mi",
    sku: "SKDTK301",
    variants: [
      { color: ["White", "Gray", "xanh nhạt"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM SDKTK347",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-7.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-5.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-9.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-10.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-12.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-13.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-11.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-8.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-15.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-16.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-18.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-17.jpg",
      "https://badass.vn/wp-content/uploads/2022/11/SDKTK347-QACTK314-14.jpg"
    ],
    description: [
      "Chất liệu: KHAKI CHÉO (98% COTTON, 2% POLY)",
      "Kiểu dáng: Relax",
      "Màu sắc: Gray, Yellow BÒ, White",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống",
      "HƯỚNG DẪN CHỌN SIZE: M(50-57kg), L(58-64kg), XL(65-70kg), XXL(71-76kg)"
    ],
    category_slug: "ao-so-mi",
    sku: "SDKTK347",
    variants: [
      { color: ["White", "Yellow bò", "Gray"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM SKDTK340",
    price: 485000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7112_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7113_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7115_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7118_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7104_1_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7105_1_1.jpg",
      "https://badass.vn/wp-content/uploads/2022/09/9V9A7106_1_1.jpg"
    ],
    description: [
      "Chất liệu: FLANNEL COTTON (100% Cotton)",
      "Kiểu dáng: Regular",
      "Màu sắc: Beige đậm, Navy Blue",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống",
      "HƯỚNG DẪN CHỌN SIZE: M(50-57kg), L(58-64kg), XL(65-70kg), XXL(71-76kg)"
    ],
    category_slug: "ao-so-mi",
    sku: "SKDTK340",
    variants: [
      { color: ["Beige đậm", "Navy Blue"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO POLO NAM POMTK524",
    price: 359000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/06/POMTK524-QSVTK505-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/POMTK524-QSVTK505-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/POMTK524-QSVTK505-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/POMTK524-QSVTK505-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/POMTK524-QSVTK505-2.jpg"
    ],
    description: [
      "Chất liệu: Pique (Cotton, Poly, Spandex)",
      "Form: Regular",
      "Đặc tính: Vải mắt chim thoáng khí, co giãn tốt, bền màu, không bai dão",
      "Thiết kế: Cổ trụ V sang trọng, phối màu thời trang ở cổ và tay áo",
      "Màu: White",
      "Size: S - XL"
    ],
    category_slug: "ao-polo",
    sku: "POMTK524",
    variants: [
      { color: ["White"], size: ["S", "M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM SKDTK503",
    price: 429000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK503-QATTK408-1-5.jpg"
    ],
    description: [
      "Chất liệu: Thô cotton kẻ thoáng khí, mềm mại",
      "Form: Regular vừa vặn",
      "Đặc tính: Áo dài tay phối kẻ tinh tế, thiết kế can phối kẻ to nhỏ độc đáo",
      "Thiết kế: Cổ đức trẻ trung, đường may tinh tế",
      "Phối đồ: Hợp với quần jean, quần tây, quần kaki",
      "Màu: Xanh nhạt",
      "Size: M - XL"
    ],
    category_slug: "ao-so-mi",
    sku: "SKDTK503",
    variants: [
      { color: ["Green"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM STDTK417",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/09/STDTK417-QATTK317-2-Small.jpg",
      "https://badass.vn/wp-content/uploads/2023/09/STDTK417-QATTK317-4-Small.jpg",
      "https://badass.vn/wp-content/uploads/2023/09/STDTK417-QATTK317-1-Small.jpg",
      "https://badass.vn/wp-content/uploads/2023/09/STDTK417-QATTK317-5-Small.jpg",
      "https://badass.vn/wp-content/uploads/2023/09/STDTK417-QATTK317-3-Small.jpg"
    ],
    description: [
      "Chất liệu: Bamboo pha Tencel cao cấp",
      "Form: Slim office",
      "Đặc tính: Thấm hút tốt, mềm mịn như lụa, mát như linen, ít nhăn và kháng khuẩn tự nhiên",
      "Ứng dụng: Công nghệ sinh học chiết xuất từ cây tre thiên nhiên",
      "Màu: White",
      "Size: M - XL"
    ],
    category_slug: "ao-so-mi",
    sku: "STDTK417",
    variants: [
      { color: ["White"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDOL324",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/07/QJDOL324-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QJDOL324-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QJDOL324-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QJDOL324-2.jpg"
    ],
    description: [
      "Chất liệu: Denim (Cotton pha Spandex co giãn nhẹ)",
      "Form: Slim vừa vặn",
      "Đặc tính: Màu wash xanh sáng bắt mắt, chất vải đứng form, dày dặn vừa đủ",
      "Thiết kế: Kiểu dáng trẻ trung, đơn giản, có đỉa thắt lưng",
      "Phối đồ: Đa năng, hợp với áo polo, sơ mi, áo phông",
      "Màu: Blue",
      "Size: 29, 30, 31, 32, 34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDOL324",
    variants: [
      { color: ["Blue"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QACOL010",
    price: 420000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/07/QACOL010-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QACOL010-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QACOL010-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QACOL010-4.jpg"
    ],
    description: [
      "Chất liệu: Vải T/R – Sợi vải tổng hợp",
      "Form: Tapered",
      "Đặc tính: Vải tuyết mưa ít nhăn, không bám lông, không bám bụi mịn và không bạc màu",
      "Độ bền cao, ít bị bai dão, không bị sờn mốc hay xù lông sau nhiều lần sử dụng",
      "Màu: Black",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-au",
    sku: "QACOL010",
    variants: [
      { color: ["Black"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN ÂU NAM QACOL515",
    price: 420000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/07/QACOL515-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QACOL515-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/07/QACOL515-5.jpg"
    ],
    description: [
      "Chất liệu: Tuyết mưa cao cấp",
      "Form: Slim crop trẻ trung, lịch sự",
      "Đặc tính: Thiết kế trượt cạp thông minh phù hợp nhiều dáng bụng (nhỏ/vừa/to)",
      "Vải đứng form, giữ nếp ly thẳng, không nhăn nhàu, không xù lông",
      "Đường may tinh tế, dễ dàng mix với nhiều loại áo",
      "Màu: Black",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-au",
    sku: "QACOL515",
    variants: [
      { color: ["Black"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN SHORT NAM QSKTK408",
    price: 369000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-10-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-11-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-9-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-12-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-8-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK408-4-Copy.jpg"
    ],
    description: [
      "Chất liệu: KAKI",
      "Đặc tính: 100% COTTON",
      "Kiểu dáng: REGULAR",
      "Màu sắc: White, Yellow BÒ, Black",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-short",
    sku: "QSKTK408",
    variants: [
      { color: ["Beige", "Black", "Brown", "Grey"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN SHORT NAM QSKTK413",
    price: 379000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-8-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-9-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-10-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-11-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK413-2-Copy.jpg"
    ],
    description: [
      "Chất liệu: KHAKI",
      "Đặc tính: 97% COTTON, 3% SPANDEX",
      "Kiểu dáng: REGULAR",
      "Màu sắc: Black, Gray, White",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-short",
    sku: "QSKTK413",
    variants: [
      { color: ["Black", "White", "Grey"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN SHORT NAM QSKTK414",
    price: 365000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-5-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-8-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/APHTK448-QSKTK414-7-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-6-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-1-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-3-Copy-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-1-Copy-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-2-Copy-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-4-Copy-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/QSKTK414-5-Copy-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/05/STDTK401-QSKTK414-1-Copy.jpg"
    ],
    description: [
      "Chất liệu: KHAKI",
      "Đặc tính: 100% POLY",
      "Kiểu dáng: REGULAR",
      "Màu sắc: White, Black, Brown",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-short",
    sku: "QSKTK414",
    variants: [
      { color: ["Black", "Brown", "White"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO POLO NAM POTTK411",
    price: 360000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-5-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-14-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-15-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-16-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-12-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-8-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-6-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-11-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-9-Copy-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-3-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-4-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-QATTK401-1-Copy-1-scaled.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/POTTK411-5-Copy-scaled.jpg"
    ],
    description: [
      "Chất liệu: PIQUE",
      "Đặc tính: 33% COTTON, 61% POLY, 6% SPANDEX",
      "Phom: REGULAR",
      "Màu: White, Black, Teal, Beige",
      "Size: M - XL",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "ao-polo",
    sku: "POTTK411",
    variants: [
      { color: ["Beige", "Black", "White", "Teal"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN SHORT NAM QSNTK508",
    price: 379000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-8.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK508-9.jpg"
    ],
    description: [
      "Chất liệu: Interlock (Cotton pha Poly)",
      "Form: REGULAR vừa vặn",
      "Đặc tính: Vải dày dặn, bền bỉ, thấm hút mồ hôi cực tốt và thoáng khí",
      "Độ đàn hồi cao, hạn chế nhăn xù, giữ hình dáng ban đầu tốt",
      "Thiết kế: Can phối cấu trúc lệch màu độc đáo bên ống trái",
      "Màu: White, Black, Gray",
      "Size: M-XL"
    ],
    category_slug: "quan-short",
    sku: "QSNTK508",
    variants: [
      { color: ["Black", "White", "Grey"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO SƠ MI NAM SKDTK517",
    price: 429000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/SKDTK517-QASTK503-1.jpg"
    ],
    description: [
      "Chất liệu: Thô cotton kẻ thoáng khí, mềm mại",
      "Form: Regular vừa vặn với cơ thể",
      "Đặc tính: Áo dài tay, chất liệu thoải mái, cử động tốt, thích hợp mọi thời tiết",
      "Thiết kế: Dáng cổ đức trẻ trung, thiết kế can giữa thân trước thời trang",
      "Mix & Match: Phù hợp với quần jean, short, quần tây hoặc kaki",
      "Màu: Xanh nhạt",
      "Size: M-XL"
    ],
    category_slug: "ao-so-mi",
    sku: "SKDTK517",
    variants: [
      { color: ["Green"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO THUN DÀI TAY ATDTK402",
    price: 279000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-7-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-4-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-5-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-8-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/11/ATDTK402-QJDTK416-6-Custom.jpg"
    ],
    description: [
      "Chất liệu: Rib Cotton (Cotton Spandex dệt nổi gân)",
      "Form: Slimfit ôm sát cơ thể",
      "Đặc tính: Độ co giãn đàn hồi cao, giữ nhiệt tốt",
      "Ứng dụng: Dùng làm áo lót bên trong để giữ ấm mùa đông hoặc mặc cùng áo nỉ",
      "Màu: Black, White",
      "Size: S-XL"
    ],
    category_slug: "ao-thun",
    sku: "ATDTK402",
    variants: [
      { color: ["Black", "White"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK502",
    price: 519000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK502-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK502-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK502-3.jpg"
    ],
    description: [
      "Chất liệu: Denim (Cotton pha Spandex co giãn nhẹ)",
      "Form: Straight (Dáng suông thoải mái)",
      "Đặc tính: Màu wash xanh sáng trẻ trung, chất liệu đứng form, độ dày vừa đủ",
      "Thiết kế: Kiểu dáng đơn giản, lịch sự, có đỉa thắt lưng",
      "Phối đồ: Phù hợp với áo polo, sơ mi, áo phông, áo khoác mỏng",
      "Màu: Xanh nhạt",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK502",
    variants: [
      { color: ["Green"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "ÁO POLO NAM POHTK531",
    price: 429000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-QGNTK507-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/POHTK531-25.jpg"
    ],
    description: [
      "Chất liệu: Texture (bề mặt vân chéo) - 65% Poly, 30% Cotton, 5% Spandex",
      "Form: Regular vừa vặn",
      "Đặc tính: Thấm hút mồ hôi tốt, vải bền chắc, không bai dão hay co rút",
      "Thiết kế: Áo polo dài tay, lá cổ vải chính, hình thêu R ở ngực thời trang",
      "Chi tiết: Nẹp cúc điểm bọ màu, tay và gấu áo may bo cùng màu vải chính",
      "Phối đồ: Khoác ngoài, quần jean, quần jogger",
      "Màu: Black, Beige, Moss Green",
      "Size: M-XL"
    ],
    category_slug: "ao-polo",
    sku: "POHTK531",
    variants: [
      { color: ["Beige", "Black", "Moss Green"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK507",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QGNTK507-8.jpg"
    ],
    description: [
      "Chất liệu: Texture (mặt twill knit – vân chéo nổi song song)",
      "Form: Regular",
      "Đặc tính: Bề mặt vải khỏe khoắn, mặt trong mịn màng, thân thiện với làn da",
      "Ưu điểm: Co giãn tốt, độ bền cao, chống mài mòn và ít phải ủi",
      "Thiết kế: Cạp chun tiện lợi, túi cơi hai bên, điểm nhấn thêu chữ tinh tế ở ống trái",
      "Phong cách: Nam tính, năng động, dễ phối với hoodie, áo nỉ, len hoặc phông",
      "Màu: Black, Beige, Moss Green",
      "Size: M - XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK507",
    variants: [
      { color: ["Beige", "Black", "Moss Green"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK509",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/12/QJDTK509-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QJDTK509-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QJDTK509-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QJDTK509-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/12/QJDTK509-1.jpg"
    ],
    description: [
      "Chất liệu: Denim (Cotton + Spandex)",
      "Form: Slim (Ống quần ôm vừa)",
      "Đặc tính: Vải đứng form, giữ dáng tốt, độ dày vừa đủ và co giãn nhẹ",
      "Thiết kế: Basic rách gối vừa, có đầy đủ rivet, 2 túi hàm ếch trước và 2 túi ốp sau",
      "Tính năng: Dễ vận động, tạo cảm giác thoải mái và dễ chịu",
      "Phối đồ: Hợp với áo sơ mi, polo, áo phông, áo khoác hoặc áo len",
      "Màu: Black",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK509",
    variants: [
      { color: ["Black"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK421",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-5-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-4-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-6-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-7-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-8-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QJDTK421-2-Custom.jpg"
    ],
    description: [
      "Chất liệu: JEANS",
      "Form: Tapered (Ống ôm dần)",
      "Đặc tính: 98% Cotton, 2% Spandex",
      "Màu: Black, Indigo",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK421",
    variants: [
      { color: ["Black", "Indigo"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK425",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/02/QJDTK425-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/QJDTK425-1-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/QJDTK425-2-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/QJDTK425-3-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/POMTK501-QJDTK425-1-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/POMTK501-QJDTK425-4-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/02/POMTK501-QJDTK425-8-Custom-1.jpg"
    ],
    description: [
      "Chất liệu: Denim (Cotton pha Spandex)",
      "Form: Slim vừa vặn cơ thể",
      "Đặc tính: Màu wash xanh sáng trẻ trung, vải đứng form và co giãn nhẹ",
      "Thiết kế: Basic dễ phối với polo, sơ mi, áo phông, áo khoác",
      "Chi tiết: Cạp quần có đỉa thắt lưng tiện lợi",
      "Màu: Blue",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK425",
    variants: [
      { color: ["Blue"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK501",
    price: 519000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK501-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK501-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/06/QJDTK501-3.jpg"
    ],
    description: [
      "Chất liệu: Jeans Denim",
      "Form: Slim ôm nhẹ, tôn dáng",
      "Đặc tính: Màu wash xanh sáng bắt mắt, chất vải thoải mái, dễ vận động",
      "Thiết kế: Trẻ trung, lịch sự, dễ phối đồ đa dụng",
      "Chi tiết: Vải đứng form, độ dày vừa đủ, có đỉa thắt lưng",
      "Màu: Xanh nhạt",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK501",
    variants: [
      { color: ["Green"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK510",
    price: 549000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK510-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK510-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK510-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK510-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK510-2.jpg"
    ],
    description: [
      "Chất liệu: Jeans Denim",
      "Thành phần: 93% Cotton, 5% Poly, 2% Spandex",
      "Form: Slim ôm nhẹ, hiện đại",
      "Màu: Xanh nhạt",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK510",
    variants: [
      { color: ["Green"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER NAM QGKTK410",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-5-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-6-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGKTK410-4-Custom.jpg"
    ],
    description: [
      "Chất liệu: Khaki bền bỉ, ít nhăn, hạn chế xù lông",
      "Form: Regular thoải mái",
      "Thiết kế: Túi hộp có nắp hai bên sườn quần, các đường can giặt nổi gân khỏe khoắn",
      "Tiện ích: Cạp mở cúc kết hợp nửa chun sau linh hoạt, không kén dáng người mặc",
      "Đặc tính: Thoáng khí, phong cách năng động, trẻ trung",
      "Màu: Black, Gray đậm",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGKTK410",
    variants: [
      { color: ["Black", "Dark Grey"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER NAM QGGTK502",
    price: 389000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-2.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-5.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-8.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-6.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-7.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-4.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGGTK502-3.jpg"
    ],
    description: [
      "Chất liệu: Gió chân cua",
      "Form: Regular thoải mái khi vận động",
      "Đặc tính: Bề mặt vải gió cản gió, cản nước hiệu quả",
      "Cấu trúc: Mặt sau dệt lộ sợi tạo độ đàn hồi tốt",
      "Màu: Black, Light Grey",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGGTK502",
    variants: [
      { color: ["Black", "Light Grey"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK506",
    price: 429000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/09/QGNTK506-4.jpg"
    ],
    description: [
      "Chất liệu: Interlock (Cotton)",
      "Form: Regular vừa vặn mọi dáng vóc",
      "Đặc tính: Vải dệt chặt chẽ, dày dặn, bền màu và giữ form tốt sau nhiều lần giặt",
      "Ưu điểm: Thấm hút mồ hôi hiệu quả, khô ráo và thoáng mát",
      "Thiết kế: Điểm nhấn thêu tinh tế trên thân trái",
      "Màu: Black, Navy Blue",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK506",
    variants: [
      { color: ["Black", "Navy Blue"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK505",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-7-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-6-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-8-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-10-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-9-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-5-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QGNTK505-2-1.jpg"
    ],
    description: [
      "Chất liệu: Nỉ Pique (Cotton pha Poly)",
      "Form: Regular thể thao",
      "Đặc tính: Bề mặt vải hiệu ứng mắt sợi độc đáo, thoáng khí, không bai dão",
      "Thiết kế: Cạp chun co giãn, ống bo trẻ trung, túi cơi sau tạo hiệu ứng giả túi ốp",
      "Ưu điểm: Bền chắc, ít nhăn, không co rút, dễ bảo quản",
      "Màu: Black, Beige nhạt",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK505",
    variants: [
      { color: ["Beige", "Black"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK411",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-4-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-5-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK411-6-Custom.jpg"
    ],
    description: [
      "Chất liệu: Pique cao cấp",
      "Thành phần: 84% Poly, 16% Cotton",
      "Form: Regular chuẩn dáng",
      "Đặc tính: Vải bền màu, bề mặt mắt sợi tinh tế, thoáng mát",
      "Màu: Black, Beige",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK411",
    variants: [
      { color: ["Beige", "Black"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN NỈ QNITK501",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-8.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-9.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-10.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-11.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-12.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-13.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-14.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-15.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QNITK501-5.jpg"
    ],
    description: [
      "Chất liệu: Pique (Cotton pha Poly) mềm mại, thoáng khí",
      "Form: Regular thoải mái với dáng gấu buông",
      "Đặc tính: Bề mặt vải hiệu ứng mắt sợi độc đáo, thấm hút mồ hôi tốt",
      "Ưu điểm: Độ bền màu cao, bền chắc, không bai dão, ít nhăn và dễ bảo quản",
      "Thiết kế: Mẫu mã đơn giản, lịch sự với cạp chun và hai túi chéo tiện lợi",
      "Mix Match: Phối cùng áo nỉ, áo polo hoặc cardigan nỉ",
      "Màu: Black, Light Grey, Beige nhạt",
      "Size: M-XL"
    ],
    category_slug: "quan-dai",
    sku: "QNITK501",
    variants: [
      { color: ["Beige", "Black", "Light Grey"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN KAKI NAM QKBTK401",
    price: 419000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/04/QKBTK401-4-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/QKBTK401-2-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/QKBTK401-3-Copy.jpg",
      "https://badass.vn/wp-content/uploads/2023/04/QKBTK401-1-Copy.jpg"
    ],
    description: [
      "Chất liệu: KHAKI (100% COTTON)",
      "Màu sắc: Black",
      "Kiểu dáng: BAGGY thoải mái, trẻ trung",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-kaki",
    sku: "QKBTK401",
    variants: [
      { color: ["Black"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER NAM QGKTK304",
    price: 399000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-3.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-1.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-2.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-4.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-6.jpg",
      "https://badass.vn/wp-content/uploads/2022/08/QGKTK304-5.jpg"
    ],
    description: [
      "Chất liệu: Kaki bền bỉ",
      "Màu sắc: Black, Beige, Gray",
      "Kiểu dáng: Regular thoải mái",
      "Sản phẩm đã có mặt ở toàn bộ các cửa hàng trên hệ thống"
    ],
    category_slug: "quan-jogger",
    sku: "QGKTK304",
    variants: [
      { color: ["Beige", "Black", "Gray"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  }, {
    name: "QUẦN SHORT NAM QSNTK506",
    price: 369000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-8.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-9.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/03/QSNTK506-2-1.jpg"
    ],
    description: [
      "Chất liệu: Interlock (Nỉ Interlock)",
      "Form: REGULAR vừa vặn với cơ thể",
      "Đặc tính: Độ bền cao, thấm hút tốt, độ đàn hồi và khả năng thoáng khí cao",
      "Thiết kế: Shorts trơn màu cơ bản, điểm nhấn ở phần túi chéo có diễu chỉ khỏe khoắn",
      "Màu: Black, White, Beige, Brown nhạt",
      "Size: M-XL"
    ],
    category_slug: "quan-short",
    sku: "QSNTK506",
    variants: [
      { color: ["Beige", "Black", "Light Brown", "White"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK416",
    price: 599000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/10/QJDTK416-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QJDTK416-2.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QJDTK416-3.jpg"
    ],
    description: [
      "Chất liệu: JEANS Cotton",
      "Form: SLIM vừa vặn",
      "Đặc tính: Thành phần 3% Spandex giúp co giãn nhẹ, thoải mái vận động",
      "Ưu điểm: Giữ form tốt, không bị bai dão khi sử dụng",
      "Màu: Xanh nhạt",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK416",
    variants: [
      { color: ["Green"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK420",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK420-2.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK420-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK420-3.jpg"
    ],
    description: [
      "Chất liệu: JEANS",
      "Form: Slim (Cải tiến mới)",
      "Đặc tính: Chiều dài cải tiến, cầu mông ôm tròn, đùi ống ôm rõ form hơn",
      "Màu sắc: Xanh đậm nam tính",
      "Màu: Navy Blue",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK420",
    variants: [
      { color: ["Navy Blue"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK419",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK419-2.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK419-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK419-3.jpg"
    ],
    description: [
      "Chất liệu: JEANS",
      "Form: Slim (Cải tiến mới)",
      "Đặc tính: Chiều dài ống cải tiến, cầu mông ôm tròn, làm nổi bật dáng chân khỏe khoắn",
      "Phong cách: Màu xanh cơ bản nam tính, dễ phối đồ",
      "Màu: Navy Blue",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK419",
    variants: [
      { color: ["Blue"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK426",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK426-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK426-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK426-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/12/QJDTK426-4-Custom.jpg"
    ],
    description: [
      "Chất liệu: JEANS cao cấp",
      "Thành phần: 80% Cotton, 18% Poly, 2% Spandex",
      "Form: Slim vừa vặn",
      "Màu: Black",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK426",
    variants: [
      { color: ["Grey"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK313",
    price: 580000,
    images: [
      "https://badass.vn/wp-content/uploads/2022/10/QJDTK313-1-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2022/10/QJDTK313-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2022/10/QJDTK313-3-Custom.jpg"
    ],
    description: [
      "Chất liệu: JEANS (99% Cotton, 1% Spandex)",
      "Đặc tính: Thấm hút mồ hôi tốt, hút ẩm cao, thoáng mát",
      "Form: SLIM tôn dáng",
      "Màu sắc: Gray trẻ trung",
      "Sản phẩm đã có mặt trên toàn hệ thống"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK313",
    variants: [
      { color: ["Gray"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK406",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-2-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-8-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-6-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-9-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-7-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/KNKTK402-QGNTK406-6-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-5-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-4-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-6-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/KNKTK402-ATDTK401-QGNTK406-1-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-3-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-4-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-5-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2023/10/QGNTK406-1-Custom-1.jpg"
    ],
    description: [
      "Chất liệu: Pique cao cấp phối Spandex co giãn",
      "Form: Regular thoải mái",
      "Thiết kế: Đường kẹp lé dọc sườn quần tạo điểm nhấn năng lượng",
      "Đặc tính: Hiệu ứng mắt sợi to, thoáng khí, hút ẩm tốt",
      "Ưu điểm: Không co rút, không bai dão, giữ form dáng bền đẹp",
      "Màu: Black, Beige, Dark Grey",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK406",
    variants: [
      { color: ["Beige", "Black", "Dark Grey"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK412",
    price: 449000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-7.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-2.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-3.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-4.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-6.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-5.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK412-8.jpg"
    ],
    description: [
      "Chất liệu: Pique (Cotton, Poly, Spandex)",
      "Form: Regular",
      "Thiết kế: Khóa túi cơi ở sườn khỏe khoắn và thời trang",
      "Đặc tính: Thoáng khí nhờ hiệu ứng mắt sợi vải độc đáo",
      "Ưu điểm: Hút ẩm tốt, co giãn linh hoạt, không bai dão sau thời gian dài",
      "Màu: Beige nhạt, Black",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK412",
    variants: [
      { color: ["Beige", "Black"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JOGGER QGNTK413",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-3-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-5-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-6-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-7-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-8-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-1-Custom-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-2-Custom.jpg",
      "https://badass.vn/wp-content/uploads/2024/01/QGNTK413-4-Custom.jpg"
    ],
    description: [
      "Chất liệu: Nỉ Interlock cao cấp",
      "Form: Regular vừa vặn",
      "Thiết kế: Hình thêu tinh tế trên thân trái tạo sự độc đáo",
      "Đặc tính: Vải dệt liên kết chặt chẽ, bề mặt dày dặn, độ bền cao",
      "Ưu điểm: Thấm hút mồ hôi hiệu quả, giữ form tốt sau khi kéo giãn",
      "Màu: Black, Brown đậm",
      "Size: M-XL"
    ],
    category_slug: "quan-jogger",
    sku: "QGNTK413",
    variants: [
      { color: ["Black", "Brown"], size: ["M", "L", "XL"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN KAKI NAM QKTTK601",
    price: 469000,
    images: [
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-1.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/POHTK602-QKTTK601-6.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-4.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-3.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-2.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-8.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QKTTK601-5.jpg"
    ],
    description: [
      "Chất liệu: Kaki cao cấp (97% Cotton, 3% Spandex)",
      "Form: Tapered (Hông đùi rộng rãi, ống thu nhỏ dần từ gối xuống)",
      "Đặc tính: Đứng form, giữ dáng tốt, vải co giãn nhẹ dễ vận động",
      "Thiết kế: Cạp chun ẩn thoải mái, có đỉa, túi chéo trước và túi sau cài cúc",
      "Mix match: Phối cùng sơ mi, polo, áo phông hoặc áo len",
      "Màu: Gray, Beige, Black",
      "Size: 29 – 34"
    ],
    category_slug: "quan-kaki",
    sku: "QKTTK601",
    variants: [
      { color: ["Beige", "Black", "Grey"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK506",
    price: 479000,
    images: [
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK506-1-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK506-4-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK506-3-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/POHTK603-QJDTK506-1.jpg",
      "https://badass.vn/wp-content/uploads/2024/11/QJDTK506-2-1.jpg"
    ],
    description: [
      "Chất liệu: Jeans Denim",
      "Thành phần: 75% Cotton, 23% Poly, 2% Spandex",
      "Form: Slim ôm gọn, hiện đại",
      "Màu: Indigo",
      "Size: 29-30-31-32-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK506",
    variants: [
      { color: ["Indigo"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  },
  {
    name: "QUẦN JEANS NAM QJDTK513",
    price: 499000,
    images: [
      "https://badass.vn/wp-content/uploads/2025/03/QJDTK513-1.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/APHTK611-QJDTK513-1.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QJDTK513-2.jpg",
      "https://badass.vn/wp-content/uploads/2025/03/QJDTK513-3.jpg"
    ],
    description: [
      "Chất liệu: Jeans Denim bền bỉ",
      "Thành phần: 61.3% Cotton, 38.1% Polyester, 0.6% Spandex",
      "Form: Tapered (Ống thon gọn dần)",
      "Màu: Indigo",
      "Size: 29-34"
    ],
    category_slug: "quan-jeans",
    sku: "QJDTK513",
    variants: [
      { color: ["Indigo"], size: ["29", "30", "31", "32", "34"], quantity: 100 }
    ],
    isBestSeller: false
  }
];

export default products;