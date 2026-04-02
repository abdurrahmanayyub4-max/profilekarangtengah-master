'use client';

// app/admin/beranda/[id]/edit/EditForm.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaTimes, FaBold, FaItalic, FaUnderline,
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter,
  FaAlignRight, FaStrikethrough, FaPlus, FaTrash,
  FaMapMarkerAlt, FaInfoCircle
} from 'react-icons/fa';

type Beranda = {
  id: number;
  namaKepala: string | null;
  jabatanKepala: string | null;
  judulSambutan: string | null;
  isiSambutan: string | null;
  judulDeskripsi: string | null;
  deskripsi1: string | null;
  deskripsi2: string | null;
  deskripsi3: string | null;
  deskripsi4: string | null;
  deskripsi5: string | null;
  jumlahPenduduk: string | null;
  satuanPenduduk: string | null;
  jumlahRT: string | null;
  labelRT: string | null;
  jumlahRW: string | null;
  labelRW: string | null;
  judulPertanian: string | null;
  isiPertanian: string | null;
  judulPeternakan: string | null;
  isiPeternakan: string | null;
  judulVisiMisi: string | null;
  judulVisi: string | null;
  isiVisi: string | null;
  misiList: string | null;
  alamat: string | null;
  mapLink: string | null;
};

// ─── Konversi link Google Maps biasa → embed URL ───────────────────────────
function extractEmbedSrc(input: string): string {
  if (!input.trim()) return '';

  // 1. User paste kode <iframe src="..."> — ambil src langsung
  const srcMatch = input.match(/src=["']([^"']+)["']/);
  if (srcMatch) return srcMatch[1];

  // 2. Sudah berupa embed URL — kembalikan langsung
  if (input.includes('google.com/maps/embed')) return input;

  // 3. Ambil koordinat dari URL panjang: @lat,lng
  const coordMatch = input.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    const lat = coordMatch[1];
    const lng = coordMatch[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
  }

  // 4. URL pendek (maps.app.goo.gl, goo.gl/maps) atau URL biasa apapun
  // — pakai sebagai query parameter di embed, browser akan resolve sendiri
  return `https://maps.google.com/maps?q=${encodeURIComponent(input)}&output=embed`;
}

// ─── Rich Text Editor ───────────────────────────────────────────────────────
interface RichEditorProps {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  minHeight?: number;
}

function RichEditor({ name, defaultValue, placeholder, minHeight = 120 }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, []);

  const syncValue = useCallback(() => {
    if (hiddenRef.current && editorRef.current) {
      hiddenRef.current.value = editorRef.current.innerHTML;
    }
  }, []);

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncValue();
  };

  const toolbarButtons = [
    { icon: <FaBold />, cmd: 'bold', title: 'Tebal (Ctrl+B)' },
    { icon: <FaItalic />, cmd: 'italic', title: 'Miring (Ctrl+I)' },
    { icon: <FaUnderline />, cmd: 'underline', title: 'Garis Bawah (Ctrl+U)' },
    { icon: <FaStrikethrough />, cmd: 'strikeThrough', title: 'Coret' },
    { type: 'sep' },
    { icon: <FaListUl />, cmd: 'insertUnorderedList', title: 'Daftar Poin' },
    { icon: <FaListOl />, cmd: 'insertOrderedList', title: 'Daftar Angka' },
    { type: 'sep' },
    { icon: <FaAlignLeft />, cmd: 'justifyLeft', title: 'Rata Kiri' },
    { icon: <FaAlignCenter />, cmd: 'justifyCenter', title: 'Rata Tengah' },
    { icon: <FaAlignRight />, cmd: 'justifyRight', title: 'Rata Kanan' },
  ];

  return (
    <div className="rich-editor-wrapper rounded-xl border border-gray-200 overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
        {toolbarButtons.map((btn, i) =>
          btn.type === 'sep' ? (
            <span key={i} className="w-px h-5 bg-gray-300 mx-1" />
          ) : (
            <button
              key={i}
              type="button"
              title={btn.title}
              onMouseDown={(e) => { e.preventDefault(); exec(btn.cmd!); }}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 text-xs transition-colors"
            >
              {btn.icon}
            </button>
          )
        )}
        {/* Font size */}
        <span className="w-px h-5 bg-gray-300 mx-1" />
        <select
          className="text-xs border-0 bg-transparent text-gray-600 cursor-pointer focus:outline-none"
          onChange={(e) => exec('fontSize', e.target.value)}
          defaultValue="3"
          title="Ukuran Font"
        >
          {[1,2,3,4,5,6].map(s => (
            <option key={s} value={s}>
              {['Kecil Sekali','Kecil','Normal','Besar','Besar Sekali','Sangat Besar'][s-1]}
            </option>
          ))}
        </select>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncValue}
        onBlur={syncValue}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="rich-editor-content px-4 py-3 text-sm text-gray-700 focus:outline-none"
      />

      {/* Hidden input buat form submit */}
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultValue ?? ''} />
    </div>
  );
}

// ─── Maps Preview ───────────────────────────────────────────────────────────
function MapsField({ defaultValue }: { defaultValue?: string | null }) {
  const [input, setInput] = useState(defaultValue ?? '');
  const [embedUrl, setEmbedUrl] = useState(() => {
    if (!defaultValue) return '';
    // Kalau sudah embed URL, pakai langsung
    const srcMatch = defaultValue.match(/src=["']([^"']+)["']/);
    if (srcMatch) return srcMatch[1];
    if (defaultValue.includes('google.com/maps/embed') ||
        defaultValue.includes('output=embed')) return defaultValue;
    return '';
  });
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleChange = async (val: string) => {
    setInput(val);
    if (!val.trim()) {
      setEmbedUrl('');
      return;
    }

    // Kalau paste <iframe>, langsung ambil src
    const srcMatch = val.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      setEmbedUrl(srcMatch[1]);
      return;
    }

    // Kalau sudah embed URL
    if (val.includes('google.com/maps/embed') || val.includes('output=embed')) {
      setEmbedUrl(val);
      return;
    }

    // Resolve via API server
    setLoading(true);
    try {
      const res = await fetch(`/api/resolve-maps?url=${encodeURIComponent(val)}`);
      const data = await res.json();
      setEmbedUrl(data.embedUrl ?? '');
    } catch {
      setEmbedUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="form-label flex-1">Link / Embed Maps</label>
        <button
          type="button"
          onClick={() => setShowTip(!showTip)}
          className="text-xs text-indigo-500 flex items-center gap-1 hover:text-indigo-700"
        >
          <FaInfoCircle /> Cara dapat link
        </button>
      </div>

      {showTip && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-700 space-y-1">
          <p className="font-bold">Cara mendapatkan link Google Maps:</p>
          <ol className="list-decimal list-inside space-y-1 text-indigo-600">
            <li>Buka <strong>Google Maps</strong> di browser</li>
            <li>Cari lokasi yang diinginkan</li>
            <li>Klik tombol <strong>Bagikan</strong> (Share)</li>
            <li>Klik <strong>"Salin tautan"</strong></li>
            <li>Tempel link di kolom di bawah</li>
          </ol>
          <p className="text-indigo-500 mt-1">Bisa juga paste kode &lt;iframe&gt; dari tab "Sematkan peta" untuk hasil paling akurat.</p>
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        rows={2}
        className="form-input w-full resize-none text-xs font-mono"
        placeholder='Paste link share dari Google Maps...'
      />

      <input type="hidden" name="mapLink" value={embedUrl} />

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 text-xs text-indigo-500 bg-indigo-50 px-3 py-2 rounded-lg">
          <span className="upload-spinner" /> Memuat preview peta...
        </div>
      )}

      {/* Preview */}
      {embedUrl && !loading && (
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 flex items-center gap-1 border-b border-gray-200">
            <FaMapMarkerAlt className="text-rose-400" /> Preview Peta
          </div>
          <iframe
            src={embedUrl}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}

// ─── Dynamic Misi List ───────────────────────────────────────────────────────
interface MisiListProps {
  defaultMisiList: string | null; // JSON string dari DB
  onChange: (list: string[]) => void;
}

function MisiList({ defaultMisiList, onChange }: MisiListProps) {
  const parsed = (() => {
    try {
      const arr = JSON.parse(defaultMisiList ?? '[]');
      return Array.isArray(arr) && arr.length > 0 ? arr : [''];
    } catch {
      return [''];
    }
  })();

  const [misiList, setMisiList] = useState<string[]>(parsed);

  const update = (next: string[]) => {
    setMisiList(next);
    onChange(next);
  };

  const add = () => update([...misiList, '']);
  const remove = (i: number) => {
    if (misiList.length === 1) return;
    update(misiList.filter((_, idx) => idx !== i));
  };
  const edit = (i: number, val: string) => {
    const next = [...misiList];
    next[i] = val;
    update(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {misiList.map((val, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {i + 1}
          </span>
          <input
            value={val}
            onChange={(e) => edit(i, e.target.value)}
            className="form-input flex-1"
            placeholder={`Isi Misi ${i + 1}...`}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={misiList.length === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl border border-dashed border-indigo-300 transition-all w-full justify-center"
      >
        <FaPlus /> Tambah Misi
      </button>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function EditForm({ beranda }: { beranda: Beranda }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State untuk misi dinamis — diisi dari MisiList via callback
  const [misiData, setMisiData] = useState<string[]>(() => {
    try {
      const arr = JSON.parse(beranda.misiList ?? '[]');
      return Array.isArray(arr) && arr.length > 0 ? arr : [''];
    } catch {
      return [''];
    }
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const getValue = (name: string) => (formData.get(name) as string) ?? '';

    const body = {
      id:              beranda.id,
      namaKepala:      getValue('namaKepala'),
      jabatanKepala:   getValue('jabatanKepala'),
      judulSambutan:   getValue('judulSambutan'),
      isiSambutan:     getValue('isiSambutan'),
      judulDeskripsi:  getValue('judulDeskripsi'),
      deskripsi1:      getValue('deskripsi1'),
      deskripsi2:      getValue('deskripsi2'),
      deskripsi3:      getValue('deskripsi3'),
      deskripsi4:      getValue('deskripsi4'),
      deskripsi5:      getValue('deskripsi5'),
      jumlahPenduduk:  getValue('jumlahPenduduk'),
      satuanPenduduk:  getValue('satuanPenduduk'),
      jumlahRT:        getValue('jumlahRT'),
      labelRT:         getValue('labelRT'),
      jumlahRW:        getValue('jumlahRW'),
      labelRW:         getValue('labelRW'),
      judulPertanian:  getValue('judulPertanian'),
      isiPertanian:    getValue('isiPertanian'),
      judulPeternakan: getValue('judulPeternakan'),
      isiPeternakan:   getValue('isiPeternakan'),
      judulVisiMisi:   getValue('judulVisiMisi'),
      judulVisi:       getValue('judulVisi'),
      isiVisi:         getValue('isiVisi'),
      misiList: JSON.stringify(misiData.filter(m => m.trim() !== '')),
      alamat:          getValue('alamat'),
      mapLink:         getValue('mapLink'),
    };

    try {
      const res = await fetch('/api/beranda/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Gagal menyimpan. Coba lagi.');
        setLoading(false);
        return;
      }
      router.push('/admin/beranda');
      router.refresh();
    } catch {
      setError('Terjadi kesalahan koneksi. Coba lagi.');
      setLoading(false);
    }
  }

  const inputCls = 'form-input w-full';
  const textareaCls = 'form-input w-full resize-none';

  // Field deskripsi pakai rich editor
  const richFields: Record<string, string | null | undefined> = {
    deskripsi1: beranda.deskripsi1,
    deskripsi2: beranda.deskripsi2,
    deskripsi3: beranda.deskripsi3,
    deskripsi4: beranda.deskripsi4,
    deskripsi5: beranda.deskripsi5,
    isiSambutan: beranda.isiSambutan,
    isiPertanian: beranda.isiPertanian,
    isiPeternakan: beranda.isiPeternakan,
    isiVisi: beranda.isiVisi,
  };

  return (
    <>
      <style jsx global>{`
        .rich-editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rich-editor-content ul { list-style: disc; padding-left: 1.5rem; }
        .rich-editor-content ol { list-style: decimal; padding-left: 1.5rem; }
        .rich-editor-content p { margin: 0.25rem 0; }
      `}</style>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Info bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 text-xs">✏️</span>
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">Edit Data Beranda</div>
            <div className="text-gray-400 text-xs">ID #{beranda.id} · {beranda.namaKepala}</div>
          </div>
        </div>

        {/* ── Kepala Dukuh ── */}
        <SectionCard title="Kepala Dukuh" badge="bg-indigo-100 text-indigo-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Nama Kepala</label>
              <input name="namaKepala" defaultValue={beranda.namaKepala ?? ''} className={inputCls} placeholder="Nama Kepala..." />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Jabatan Kepala</label>
              <input name="jabatanKepala" defaultValue={beranda.jabatanKepala ?? ''} className={inputCls} placeholder="Jabatan..." />
            </div>
          </div>
        </SectionCard>

        {/* ── Sambutan ── */}
        <SectionCard title="Sambutan" badge="bg-emerald-100 text-emerald-700">
          <div className="flex flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Judul Sambutan</label>
              <input name="judulSambutan" defaultValue={beranda.judulSambutan ?? ''} className={inputCls} placeholder="Judul Sambutan..." />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Isi Sambutan</label>
              <RichEditor name="isiSambutan" defaultValue={beranda.isiSambutan} placeholder="Tulis sambutan di sini..." minHeight={140} />
            </div>
          </div>
        </SectionCard>

        {/* ── Profil Padukuhan ── */}
        <SectionCard title="Profil Padukuhan" badge="bg-blue-100 text-blue-700">
          <div className="flex flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Judul Deskripsi</label>
              <input name="judulDeskripsi" defaultValue={beranda.judulDeskripsi ?? ''} className={inputCls} placeholder="Judul..." />
            </div>
            {[1,2,3,4,5].map(n => (
              <div key={n} className="form-group flex flex-col gap-1">
                <label className="form-label">Deskripsi {n}</label>
                <RichEditor
                  name={`deskripsi${n}`}
                  defaultValue={richFields[`deskripsi${n}`]}
                  placeholder={`Tulis deskripsi ${n}...`}
                  minHeight={100}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Statistik ── */}
        <SectionCard title="Statistik" badge="bg-amber-100 text-amber-700">
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ['jumlahPenduduk', 'Jumlah Penduduk', beranda.jumlahPenduduk],
                ['satuanPenduduk', 'Satuan Penduduk', beranda.satuanPenduduk],
                ['jumlahRT',       'Jumlah RT',       beranda.jumlahRT],
                ['labelRT',        'Label RT',        beranda.labelRT],
                ['jumlahRW',       'Jumlah RW',       beranda.jumlahRW],
                ['labelRW',        'Label RW',        beranda.labelRW],
              ] as [string, string, string | null][]
            ).map(([name, label, val]) => (
              <div key={name} className="form-group flex flex-col gap-1">
                <label className="form-label">{label}</label>
                <input
                  name={name}
                  defaultValue={val ?? ''}
                  className={inputCls}
                  placeholder={`${label}...`}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Potensi ── */}
        <SectionCard title="Potensi" badge="bg-lime-100 text-lime-700">
          <div className="flex flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Judul Pertanian</label>
              <input name="judulPertanian" defaultValue={beranda.judulPertanian ?? ''} className={inputCls} placeholder="Judul Pertanian..." />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Isi Pertanian</label>
              <RichEditor name="isiPertanian" defaultValue={beranda.isiPertanian} placeholder="Tulis potensi pertanian..." minHeight={100} />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Judul Peternakan</label>
              <input name="judulPeternakan" defaultValue={beranda.judulPeternakan ?? ''} className={inputCls} placeholder="Judul Peternakan..." />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Isi Peternakan</label>
              <RichEditor name="isiPeternakan" defaultValue={beranda.isiPeternakan} placeholder="Tulis potensi peternakan..." minHeight={100} />
            </div>
          </div>
        </SectionCard>

        {/* ── Visi & Misi ── */}
        <SectionCard title="Visi & Misi" badge="bg-violet-100 text-violet-700">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group flex flex-col gap-1">
                <label className="form-label">Judul Visi Misi</label>
                <input name="judulVisiMisi" defaultValue={beranda.judulVisiMisi ?? ''} className={inputCls} placeholder="Judul..." />
              </div>
              <div className="form-group flex flex-col gap-1">
                <label className="form-label">Judul Visi</label>
                <input name="judulVisi" defaultValue={beranda.judulVisi ?? ''} className={inputCls} placeholder="Judul Visi..." />
              </div>
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Isi Visi</label>
              <RichEditor name="isiVisi" defaultValue={beranda.isiVisi} placeholder="Tulis visi..." minHeight={80} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-1 rounded-full">Daftar Misi</span>
                <span className="text-xs text-gray-400">Bisa tambah atau hapus misi sesuai kebutuhan</span>
              </div>
              <MisiList
                defaultMisiList={beranda.misiList}
                onChange={setMisiData}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Lokasi ── */}
        <SectionCard title="Lokasi" badge="bg-rose-100 text-rose-700">
          <div className="flex flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Alamat</label>
              <textarea name="alamat" defaultValue={beranda.alamat ?? ''} rows={2} className={textareaCls} placeholder="Alamat lengkap..." />
            </div>
            <MapsField defaultValue={beranda.mapLink} />
          </div>
        </SectionCard>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-rose-500 text-sm font-semibold bg-rose-50 px-4 py-3 rounded-xl border border-rose-100">
            <FaTimes className="flex-shrink-0" /> {error}
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end sticky bottom-4">
          <Link href="/admin/beranda" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            {loading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </>
  );
}

// ─── Helper Component ───────────────────────────────────────────────────────
function SectionCard({ title, badge, children }: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge}`}>{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}