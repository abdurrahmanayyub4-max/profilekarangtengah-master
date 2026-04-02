'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function hapusBeranda(id: number, redirectAfter: string = '/admin') {
  await prisma.beranda.delete({
    where: { id },
  });

  redirect(redirectAfter);
}