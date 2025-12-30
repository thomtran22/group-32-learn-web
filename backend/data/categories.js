const categories = [
    // Danh mục cha
    {
        name: "ÁO NAM",
        slug: "ao-nam",
        parentSlug: null
    },
    {
        name: "QUẦN NAM",
        slug: "quan-nam",
        parentSlug: null
    },
    {
        name: "PHỤ KIỆN",
        slug: "phu-kien",
        parentSlug: null
    },
    //Danh mục con thuộc áo nam
    {
        name: "ÁO KHOÁC",
        slug: "ao-khoac",
        parentSlug: "ao-nam"
    },
    {
        name: "ÁO PHÔNG",
        slug: "ao-phong",
        parentSlug: "ao-nam"
    },
    { 
        name: "ÁO THUN", 
        slug: "ao-thun", 
        parentSlug: "ao-nam" 
    },
    { 
        name: "ÁO NỈ", 
        slug: "ao-ni", 
        parentSlug: "ao-nam" },
    { 
        name: "ÁO POLO", 
        slug: "ao-polo", 
        parentSlug: "ao-nam" 
    },
    // Danh mục con thuộc quần nam
    {
        name: "QUẦN ÂU",
        slug: "quan-au",
        parentSlug: "quan-nam"
    },
    {
        name: "QUẦN JEANS",
        slug: "quan-jeans",
        parentSlug: "quan-nam"
    },
    {
        name: "QUẦN SHORT",
        slug: "quan-short",
        parentSlug: "quan-nam"
    },
    {
        name: "QUẦN JOGGER",
        slug: "quan-jogger",
        parentSlug: "quan-nam"
    },
    {
        name: "QUẦN KAKI",
        slug: "quan-kaki",
        parentSlug: "quan-nam"
    },
    // Danh mục con thuộc phụ kiên
    { 
        name: "BA LÔ", 
        slug: "balo", 
        parentSlug: "phu-kien" 
    }
]

export default categories;
