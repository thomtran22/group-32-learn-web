import mongoose from "mongoose";

//Danh mục sản phẩm
const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,//Tên danh mục là duy nhất
        },
        slug: {
            type: String,
            required: true,
            unique: true, // Slug là duy nhất
        }
    },
    //Tự động cập nhật thời gian tạo và thời gian cập nhật
    {
        timestamps: true,
    }
);
const Category = mongoose.model('Category', categorySchema);

export default Category;