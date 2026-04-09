# Fase 6: Implementasi GitOps & CI/CD Pipeline
---
Pada fase ini, manajemen jaringan bertransformasi dari eksekusi manual di terminal lokal ke sistem **Automated Deployment**. Dengan mengintegrasikan repositori GitHub dengan platform CI/CD (GitHub Actions), kita menerapkan prinsip **GitOps**.

###  Konsep Pipeline
Pipeline yang dibangun memiliki kemampuan sebagai berikut:
1. **Automated Execution**: Setiap perubahan konfigurasi yang di-*push* ke branch `main` akan memicu GitHub Actions secara otomatis.
2. **Zero-Touch Deployment**: Runner akan mengeksekusi *Ansible Playbook* langsung ke router tanpa intervensi manual di terminal lokal. Git bertindak sebagai *Single Source of Truth*.


###  Instalasi Self-Hosted Runner (WSL)

Agar GitHub dapat menjangkau perangkat di jaringan lokal, kita menggunakan PC Kontrol (WSL) sebagai **Self-Hosted Runner**:

1. **Navigasi**: Buka repositori di GitHub, lalu masuk ke menu **Settings**.
2. **Setup**: Pilih menu **Actions** > **Runners** di bilah sisi kiri.
3. **Pendaftaran**: Klik **"New self-hosted runner"**, pilih OS **Linux**, dan arsitektur **x64**.
4. **Konfigurasi**: Salin dan jalankan blok kode konfigurasi yang disediakan oleh GitHub ke terminal WSL satu per satu.
5. **Aktivasi**: Jalankan runner dengan perintah:
   ```bash
   ./run.sh
   ```
6. **Falidasi**: Muncul perintah `Listening for Job` jika berhasil

###  Langkah mengedit ketika sudah install Self-Hosted Runner (WSL)

langkah-langkah untuk mengubah konfigurasi router melalui pipeline CI/CD:

1. **Modifikasi Kode**: Edit file konfigurasi, misalnya Setup_Sistem.yml.
2. **Contoh Perubahan**: Ubah parameter location pada modul SNMP:
     ### Sebelum
      `location="Lab A"`
      ### Sesudah
      `location="Lab Data Center - Lantai 2"`
3. **Push ke GitHub**:
   ```bash
   git add .
   git commit -m "Update: Mengubah lokasi SNMP via CI/CD"
   git push origin main
   ```
4. **Verifikasi**: Pantau tab Actions di GitHub. Jika indikator berwarna **hijau**, berarti konfigurasi telah berhasil terpasang di router secara otomatis.



