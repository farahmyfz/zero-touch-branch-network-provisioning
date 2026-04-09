# Fase 2: Setup Enviroment & Version Control

Memperkenalkan konsep _Software Engineering_ ke dalam manajemen jaringan.

---

## Tugas:
- Menginstall Ansible atau Terraform di PC kontrol
- Membuat repositori Git lokal atau di GitHub/GitLab untuk menyimpan seluruh kode infrastruktur
- Membuat file Inventory (jika memakai Ansible) untuk mendefinisikan kedua router tersebut
- Repositori Git yang berisi struktur folder proyek awal dan file konfigurasi environment yang sudah bisa melakukan koneksi dummy (misal: perintah ansible all -m ping) ke kedua router

---

## Tutorial Instalasi Ansible di WSL:
**1. Update Repository:**
```routeros
sudo apt update
```
**2. Instal Software Properties:**
```routeros
sudo apt install software-properties-common
```
**3. Tambahkan PPA Ansible:**
```routeros
sudo add-apt-repository --yes --update ppa:ansible/ansible
```
**4. Instal Ansible:**
```routeros
sudo apt install ansible
```
**5. Verifikasi:**
```routeros
ansible --version
```

---

## Konfigurasi Konektivitas:
**1. Generate SSH Key di Control Node:**
```routeros
ssh-keygen -t rsa -b 4096
```
**2. Copy Public Key ke Target:**
```routeros
ssh-copy-id user@ip_address_target
```
**3. Pastikan bisa masuk tanpa password:**
```routeros
ssh user@ip_address_target
```

---

## Ansible Inventory:
**1. Buat file bernama hosts.ini di root folder proyek**

[router]

R1 ansible_host=192.168.10.1 ansible_user=admin ansible_password=admin

R2 ansible_host=192.168.20.1 ansible_user=auto ansible_password=admin

[router:vars]

ansible_connection=network_cli

ansible_network_os=routeros
