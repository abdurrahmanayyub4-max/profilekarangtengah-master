import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.fasilitas.deleteMany();
  console.log("Data fasilitas lama berhasil dihapus");
  await prisma.potensi.deleteMany();
  console.log("Data potensi lama berhasil dihapus");
  await prisma.pemerintahan.deleteMany();
  console.log("Data pemerintahan lama berhasil dihapus");
  await prisma.perangkatDesa.deleteMany();
  console.log("Data perangkat desa lama berhasil dihapus");

  await prisma.beranda.create({
    data: {
      namaKepala: "Sarwanto",
      jabatanKepala: "Kepala Padukuhan Karangtengah",
      judulSambutan: "Sambutan",
      isiSambutan:
        "Assalamu'alaikum Warahmatullahi Wabarakatuh, Dengan penuh syukur atas berkah dan rahmat Allah SWT, saya menyambut Anda semua yang telah berkunjung ke portal resmi Padukuhan Karangtengah. Kami berkomitmen untuk terus mengembangkan padukuhan dengan menjaga nilai-nilai kebersamaan dan kearifan lokal. Mari bersama-sama membangun Padukuhan Karangtengah yang lebih maju, sejahtera, dan berkelanjutan. Wassalamu'alaikum Warahmatullahi Wabarakatuh",

      judulDeskripsi: "Deskripsi Padukuhan",

      deskripsi1:
        "Padukuhan Karangtengah merupakan salah satu padukuhan yang terletak di Kalurahan Dadapayu, Kapanewon Semanu, Kabupaten Gunungkidul...",

      jumlahPenduduk: "351",
      satuanPenduduk: "Jiwa",

      jumlahRT: "3 RT",
      labelRT: "Rukun Tetangga",

      jumlahRW: "1 RW",
      labelRW: "Rukun Warga",

      deskripsi2:
        "Jumlah penduduk Padukuhan Karangtengah tercatat sebanyak 351 jiwa yang tersebar dalam 3 RT dan 1 RW...",

      judulPertanian: "Potensi Pertanian",
      isiPertanian: "Komoditas: Padi, jagung, kedelai, ketela, kacang tanah",

      judulPeternakan: "Potensi Peternakan",
      isiPeternakan: "Ternak: Sapi, kambing, ayam, dan ternak lainnya",

      deskripsi3:
        "Dari segi potensi wilayah, Padukuhan Karangtengah memiliki sektor pertanian sebagai potensi utama...",

      deskripsi4:
        "Tidak hanya memiliki potensi ekonomi, Padukuhan Karangtengah juga kaya akan potensi budaya...",

      deskripsi5:
        "Dengan potensi sumber daya alam, ekonomi, dan budaya yang dimiliki...",

      judulVisiMisi: "Visi dan Misi",
      judulVisi: "Visi Pemerintah Desa Dadapayu",
      isiVisi: "MENUJU DADAPAYU MANDIRI DAN SEJAHTERA",

      misiList: JSON.stringify([
        "Pemerintah yang bersih transparan bertanggungjawab",
        "Mewujudkan kehidupan yang demokratis dengan mengedepankan musyawarah mufakat",
        "Terpenuhinya akses layanan dasar Pendidikan, Kesehatan, Sarana, dan Prasarana",
        "Pengembangan ekonomi kerakyatan",
        "Optimalisasi peran BUMDesa",
      ]),

      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!...",

      alamat:
        "WPQ4+RP2, Karangtengah, RT.1/RW.5, Dadapayu, Semanu, Gunungkidul, Yogyakarta 55123",
    },
  });

  await prisma.fasilitas.createMany({
    data: [
      {
        kategori: "Keagamaan",
        namaFasilitas: "Masjid Mujahidin",
        image: "/fasilitas/masjid-mujahidin.jpg",
        mapLink: "https://www.google.com/maps/place/Masjid+Mujahidin",
      },
      {
        kategori: "Keagamaan",
        namaFasilitas: "Mushola An - Nur",
        image: "/fasilitas/mushola-an-nur.jpg",
        mapLink: "https://maps.app.goo.gl/cXY26N1Roxcef3Q96",
      },
      {
        kategori: "Pendidikan",
        namaFasilitas: "SMP Muhammadiyah Semanu",
        image: "/fasilitas/smp-muhammadiyah.jpg",
        mapLink: "https://www.google.com/maps/place/SMP+Muhammadiyah+Semanu",
      },
      {
        kategori: "Umum & Administrasi",
        namaFasilitas: "Balai Padukuhan Karangtengah",
        image: "/fasilitas/balai-padukuhan.jpg",
        mapLink:
          "https://www.google.com/maps/place/BALAI+PADUKUHAN+KARANG+TENGAH",
      },
    ],
  });
  console.log("Data fasilitas berhasil ditambahkan");
 
  await prisma.potensi.createMany({
    data: [
      {
        sektor: "Potensi Pertanian",
        image: "/potensi/pertanian.jpg",
        judulGambar: "Lahan Produktif",
        deskripsiGambar:
          "Sebagian besar wilayah berupa lahan persawahan, hutan, dan perkebunan.",
        deskripsiSektor:
          "Dari segi potensi wilayah, Padukuhan Karangtengah memiliki sektor pertanian sebagai potensi utama. Sebagian besar wilayahnya berupa lahan persawahan, hutan, dan perkebunan yang menjadi sumber utama mata pencaharian masyarakat.",
        komoditas: "Padi,Kedelai,Kacang Tanah,Jagung,Ketela",
      },

      
      {
        sektor: "Potensi Peternakan",
        image: "/potensi/peternakan.jpg",
        judulGambar: "Peternakan Berkembang",
        deskripsiGambar:
          "Meningkatkan perekonomian keluarga melalui sektor peternakan.",
        deskripsiSektor:
          "Selain pertanian, sektor peternakan juga berkembang cukup baik. Masyarakat setempat banyak yang beternak sapi, kambing, ayam, dan ternak lainnya sebagai upaya meningkatkan perekonomian keluarga.",
        komoditas: "Sapi,Kambing,Ayam,Bebek",
      },

      
      {
        sektor: "Potensi Budaya",
        image: "/potensi/budaya.jpg",
        judulGambar: "Warisan Budaya Lokal",
        deskripsiGambar:
          "Kesenian tradisional dilestarikan sebagai identitas budaya masyarakat.",
        deskripsiSektor:
          "Tidak hanya memiliki potensi ekonomi, Padukuhan Karangtengah juga kaya akan potensi budaya. Kesenian tradisional masih dilestarikan oleh masyarakat sebagai bagian dari identitas dan warisan budaya lokal.",
        komoditas: "Karawitan,Ketoprak,Jathilan",
      },

    ],
  });
  console.log("Data potensi berhasil ditambahkan");

  await prisma.pemerintahan.create({
    data: {
      judul: "Pemerintahan Padukuhan Karangtengah",
      deskripsi:
        "Struktur pemerintahan yang transparan dan akuntabel untuk melayani seluruh masyarakat Padukuhan Karangtengah dengan profesional dan integritas tinggi.",
      judulDeskripsi: "Deskripsi Singkat",
      isiDeskripsi: `Padukuhan Karangtengah merupakan salah satu padukuhan di Kalurahan Dadapayu, Kapanewon Semanu, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta, berjarak sekitar 16 km dari Kota Wonosari. Luas wilayahnya ±125 hektar yang didominasi persawahan, hutan, dan perkebunan.

Jumlah penduduk tercatat 351 jiwa yang tersebar dalam 3 RT dan 1 RW. Secara geografis, wilayah ini berbatasan dengan Padukuhan Kauman dan Kalurahan Dadapayu (utara), Padukuhan Nogosari (barat), Padukuhan Sembuku dan Kalurahan Dadapayu (selatan), serta Padukuhan Ploso, Kalurahan Petir (timur).

Potensi utama Karangtengah berada pada sektor pertanian dengan komoditas padi, jagung, kedelai, ketela, dan kacang tanah. Sektor peternakan juga berkembang, meliputi sapi, kambing, dan ayam. Selain itu, kesenian tradisional seperti karawitan, ketoprak dan jathilan masih aktif dilestarikan masyarakat sebagai bagian dari identitas budaya lokal.`,
      judulVisiMisi: "Visi & Misi",
      visi: "MENUJU DADAPAYU MANDIRI DAN SEJAHTERA",
      deskripsiStruktur:
        "Struktur organisasi pemerintahan Padukuhan Karangtengah disusun berdasarkan Peraturan Menteri Dalam Negeri dengan prinsip efisiensi, efektivitas, dan profesionalisme dalam memberikan pelayanan kepada masyarakat. Setiap unit memiliki tanggung jawab yang jelas dan akuntabilitas yang tinggi.",
    },
  });
  console.log("Data pemerintahan berhasil ditambahkan");

  // Data Perangkat Desa
  await prisma.perangkatDesa.createMany({
    data: [
      { nama: "Sarwanto", jabatan: "KEPALA PADUKUHAN" },
      { nama: "Giyanto", jabatan: "KETUA RW" },
      { nama: "Dwi Handung P", jabatan: "KARANG TARUNA SUB UNIT" },
      { nama: "Suyono", jabatan: "LPMP" },
      { nama: "Surahmad", jabatan: "LPMP" },
      { nama: "Arisno", jabatan: "LPMP" },
      { nama: "Arisno", jabatan: "KETUA RT 1" },
      { nama: "Syahirto", jabatan: "KETUA RT 2" },
      { nama: "Budi Utomo", jabatan: "KETUA RT 3" },
      { nama: "Wajib P", jabatan: "LINMAS" },
      { nama: "Sugeng P", jabatan: "LINMAS" },
      { nama: "Sarmanta", jabatan: "TA'MIR MASJID" },
      { nama: "Sudarti", jabatan: "KELOMPOK WANITA TANI" },
      { nama: "Siyarto", jabatan: "SEKSI SENI DAN BUDAYA" },
    ],
  });
  console.log("Data perangkat desa berhasil ditambahkan");

  console.log("Semua proses seed selesai ✅");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });