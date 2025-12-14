import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'; 
import categoryRoutes from './routes/categoryRoutes.js'; 
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }
// )); 
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1); 
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('API is running on port ' + PORT);
});

app.use('/api/products', productRoutes); 
app.use('/api/categories', categoryRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));