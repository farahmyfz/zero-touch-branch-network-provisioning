## FASE 1: Persiapan Infrastruktur & Baseline
---

### Tugas Fisik
* Menghubungkan port **up link switch** ke internet.
* Menghubungkan kedua **router** ke switch tersebut menggunakan kabel ethernet.

### Konfigurasi Awal (Manual)
---
Melakukan konfigurasi baseline secara manual pada kedua router (via console/kabel serial) agar router memiliki IP management dan bisa diakses oleh Ansible melalui protokol SSH/API.

*(Akses router menggunakan Winbox atau Console)*

---

## Router 1 Configuration

**1. Menambahkan IP pada interface ether2**
```routeros
/ip address add address=192.168.10.1/24 interface=ether2
```
**2. Mengaktifkan DHCP pada interface ether1**
```routeros
/ip dhcp-client add interface=ether1 disabled=no
```
**3. Mengaktifkan Service SSH & API**
```routeros
/ip service enable ssh,api
```
**4. Membuat User Management (Untuk Ansible)**
```routeros
/user add name=admin password=admin group=full comment="User untuk otomasi Ansible"
```
**5. Membuat Identitas Untuk Router 1**
```routeros
/system identity set name=Router1
```

## Router 2 Configuration

**1. Menambahkan IP pada interface ether2**
```routeros
/ip address add address=192.168.20.1/24 interface=ether2
```
**2. Mengaktifkan DHCP pada interface ether1**
```routeros
/ip dhcp-client add interface=ether1 disabled=no
```
**3. Mengaktifkan Service SSH & API**
```routeros
/ip service enable ssh,api
```
**4. Membuat User Management (Untuk Ansible)**
```routeros
/user add name=admin password=admin group=full comment="User untuk otomasi Ansible"
```
**5. Membuat Identitas Untuk Router 12**
```routeros
/system identity set name=Router2
```

