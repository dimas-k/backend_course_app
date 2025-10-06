const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  tanggal_Lahir: { type: Date, required: true },
  alamat: { type: String, required: true },
  kelas: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'pengajar', 'murid', 'orangtua'],
    default: 'murid',
  },
}, { timestamps: true });

// otomatis hash password sebelum save
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
