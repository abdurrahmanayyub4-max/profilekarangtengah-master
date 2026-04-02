// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { username, newPassword } = await req.json();

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Username dan password baru wajib diisi.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter.' },
        { status: 400 }
      );
    }

    // Cek apakah user dengan username tersebut ada
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Username tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password di database
    await prisma.user.update({
      where: { username },
      data:  { password: hashedPassword },
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
