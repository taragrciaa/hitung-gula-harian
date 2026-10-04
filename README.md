# 🍬 Glucopet

PWA edukasi, tracking gula, dan activity burn untuk Gen Z Indonesia. HTML + CSS + JavaScript vanilla, tanpa build step.

## Jalankan lokal
```bash
npx serve .
```
Service Worker butuh `localhost` atau HTTPS.

## Push ke GitHub
```bash
git init
git add .
git commit -m "Glucopet PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/glucopet.git
git push -u origin main
```

## Deploy ke Vercel
1. Buka vercel.com → **Add New… → Project** → import repo GitHub.
2. Framework Preset: **Other**. Build Command dan Output Directory: kosongkan.
3. Klik **Deploy**. Setiap `git push` ke `main` akan otomatis ter-deploy dan mendapat HTTPS, jadi PWA bisa di-install.

## Catatan
- Gula Lens berjalan sepenuhnya di browser (tanpa API key). Estimasinya perkiraan, bukan hasil lab.
- Untuk ikon install Android yang optimal, tambahkan PNG 192×192 dan 512×512 ke `manifest.json`.
- Data gizi bersifat edukatif, bukan saran medis.
- 
