// app/api/auth/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    // ── Ubah Username ──────────────────────────────────────────────────────
    if (type === 'username') {
      const { oldUsername, newUsername } = body;

      if (!oldUsername || !newUsername) {
        return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
      }

      // Cek user lama ada
      const user = await prisma.user.findUnique({ where: { username: oldUsername } });
      if (!user) {
        return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 });
      }

      // Cek username baru belum dipakai
      const existing = await prisma.user.findUnique({ where: { username: newUsername } });
      if (existing) {
        return NextResponse.json({ error: 'Username sudah digunakan.' }, { status: 409 });
      }

      await prisma.user.update({
        where: { username: oldUsername },
        data:  { username: newUsername },
      });

      return NextResponse.json({ success: true });
    }

    // ── Ubah Password ──────────────────────────────────────────────────────
    if (type === 'password') {
      const { username, oldPassword, newPassword } = body;

      if (!username || !oldPassword || !newPassword) {
        return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'Password baru minimal 6 karakter.' }, { status: 400 });
      }

      // Cek user ada
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 });
      }

      // Verifikasi password lama
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Password lama salah.' }, { status: 401 });
      }

      // Hash dan simpan password baru
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { username },
        data:  { password: hashedPassword },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Tipe tidak valid.' }, { status: 400 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
