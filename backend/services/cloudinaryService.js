import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cấu hình 1 lần duy nhất
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Hàm tạo chữ ký
export const generateUploadSignature = (folderName = 'products') => {
    const timestamp = Math.round((new Date).getTime() / 1000);

    // Params để ký (Client phải gửi params khớp y hệt thế này lên Cloudinary)
    const paramsToSign = {
        timestamp: timestamp,
        folder: folderName,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return {
        timestamp,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder: folderName
    };
};