# MurimDiscipleBot ⚔️

GNOME Shell extension yang menampilkan pesan pengingat disiplin ala **Murim Academy** di panel atas desktop.

*A GNOME Shell extension that displays Murim-style discipline reminder messages in the top panel.*

![GNOME Shell 48+](https://img.shields.io/badge/GNOME%20Shell-42--49-blue)
![License](https://img.shields.io/badge/license-GPL--3.0-green)

## ✨ Fitur

- 🥋 Pesan pengingat gaya Murim (qi, cultivation, petarung, dll)
- ⌨️ Animasi mengetik yang smooth
- ⚙️ Pengaturan posisi panel (kiri/tengah/kanan)
- ⏱️ Interval pesan yang bisa diatur
- 🎯 Klik untuk pesan baru

## 📦 Instalasi

### Manual Install

1. Clone atau download repository ini:
   ```bash
   git clone https://github.com/YgnizemKamajaya/MurimDiscipleBot.git
   ```

2. Copy ke folder extensions GNOME:
   ```bash
   cp -r MurimDiscipleBot ~/.local/share/gnome-shell/extensions/murimdisciple@kamajaya
   ```

3. Compile schema:
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/murimdisciple@kamajaya/schemas/
   ```

4. Restart GNOME Shell:
   - **X11**: Tekan `Alt+F2`, ketik `r`, tekan Enter
   - **Wayland**: Logout dan login kembali

5. Aktifkan extension:
   ```bash
   gnome-extensions enable murimdisciple@kamajaya
   ```

   Atau gunakan aplikasi **Extensions** / **Extension Manager**.

## ⚙️ Pengaturan

Buka pengaturan melalui:
- Klik ikon ⚙️ di Extension Manager
- Atau jalankan: `gnome-extensions prefs murimdisciple@kamajaya`

### Opsi yang tersedia:
| Pengaturan | Deskripsi | Default |
|------------|-----------|---------|
| Posisi Panel | Kiri / Tengah / Kanan | Kanan |
| Interval Pesan | Detik antar pergantian (60-3600) | 300 |
| Kecepatan Ketik | Milidetik per karakter (20-200) | 60 |

## 📝 Changelog

### v1.0.0 (Initial Release)
- Initial version
- Pesan pengingat gaya Murim dalam Bahasa Indonesia
- Animasi mengetik
- Pengaturan posisi, interval, dan kecepatan
- Donation section dengan QRIS Dana

## 🤝 Kontribusi

Pull request dan issue sangat diterima!

## 📄 Lisensi

GPL-3.0 License - Lihat [LICENSE](LICENSE) untuk detail.

## 💖 Support

Jika extension ini bermanfaat, pertimbangkan untuk mendukung pengembangan!

Scan QRIS Dana di halaman pengaturan extension.

---

Made with ❤️ by [@YgnizemKamajaya](https://github.com/YgnizemKamajaya)
