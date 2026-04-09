# Fase 4. Routing, NAT, & Validasi
---
Membuat jalur internet untuk klien dibawah router (menambahkan tugas lanjutan dalam script automasi)
1. Menambahkan default Router yang mengarah ke IP Switch (file bernama "setup_sistem.yml" no 5)
2. Mengonfigurasi Masquerade/NAT agar jaringan lokal di bawah router bisa mengakses internet melewati switch (file bernama "setup_sistem.yml" no 6)
3. Menulis script sederhana untuk memvalidasi konfigurasi seperti apakah router bisa ping 8.8.8.8 (file bernama "setup_sistem.yml" no 7) 

### *Pada WSL*

**1. Masuk ke Folder Proyek Di WSL**
```routeros
cd proyek
```
**2. Masuk ke Folder bernama "setup_sistem.yml"**
```routeros
nano setup_sistem.yml
```
**3. Menambahkan Code Automatisasi Configurasi Dasar & Layanan**
```routeros
*File setup_sistem.yml*
```
```text
project/
│
├── hosts.ini
├── setup_sistem.yml
