# Discipline Status Bar ⚔️

GNOME Shell extension yang menampilkan pesan pengingat disiplin ala **Murim Academy** di panel atas desktop.

*A GNOME Shell extension that displays Murim-style discipline reminder messages in the top panel.*

![GNOME Shell 45+](https://img.shields.io/badge/GNOME%20Shell-45+-blue)
![License](https://img.shields.io/badge/license-GPL--3.0-green)

---

## 🇮🇩 Bahasa Indonesia

### ✨ Fitur

- 🥋 Pesan pengingat gaya Murim (qi, cultivation, petarung, dll)
- 🌐 Dukungan 2 bahasa (Indonesia & English)
- ⌨️ Animasi mengetik yang smooth
- ⚙️ Pengaturan posisi panel (kiri/tengah/kanan)
- ⏱️ Interval pesan yang bisa diatur
- 🎯 Klik untuk pesan baru

### 📦 Instalasi

1. Clone atau download repository ini:
   ```bash
   git clone https://github.com/YgnizemKamajaya/disciplinestatusbar-gnome.git
   ```

2. Copy ke folder extensions GNOME:
   ```bash
   cp -r disciplinestatusbar-gnome ~/.local/share/gnome-shell/extensions/disciplinestatusbar@kamajaya
   ```

3. Compile schema:
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/disciplinestatusbar@kamajaya/schemas/
   ```

4. Restart GNOME Shell:
   - **X11**: Tekan `Alt+F2`, ketik `r`, tekan Enter
   - **Wayland**: Logout dan login kembali

5. Aktifkan extension:
   ```bash
   gnome-extensions enable disciplinestatusbar@kamajaya
   ```

### ⚙️ Pengaturan

| Pengaturan | Deskripsi | Default |
|------------|-----------|---------|
| Bahasa | Indonesia / English | Indonesia |
| Posisi Panel | Kiri / Tengah / Kanan | Kanan |
| Interval Pesan | Detik antar pergantian (60-3600) | 300 |
| Kecepatan Ketik | Milidetik per karakter (20-200) | 60 |

---

## 🇬🇧 English

### ✨ Features

- 🥋 Murim-style reminder messages (qi, cultivation, warrior, etc.)
- 🌐 Bilingual support (Indonesian & English)
- ⌨️ Smooth typing animation
- ⚙️ Panel position settings (left/center/right)
- ⏱️ Configurable message interval
- 🎯 Click for new message

### 📦 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YgnizemKamajaya/disciplinestatusbar-gnome.git
   ```

2. Copy to GNOME extensions folder:
   ```bash
   cp -r disciplinestatusbar-gnome ~/.local/share/gnome-shell/extensions/disciplinestatusbar@kamajaya
   ```

3. Compile schema:
   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/disciplinestatusbar@kamajaya/schemas/
   ```

4. Restart GNOME Shell:
   - **X11**: Press `Alt+F2`, type `r`, press Enter
   - **Wayland**: Logout and login again

5. Enable the extension:
   ```bash
   gnome-extensions enable disciplinestatusbar@kamajaya
   ```

### ⚙️ Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Language | Indonesian / English | Indonesian |
| Panel Position | Left / Center / Right | Right |
| Message Interval | Seconds between messages (60-3600) | 300 |
| Typing Speed | Milliseconds per character (20-200) | 60 |

---

## 📝 Changelog

### v1.0.1
- Renamed project to Discipline Status Bar
- Added bilingual support (Indonesian & English)
- Added language toggle in settings
- Updated UI to bilingual labels

### v1.0.0 (Initial Release)
- Initial version
- Murim-style discipline reminder messages
- Typing animation
- Position, interval, and speed settings
- Donation section with QRIS Dana

## 💖 Support

Jika extension ini bermanfaat, pertimbangkan untuk mendukung pengembangan!
*If you find this extension useful, consider supporting the development!*

Scan QRIS Dana di halaman pengaturan extension.
*Scan the QRIS Dana in the extension settings page.*

## 📄 License

GPL-3.0 License

---

Made with ❤️ by [@YgnizemKamajaya](https://github.com/YgnizemKamajaya)
