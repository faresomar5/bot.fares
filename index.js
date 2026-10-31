import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// 1. الصفحة الرئيسية على رابط الاستضافة تظهر حالة النظام المدمج للسيرفرين
app.get('/', (req, res) => {
  res.send(`
    <html dir="rtl">
      <head>
        <title>لوحة تحكم السيرفرات المدمجة - فارس</title>
        <style>
          body { font-family: Tahoma, sans-serif; background: #0f172a; color: #fff; text-align: center; padding-top: 50px; }
          .card { background: #1e293b; padding: 20px; margin: 15px auto; width: 60%; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
          a { color: #38bdf8; text-decoration: none; font-weight: bold; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>🚀 نظام إدارة السيرفرات المدمج</h1>
        <p>مرحباً بك يا فارس، جميع السيرفرات مرتبطة الآن عبر هذا الرابط الموحد.</p>
        
        <div class="card">
          <h3>السيرفر الأول (Katabump)</h3>
          <p>الحالة: <span style="color: #4ade80;">Online</span></p>
          <a href="http://51.75.118.151:20119" target="_blank">فتح لوحة السيرفر الأول</a>
        </div>

        <div class="card">
          <h3>السيرفر الثاني</h3>
          <p>العنوان: 147.135.213.72:20277</p>
          <a href="http://147.135.213.72:20277" target="_blank">فتح لوحة السيرفر الثاني</a>
        </div>
      </body>
    </html>
  `);
});

// 2. مسارات مخصصة لتوجيه أو جلب بيانات السيرفرين من نفس الرابط الموحد
app.get('/server1', (req, res) => {
  res.redirect('http://51.75.118.151:20119');
});

app.get('/server2', (req, res) => {
  res.redirect('http://147.135.213.72:20277');
});

// حماية السيرفر من الانهيار
process.on('uncaughtException', (err) => {
  console.error('⚠️ خطأ غير معالج:', err?.message || err);
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ رفض وعد غير معالج:', err?.message || err);
});

const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر المدمج يعمل الآن على استضافة Railway بالمنفذ: ${PORT}`);
});
