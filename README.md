# Yuumiru — Setup Instructions

## 1. Setup Database (Supabase)

1. Buka project Supabase Anda: https://supabase.com/dashboard/project/kzpslekblpyhqjdvlgtx
2. Masuk ke menu **SQL Editor** → **New query**.
3. Copy seluruh isi file `supabase_schema.sql` (di folder ini), paste, lalu klik **Run**.
   Script ini akan membuat semua tabel (profiles, anime, episodes, genres, comments, reactions, watch_history), mengisi 25 genre, mengaktifkan Row Level Security, dan mengaktifkan Realtime untuk komentar & like/dislike.
4. Masuk ke menu **Authentication → Providers**, pastikan **Email** provider aktif (biasanya sudah default aktif).
5. (Opsional, disarankan) Di **Authentication → Settings**, matikan "Confirm email" jika ingin user bisa login langsung tanpa verifikasi email saat development.

## 2. Membuat Akun Admin (adminyuumiru50)

Karena pembuatan akun harus melalui proses signup resmi Supabase (demi keamanan), lakukan ini sekali saja:

1. Buka `register.html` di browser (lihat langkah run di bawah).
2. Daftar dengan:
   - Username: `adminyuumiru50`
   - Email: gunakan email apa pun yang Anda kuasai, misalnya `adminyuumiru50@yuumiru.app` atau email asli Anda.
   - Password: `bIssNk09LtIT` (default — **segera ganti setelah login pertama** lewat Supabase Dashboard → Authentication → Users → pilih user → Reset Password, atau lewat fitur lupa password jika ditambahkan nanti).
3. Setelah berhasil daftar, buka **SQL Editor** di Supabase lagi, jalankan query ini (ganti email sesuai yang didaftarkan):

```sql
update public.profiles
set is_admin = true, username = 'adminyuumiru50'
where email = 'EMAIL_YANG_DIDAFTARKAN';
```

4. Sekarang akun tersebut adalah admin. Login admin panel melalui halaman `admin-login.html` menggunakan email & password yang sama.

## 3. Menjalankan Website

Karena project ini pure HTML/CSS/JS (tanpa build tool), Anda cukup membuka filenya lewat web server lokal (jangan dibuka langsung via `file://` karena beberapa browser membatasi fetch API pada protokol file).

Cara termudah:

```bash
cd yuumiru
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000/index.html` di browser.

Atau gunakan extension **Live Server** di VS Code, atau upload semua file ke hosting statis (Netlify, Vercel, GitHub Pages, cPanel, dll) — semua berfungsi sama karena tidak ada proses build/server-side.

## 4. Menambahkan Konten (Sebagai Admin)

1. Login di `admin-login.html`.
2. Masuk ke menu **Daftar Anime → Tambah Anime**: isi judul, deskripsi, URL cover (poster vertikal), URL banner (gambar lebar untuk hero), tahun, status, dan pilih genre.
3. Setelah anime dibuat, klik ikon **Episode** pada baris anime tersebut untuk menambahkan episode:
   - **URL Video**: bisa link YouTube embed (`https://www.youtube.com/embed/VIDEO_ID`) atau link file video langsung (`.mp4` dari Google Drive direct-link, Dropbox, CDN, dll) — pilih tipe yang sesuai di dropdown "Tipe Video".
   - **Waktu Episode Berikutnya Rilis**: isi tanggal & jam jika ingin menampilkan hitung mundur "Next Episode Timer" di halaman watch.
4. Konten otomatis langsung tampil di beranda dan halaman genre — tidak perlu refresh manual oleh user (cukup reload halaman).

## 5. Catatan Teknis

- Bahasa (ID/EN/JA) disimpan di `localStorage` dan juga di kolom `profiles.language` agar tersinkron saat login dari device lain.
- Like/Dislike dan Komentar memakai Supabase Realtime — perubahan akan muncul otomatis di semua user yang sedang membuka episode yang sama tanpa refresh.
- Username admin **adminyuumiru50** sudah di-set sebagai standar; Anda bisa membuat admin tambahan lewat menu **Pengguna** di admin panel (tombol "Jadikan Admin").
- Semua link kontak (Email, WhatsApp, Instagram, YouTube) sudah diarahkan langsung sesuai data yang diberikan.

## Kredensial Default Admin

```
Username : adminyuumiru50
Password : bIssNk09LtIT
```

**⚠️ PENTING:** Ganti password ini setelah login pertama kali, melalui Supabase Dashboard → Authentication → Users → cari user dengan email yang Anda daftarkan tadi → klik "..." → Send password recovery / Reset password.
