# Fase 8: Pengujian & Pemulihan Bencana (Disaster Recovery)

Fase ini mensimulasikan skenario nyata ketika salah satu router mengalami kerusakan atau harus diganti dengan unit baru. Tujuan utamanya adalah mendemonstrasikan bahwa dengan infrastruktur **Zero-Touch Provisioning**, router pengganti dapat kembali beroperasi penuh hanya dalam hitungan menit tanpa konfigurasi manual yang rumit.

---

## 1. Simulasi Reset Router (Unit Baru)
Tahap ini dilakukan untuk mengembalikan router ke pengaturan pabrik, seolah-olah kita baru saja mengeluarkan unit baru dari kotak.

### A. Melalui Terminal WinBox (Software Reset)
Jika router masih bisa diakses, gunakan perintah berikut:

* **Reset dengan Konfigurasi Bawaan:**
    ```routeros
    /system reset-configuration
    ```
* **Reset Total (No Defaults)**
    ```routeros
    /system reset-configuration no-defaults=yes skip-backup=yes
    ```

### B. Melalui Hard Reset (Tombol Fisik)
Gunakan metode ini jika akses software terkunci. Perhatikan indikator LED:
1. Matikan router (cabut kabel power).
2. Tekan dan tahan tombol **Reset** menggunakan klip kertas atau pin.
3. Sambil tetap menahan tombol, hubungkan kembali kabel power.
4. Perhatikan lampu **LED**:
    * Saat LED mulai berkedip, tetap tahan.
    * Saat LED berhenti berkedip, **lepaskan** tombol Reset.
5. Tunggu proses *reboot* hingga router kembali aktif.

---

## 2. Inisialisasi Jalur Otomasi (Bootstrap IP)
Setelah router dalam kondisi kosong, kita perlu memberikan "jalur masuk" awal agar sistem otomasi (Ansible/Dashboard) dapat terhubung dengan router tersebut.

### Langkah-langkah Konfigurasi Awal:
1.  Buka **WinBox** dan masuk melalui **MAC Address**.
2.  Gunakan stelan default: User `admin` dan Password `(kosong)`.
3.  Berikan IP Address sementara pada port yang terhubung ke jaringan manajemen (contoh: `ether2`).
4.  Ubah Password yang tadinya `(kosong)` menjadi `admin`.


**Metode GUI:**
* Buka menu **IP** > **Addresses**.
* Klik **[+]** dan masukkan IP sesuai inventori (Contoh: `192.168.10.1/24`).
* Pilih interface **ether2**, lalu klik **OK**.
* Buka menu **Sistem** > **Password**
* Kosongkan untuk Old Password
* Ini bagian **New Password** dan **Confirm Password** dengan:
```routeros
admin
```

**Metode Terminal:**
```routeros
/ip address add address=192.168.10.1/24 interface=ether2
/user set admin password=admin
```


## 3. Verifikasi Konektivitas (Pre-Check)
Sebelum menjalankan proses restorasi otomatis, pastikan laptop sudah dapat terhubung dengan router pengganti melalui jaringan IP.

- Buka Terminal (Ubuntu/WSL) pada laptop manajemen.
- Lakukan perintah ping ke IP yang baru saja dibuat:

```bash
ping 192.168.10.1
```
Jika status sudah Reply, maka jalur komunikasi SSH untuk sistem otomasi (Ansible) sudah siap digunakan.

## 4. Eksekusi Restorasi Otomatis (Push Config)

Tahap ini adalah intinya di mana seluruh konfigurasi jaringan push secara otomatis tanpa menyentuh router secara manual.

- **Akses Dashboard**: Buka NetDevOps Control Center melalui browser.
- **Verifikasi Status**: Pastikan indikator perangkat (misal: R1) menunjukkan status siap.
- **Jalankan Otomasi**: Klik tombol **"Push Config"** pada panel router yang bersangkutan.

**Proses Latar Belakang:**
- Dashboard akan memicu API Backend.
- Self-hosted runner mengeksekusi workflow CI/CD (GitHub Actions) dan menjalankan Ansible Playbook.
- Sistem masuk ke router dan menerapkan seluruh parotokol yang ada pada Ansible Playbook.

---

## 5. Monitoring Progres di GitHub Actions

Proses **push konfigurasi** dapat dipantau secara real-time untuk memastikan tidak ada error selama eksekusi.

- Buka repositori proyek di GitHub.
- Masuk ke tab **Actions**.
- Klik pada workflow terbaru yang sedang berjalan.
- Pantau log eksekusi pada job yang aktif.

Pastikan setiap tahapan berjalan lancar hingga muncul indikator centang hijau.

---

## 6. Verifikasi Akhir & Status Operasional

Setelah proses otomasi selesai, lakukan pengecekan akhir untuk memastikan layanan jaringan telah pulih 100%:

### A. Pengecekan Sistem (via WinBox)
- **Identity**: Nama perangkat telah kembali sesuai penamaan standar (misal: Router_Cabang_A - atau Router_Cabang_B).
- **IP Addresses**: Seluruh IP publik dan lokal telah teralokasi otomatis pada menu **IP > Addresses**.
- **Layanan Klien**:
  - DHCP Server berstatus *running* (**IP > DHCP Server**)
  - NAT masquerade telah aktif (**IP > Firewall > NAT**)

### B. Pengecekan Sisi Pengguna (User Experience)
- Klien atau perangkat yang terhubung di bawah router sudah mendapatkan akses internet.
- Log aktivitas kembali normal.
