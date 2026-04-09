# Fase 7: Integrasi Telemetri & Log Terpusat

Setelah router terkonfigurasi otomatis dan terhubung ke internet, infrastruktur perlu diawasi sehingga perlu membuat sebuah dashboard monitoring terpusat dengan cara memperbarui script Ansible untuk men-setup parameter Syslog dan SNMP pada kedua router. Log dan metrik ini diarahkan ke sebuah server monitoring terpusat. 
Konfigurasi monitoring berhasil di push, dan PC kontrol dapat menerima log message dari router (misalnya saat ada interface yang down atau percobaan login yang gagal).

---

## *Pada WSL*

**1. Masuk ke Folder Proyek Di WSL**
```routeros
cd proyek
```
**2. Buat folder baru bernama "monitoring"**
```routeros
mkdir monitoring
```
**3. Buat file baru di dalam folder monitoring bernama "docker-compose.yml"**
```routeros
nano docker-compose.yml
```
**4. Buat file baru di dalam folder monitoring bernama "prometheus.yml"**
```routeros
nano prometheus.yml
```
**5. Buat file baru di dalam folder monitoring bernama "promtail.yml"**
```routeros
nano promtail.yml
```
```text
project/
│
├── hosts.ini
├── setup_sistem.yml
├── monitoring/
│   └── docker-compose.yml
│   └── prometheus.yml
│   └── promtail.yml

---
