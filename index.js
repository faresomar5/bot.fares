import express from 'express';
import path from 'path';
import http from 'http';

const app = express();
app.use(express.json());

// 1. قراءة اسم السيرفر والمنفذ الحالي من ملف البيئة
const serverName = process.env.LOCAL_SERVER_NAME || 'server1';
const PORT = process.env.PORT || 20119;

// 2. مسار الجلسات المستقل لكل سيرفر (لعزل حسابات الواتساب تماماً)
const sessionPath = path.join(process.cwd(), 'sessions', serverName);
console.log(`📂 مسار الجلسة الخاص بهذا السيرفر (${serverName}): ${sessionPath}`);

// 3. قراءة الملفات الثابتة مباشرة من المجلد الحالي (لأن الملفات موجودة فيه)
app.use(express.static(process.cwd()));

// 4. توجيه الرابط الرئيسي أو /dashboard مباشرة إلى ملف index.html
app.get(['/', '/dashboard'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// توجيه صفحة السيرفرات
app.get('/servers', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'servers.html'));
});

// حماية السيرفر من الانهيار المفاجئ عند حدوث أي خطأ غير معالج
process.on('uncaughtException', (err) => {
  console.error('⚠️ خطأ غير معالج:', err?.message || err);
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ رفض وعد غير معالج:', err?.message || err);
});

// 5. تشغيل السيرفر على المنفذ المخصص
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر (${serverName}) يعمل الآن على المنفذ: ${PORT} ويفتح لوحة التحكم بنجاح`);
});
