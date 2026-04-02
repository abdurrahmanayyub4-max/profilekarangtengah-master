// scripts/create-admin.ts
// Jalankan dengan: npx ts-node scripts/create-admin.ts
// atau tambahkan ke prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'admin123'; // Ganti setelah login pertama!
  const name     = 'Super Admin';

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log('User admin sudah ada, skip.');
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { username, password: hashed, name, role: 'admin' },
  });

  console.log(`✅ User admin berhasil dibuat:`);
  console.log(`   Username : ${user.username}`);
  console.log(`   Password : ${password}`);
  console.log(`   ⚠️  Segera ganti password setelah login pertama!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
