const bcrypt = require('bcrypt');
const User = require('../models/User');

async function seedUsers() {
  const users = [
    {
      nama: 'Byanice',
      email: 'course@example.com',
      tanggal_Lahir: '20-12-2000', // Gunakan format ISO jika field-nya Date
      alamat: 'Jl. Contoh Alamat No. 123',
      kelas: '10',
      username: 'byan123',
      password: 'qwerty123',
      role: 'murid'
    },
    {
      nama: 'Zakiyya ZR',
      email: 'guru@gmail.com',
      tanggal_Lahir: '15-05-1985',
      alamat: 'Jl. Guru No. 456',
      username: 'zakiyya',
      password: 'password123',
      role: 'pengajar'
    },
    {
      nama: 'Osamu Dazai',
      email: 'admin@gmail.com',
      tanggal_Lahir: '15-05-1985',
      alamat: 'Jl. admin No. 456',
      username: 'osamu',
      password: '123456',
      role: 'admin'
    },
  ];

  console.log('🧹 Koleksi User dikosongkan...');
  await User.deleteMany({});

  for (const userData of users) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = new User({
        nama: userData.nama,
        email: userData.email,
        tanggal_Lahir: userData.tanggal_Lahir,
        alamat: userData.alamat,
        kelas: userData.kelas,
        username: userData.username,
        passwordHash: hashedPassword,
        role: userData.role,
      });

      await user.save();
      console.log(`✅ User ${user.username} berhasil dimasukkan`);
    } catch (err) {
      console.error(`❌ Gagal memasukkan data user ${userData.username}:`, err.message);
    }
  }
}

module.exports = seedUsers;
