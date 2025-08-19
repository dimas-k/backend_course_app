require('dotenv').config();
const mongoose = require('mongoose');
const seedUsers = require('./seedUsers');
// const seedCourses = require('./seedCourses');
// const seedVideos = require('./seedVideos');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await seedUsers();
//   await seedCourses();
//   await seedVideos();

  await mongoose.disconnect();
  console.log('✅ Seeder selesai');
}

main().catch(console.error);
