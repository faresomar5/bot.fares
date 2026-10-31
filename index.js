import express from 'express';
import path from 'path';
import http from 'http';

const app = express();
app.use(express.json());

// 1. قراءة اسم السيرفر والمنفذ الحالي من ملف البيئة
const serverName = process.env.LOCAL_SERVER_NAME || 'server1';
const PORT = process.env.PORT || 20119;

// 2. مسار الجلسات المستقل لكل سيرفر
const sessionPath = path.join(process.cwd(), 'sessions', serverName);
console.log(`📂 مسار الجلسة الخاص بهذا السيرفر (${serverName}): ${sessionPath}`);

// 3. السماح بقراءة ملفات الواجهة أو الـ public إذا كانت موجودة لديك (HTML, CSS, JS)
app.use(express.static(path.join(process.cwd(), 'public')));

// 4. جعل مسار الـ /dashboard يفتح صفحة لوحة التحكم الفعلي
app.get('/dashboard', (req, res) => {
  // إذا كان لديك ملف html جاهز للوحة التحكم في مجلد public:
  const dashboardFile = path.join(process.cwd(), 'public', 'dashboard.html');
  
  // يفتح الملف الفعلي إذا كان موجوداً، وإلا يعرض رسالة توجيهية للوحة التحكم
  res.sendFile(dashboardFile, (err) => {
    if (err) {
      res.send(`
        <html dir="rtl">
          <head><title>لوحة تحكم السيرفر - ${serverName}</title></head>
          <body style="font-family: Tahoma; text-align: center; margin-top: 50px; background: #0f172a; color: #fff;">
            <h1>لوحة تحكم السيرفر: ${serverName}</h1>
            <p>أهلاً بك يا فارس، هذه هي الصفحة الفعلية للوحة التحكم على المنفذ ${PORT}</p>
            <hr style="width: 50%; border: 1px solid #334155;">
          </body>
        </html>
      `);
    }
  });
});

// توجيه الصفحة الرئيسية تلقائياً إلى لوحة التحكم
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// حماية السيرفر من الانهيار المفاجئ عند حدوث أي خطأ
process.on('uncaughtException', (err) => {
  console.error('⚠️ خطأ غير معالج:', err?.message || err);
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ رفض وعد غير معالج:', err?.message || err);
});

// 5. تشغيل السيرفر على المنفذ المخصص
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر (${serverName}) يعمل الآن على المنفذ: ${PORT} ويفتح لوحة التحكم مباشرة`);
});
