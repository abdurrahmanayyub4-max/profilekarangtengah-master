// app/admin/potensi/action.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function hapusPotensi(
  id: number,
  redirectTo: string = "/admin/potensi"
) {
  await prisma.potensi.delete({ where: { id } });
  revalidatePath("/admin/potensi");
  redirect(redirectTo);
}