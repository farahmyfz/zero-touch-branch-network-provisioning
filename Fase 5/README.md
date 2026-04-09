# Fase 5: Automasi Backup Konfigurasi

Di fase sebelumnya, automasi digunakan untuk mendorong (push) konfigurasi, sekarang praktik cara menarik (pull) data dari perangkat jaringan untuk tujuan keamanan dan audit 
1. Menulis script Ansible untuk mengambil running configuration dari kedua router secara periodik. Mereka harus membuat logika agar hasil backup disimpan ke dalam folder terpisah dengann penamaan file berbasis timestamp
2. Direktori backup yang terisi otomatis setiap kali script dijalankan, memastikan selalu ada titik pemulihan (restore point) jika terjadi kesalahan konfigurasi

---

### *Pada WSL*

**1. Masuk ke Folder Proyek Di WSL**
```routeros
cd proyek
```
**2. Masuk ke folder bernama "setup_sistem.yml"**
```routeros
nano setup_sistem.yml
```
**3. Menambahkan Code Automasi Backup Konfigurasi**
```routeros
*File setup_sistem.yml*
```
```text
project/
│
├── hosts.ini
├── setup_sistem.yml
