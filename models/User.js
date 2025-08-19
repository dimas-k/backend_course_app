const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  tanggal_Lahir: {
    type: String, 
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'pengajar', 'murid'],
    default: 'murid',
  },
}, {
  timestamps: true, // biar ada createdAt dan updatedAt otomatis
});

module.exports = mongoose.model('User', userSchema);
