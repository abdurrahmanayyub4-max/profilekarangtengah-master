// app/api/resolve-maps/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'URL kosong' }, { status: 400 });

  // Kalau sudah embed, kembalikan langsung
  if (url.includes('google.com/maps/embed')) {
    return NextResponse.json({ embedUrl: url });
  }

  // Kalau ada <iframe src="...">, ambil src-nya
  const srcMatch = url.match(/src=["']([^"']+)["']/);
  if (srcMatch) {
    return NextResponse.json({ embedUrl: srcMatch[1] });
  }

  try {
    // Resolve URL pendek lewat fetch di server (bisa akses redirect)
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    });

    const resolvedUrl = res.url; // URL setelah redirect

    // Ambil koordinat dari URL yang sudah di-resolve
    const coordMatch = resolvedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
      return NextResponse.json({ embedUrl });
    }

    // Ambil nama place dari URL
    const placeMatch = resolvedUrl.match(/\/place\/([^/@?]+)/);
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
      return NextResponse.json({ embedUrl });
    }

    // Fallback: pakai resolved URL sebagai query
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(resolvedUrl)}&output=embed`;
    return NextResponse.json({ embedUrl });

  } catch {
    // Fallback kalau fetch gagal: pakai URL asli sebagai query
    const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
    return NextResponse.json({ embedUrl });
  }
}