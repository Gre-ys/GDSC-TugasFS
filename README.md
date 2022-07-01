# **Tugas FS(BE+FE) dengan React, Express, Mongodb**

## Anggota Kelompok(ID_GDSC-NAMA-ROLE):
### 46-Raden Surya M.P-Hyper(Hacker, Hipster, Hustler) A.K.A Solo :v

## **API + End-Point**
```bash
https://gdsc-tugas-fs-api.herokuapp.com/end-point
```
### End-Point
#### Registrasi
```bash
POST::https://gdsc-tugas-fs-api.herokuapp.com/user/register
```
```bash
body{
username: "input",
password: "input"
}
response: "Message"
```
#### Login(Return token JWT)
```bash
POST::https://gdsc-tugas-fs-api.herokuapp.com/user/login
```
```bash
body{
username: "input",
password: "input"
}
response: jwt(Javascript Web Token)
response: header('auth-token')
```
#### Ambil Data Wishlist(Masukan Token JWT Hasil dari Login untuk Akses)
```bash
GET::https://gdsc-tugas-fs-api.herokuapp.com/wishlist
```
```bash
header: 'auth-token'
response: Wishlist
```
#### Update Data Wishlist(Masukan Token JWT Hasil dari Login untuk Akses)
```bash
PATCH::https://gdsc-tugas-fs-api.herokuapp.com/wishlist
```
```bash
header: 'auth-token'
body{
wishlist: [data]
}
response: "Message"
```

## **Struktur DB**
### Schema
![schema](img/db-schema.PNG)
### Mongodb Atlas
![mongodb](img/db-moatlas.PNG)