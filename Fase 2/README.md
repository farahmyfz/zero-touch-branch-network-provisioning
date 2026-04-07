- Menginstall Ansible atau Terraform di PC kontrol
- Membuat repositori Git lokal atau di GitHub/GitLab untuk menyimpan seluruh kode infrastruktur
- Membuat file Inventory (jika memakai Ansible) untuk mendefinisikan kedua router tersebut
- Repositori Git yang berisi struktur folder proyek awal dan file konfigurasi environment yang sudah bisa melakukan koneksi dummy (misal: perintah ansible all -m ping) ke kedua router

Tutorial Instalasi Ansible di WSL:
1. Update Repository: sudo apt update
2. Instal Software Properties: sudo apt install software-properties-common
3. Tambahkan PPA Ansible: sudo add-apt-repository --yes --update ppa:ansible/ansible
4. Instal Ansible: sudo apt install ansible
5. Verifikasi: ansible --version

Konfigurasi Konektivitas:
1. Generate SSH Key di Control Node: ssh-keygen -t rsa -b 4096
2. Copy Public Key ke Target: ssh-copy-id user@ip_address_target
3. Pastikan Anda bisa masuk tanpa password: ssh user@ip_address_target

Ansible Inventory:
1. Buat file bernama hosts.ini di root folder proyek

[router]

R1 ansible_host=192.168.10.1 ansible_user=admin ansible_password=admin

R2 ansible_host=192.168.20.1 ansible_user=auto ansible_password=admin

[router:vars]

ansible_connection=network_cli

ansible_network_os=routeros
