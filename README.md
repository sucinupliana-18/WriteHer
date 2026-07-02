# WriteHer 🌸

WriteHer adalah landing page berbasis AI yang membantu perempuan mengeksplorasi peluang karier di bidang kepenulisan digital.

Proyek ini dibuat sebagai tugas akhir Basic Course Perempuan Inovasi 2026 - Pembuatan Landing Page Berbasis AI pada program Perempuan Inovasi x IBM SkillsBuild.

## ✨ Fitur Utama

- Landing page satu halaman dengan desain responsif
- Informasi tentang peluang kerja digital di bidang kepenulisan
- Rekomendasi jalur karier seperti Content Writer, Copywriter, Novel Writer, Script Writer, Technical Writer, dan AI Content Specialist
- Fitur Tanya AI menggunakan Gemini API
- Backend serverless menggunakan Netlify Functions
- API key disimpan melalui Environment Variables Netlify

## 🎯 Masalah yang Diangkat

Banyak perempuan memiliki kemampuan menulis, bercerita, dan menuangkan ide kreatif, tetapi belum semua memiliki akses, arahan, atau kepercayaan diri untuk mengubah kemampuan tersebut menjadi peluang karier digital.

WriteHer hadir untuk membantu perempuan mengenali potensi kepenulisannya dan menemukan langkah awal menuju karier digital berbasis tulisan.

## 👩‍💻 Target Pengguna

- Perempuan yang ingin memulai karier digital
- Ibu rumah tangga yang ingin bekerja dari rumah
- Penulis pemula
- Perempuan yang tertarik pada dunia kepenulisan, konten, dan AI

## 🛠️ Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- Netlify
- Netlify Functions
- Gemini API
- GitHub

## 🤖 Integrasi AI

WriteHer menggunakan Gemini API melalui Netlify Functions.  
Pertanyaan dari pengguna dikirim ke serverless function, lalu diteruskan ke Gemini API. Jawaban AI kemudian ditampilkan kembali ke halaman website.

API key tidak disimpan di file frontend, tetapi menggunakan Environment Variables di Netlify agar lebih aman.

## 📁 Struktur Folder

```txt
WriteHer/
├── assets/
├── netlify/
│   └── functions/
│       └── chat.js
├── index.html
├── style.css
├── script.js
├── package.json
└── README.md