const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const orderRoutes = require('./routes/OrderRoutes');
const cartRoutes = require('./routes/CartRoutes');

// Routes
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API đang chạy!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});