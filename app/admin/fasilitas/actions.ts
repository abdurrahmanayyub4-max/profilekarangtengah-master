"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function hapusFasilitas(id: number, redirectTo: string = "/admin/fasilitas") {
  await prisma.fasilitas.delete({ where: { id } });
  revalidatePath("/admin/fasilitas");
  redirect(redirectTo);
}