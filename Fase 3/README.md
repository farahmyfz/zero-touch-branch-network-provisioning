# FASE 3: Automasi Konfigurasi Dasar & Layanan
---
Menulis playbook ansible/skrip automasi untuk melakukan push konfigurasi secara serentak ke kedua router yang mempunyai kemampuan untuk:
1. Mengubah host name secara bersamaan router 1 dan router 2 (file bernama "hosts.ini")
2. Konfigurasi DNS Server, NTP Server, dan User Management (file bernama "setup_sistem.yml")
3. Mengamankan port dan memberikan IP Address pada interface yang mengarah ke jaringan lokal

### *Pada WSL*

**1. Masuk ke Folder Proyek Di WSL**
```routeros
cd proyek
```
**2. Buat Fofer Baru bernama "setup_sistem.yml"**
```routeros
nano setup_sistem.yml
```
**3. Menulis Code Automatisasi Configurasi Dasar & Layanan**
```routeros
*File setup_sistem.yml*
```
```text
project/
│
├── hosts.ini
├── setup_sistem.yml
