import { LucideIcon } from 'lucide-react'

export interface MenuItem {
  href: string
  label: string
  icon: LucideIcon
}

export interface QuickInfoItem {
  title: string
  description: string
  icon: LucideIcon
}

export interface PerangkatDesa {
  nama: string
  jabatan: string
}

export interface PotensiItem {
  title: string
  items: string[]
  icon: LucideIcon
}

export interface FasilitasItem {
  kategori: string
  namaFasilitas: string
  icon: LucideIcon
  image: string
  mapLink: string
}


export interface UMKMItem {
  nama: string
  pemilik: string
  deskripsi: string
  produk: string[]
  jumlahPekerja: number
  omzet: string
}