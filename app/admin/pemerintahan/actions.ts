'use server';

// app/admin/pemerintahan/actions.ts
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function hapusPemerintahan(id: number, redirectAfter = '/admin/pemerintahan') {
  await prisma.pemerintahan.delete({ where: { id } });
  revalidatePath('/admin/pemerintahan');
  redirect(redirectAfter);
}

export async function hapusPerangkat(id: number, redirectAfter = '/admin/pemerintahan') {
  await prisma.perangkatDesa.delete({ where: { id } });
  revalidatePath('/admin/pemerintahan');
  redirect(redirectAfter);
}
