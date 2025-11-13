# Peta Pariwisata Interaktif

Sebuah aplikasi web interaktif untuk menjelajahi destinasi wisata terbaik di Indonesia. Dibangun dengan teknologi modern untuk pengalaman pengguna yang optimal.

## ✨ Fitur Utama

- 🗺️ **Peta Interaktif**: Menggunakan Leaflet.js dengan marker clustering
- 🔍 **Pencarian Pintar**: Cari destinasi berdasarkan nama, lokasi, atau deskripsi
- 🏷️ **Filter Canggih**: Filter berdasarkan kategori (Alam, Budaya, Kuliner, Sejarah) dan rating
- ❤️ **Favorit**: Simpan destinasi favorit Anda
- 📍 **Lokasi Saya**: Temukan destinasi terdekat dari lokasi Anda
- 🌤️ **Info Cuaca**: Widget cuaca real-time (memerlukan API key)
- 📱 **Responsif**: Optimal di desktop, tablet, dan mobile
- ♿ **Aksesibilitas**: Mendukung keyboard navigation dan screen reader

## 🚀 Teknologi

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Maps**: Leaflet.js dengan MarkerCluster
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins)
- **Weather API**: OpenWeatherMap (opsional)

## 📁 Struktur Proyek

```
peta-pariwisata/
├── index.html              # Halaman landing
├── map.html                # Halaman peta utama
├── detail.html             # Halaman detail destinasi
├── README.md               # Dokumentasi proyek
├── assets/
│   ├── css/
│   │   ├── style.css       # Global styles
│   │   └── map.css         # Map-specific styles
│   ├── js/
│   │   ├── main.js         # UI helpers & utilities
│   │   ├── data.js         # Sample tourism data
│   │   └── map.js          # Core map functionality
│   └── images/             # Placeholder untuk gambar
```

## 🛠️ Instalasi & Setup

1. **Clone atau download** repositori ini
2. **Buka terminal** dan navigasi ke folder proyek
3. **Jalankan server lokal**:
   ```bash
   # Menggunakan Python (jika tersedia)
   python -m http.server 8000

   # Atau menggunakan Node.js
   npx serve .

   # Atau buka langsung index.html di browser
   ```
4. **Buka browser** dan akses `http://localhost:8000` atau `http://localhost:3000`

## ⚙️ Konfigurasi

### Weather API (Opsional)

Untuk mengaktifkan fitur cuaca:

1. Daftar di [OpenWeatherMap](https://openweathermap.org/api)
2. Dapatkan API key gratis
3. Edit `assets/js/map.js`:
   ```javascript
   this.weatherApiKey = 'YOUR_API_KEY_HERE';
   ```

### Menambah Destinasi Baru

Edit `assets/js/data.js` dan tambahkan objek baru ke array `tourismData`:

```javascript
{
    id: 13,
    name: "Nama Destinasi",
    category: "alam", // alam, budaya, kuliner, sejarah
    location: "Kota, Provinsi",
    coords: [-latitude, longitude],
    rating: 5, // 1-5
    description: "Deskripsi lengkap destinasi...",
    hours: "Jam operasional",
    price: "Harga tiket",
    images: [
        "url_gambar_1.jpg",
        "url_gambar_2.jpg",
        "url_gambar_3.jpg"
    ]
}
```

## 🎨 Kustomisasi

### Mengubah Tema Warna

Edit variabel CSS di `assets/css/style.css`:

```css
:root {
    --primary-color: #2c5aa0;    /* Ubah warna utama */
    --accent-color: #ff6b35;     /* Ubah warna aksen */
    --text-color: #333;          /* Ubah warna teks */
}
```

### Menambah Kategori Baru

1. Tambahkan kategori di `assets/js/data.js`
2. Update filter buttons di `map.html`
3. Tambahkan styling di `assets/css/map.css`

## 📱 Penggunaan

### Navigasi Dasar

1. **Halaman Utama**: Jelajahi fitur dan klik "Jelajahi Peta"
2. **Peta Interaktif**: Gunakan sidebar untuk mencari dan memfilter
3. **Detail Destinasi**: Klik marker atau hasil pencarian untuk detail lengkap

### Fitur Canggih

- **Pencarian**: Ketik di kolom pencarian untuk hasil real-time
- **Filter**: Klik tombol kategori atau centang rating minimum
- **Favorit**: Klik ikon hati di popup atau halaman detail
- **Lokasi**: Klik tombol lokasi untuk menemukan destinasi terdekat
- **Cuaca**: Lihat widget cuaca di kanan atas peta

## 🌐 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 📊 Performa

- **Lazy Loading**: Gambar dimuat saat dibutuhkan
- **Debounced Search**: Optimasi pencarian untuk performa
- **Marker Clustering**: Efisien untuk banyak marker
- **Local Storage**: Data favorit disimpan lokal

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repositori
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## 🙏 Kredit

- **Leaflet**: Library peta open-source
- **OpenStreetMap**: Data peta
- **Font Awesome**: Icon library
- **Google Fonts**: Font Poppins
- **Unsplash**: Gambar placeholder

## 📞 Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Periksa [Issues](https://github.com/username/peta-pariwisata/issues) yang sudah ada
2. Buat Issue baru jika diperlukan
3. Sertakan detail browser, OS, dan langkah untuk mereproduksi error

---

**Dibuat dengan ❤️ untuk Indonesia**

*Menjelajahi keindahan nusantara, satu destinasi dalam satu waktu.*
