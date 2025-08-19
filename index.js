const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// CORS: izinkan frontend Next.js
app.use(cors({
  origin: 'http://localhost:3000', // ganti sesuai alamat frontend
  credentials: true, // penting untuk kirim cookie
}));

app.use(express.json());
app.use(cookieParser());

// Koneksi MongoDB
mongoose.connect('mongodb://localhost:27017/course_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB Connected to course_app');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Route tes
app.get('/', (req, res) => {
  res.send('API Bimbel berjalan...');
});

// Gunakan route auth yang sudah kamu buat
const authRoutes = require('./routes/auth'); // pastikan nama file sesuai
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
