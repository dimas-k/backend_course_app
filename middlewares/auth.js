const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Bypass untuk login dan register
    if (req.path === '/auth/login' || req.path === '/auth/register') {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token tidak tersedia' });
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user di req agar bisa dipakai di controller lain
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid atau sudah kadaluarsa' });
  }
};

module.exports = authMiddleware;
