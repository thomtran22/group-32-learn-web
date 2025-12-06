require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000; 
app.use(cors());
app.use(express.json());
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
// 3. Kết nối MongoDB
console.log('Đang cố gắng kết nối MongoDB...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB đã kết nối thành công!');
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err.message);
        console.log('Vui lòng kiểm tra lại chuỗi MONGO_URI và Network Access trên Atlas.');
        process.exit(1);
    });
app.get('/', (req, res) => {
    res.json({ message: 'API đang hoạt động tốt!' });
});