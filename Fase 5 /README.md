Di fase sebelumnya, automasi digunakan untuk mendorong (push) konfigurasi, sekarang praktik cara menarik (pull) data dari perangkat jaringan untuk tujuan keamanan dan audit 
1. Menulis script Ansible untuk mengambil running configuration dari kedua router secara periodik. Mereka harus membuat logika agar hasil backup disimpan ke dalam folder terpisah dengann penamaan file berbasis timestamp
2. Direktori backup yang terisi otomatis setiap kali script dijalankan, memastikan selalu ada titik pemulihan (restore point) jika terjadi kesalahan konfigurasi
