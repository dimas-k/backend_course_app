const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Login user dan set token ke cookie
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    // Cari user (case-insensitive)
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Simpan token di cookie HTTP-Only
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set true jika pakai HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 hari
    });

    res.json({
      message: 'Login berhasil',
      role: user.role
    });

  } catch (err) {
    console.error('❌ Error login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

/**
 * Logout user: hapus cookie token
 */
exports.logout = (req, res) => {
  console.log('Logout endpoint dipanggil');
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });
  return res.json({ message: 'Logout berhasil' });
};


/**
 * Middleware: cek token JWT
 */
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Belum login' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
    req.user = decoded;
    next();
  });
};

/**
 * Middleware: cek role tertentu
 */
exports.checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Akses ditolak' });
  }
  next();
};
