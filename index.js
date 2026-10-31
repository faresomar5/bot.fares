import express from 'express';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 8080;

// قراءة اسم السيرفر الحالي من ملف البيئة (.env)
const serverName = process.env.LOCAL_SERVER_NAME || 'server1';

// توجيه كل سيرفر إلى واجهته ورابطه المخصص
app.get(['/', '/dashboard'], (req, res) => {
  if (serverName === 'server2') {
    // إذا كنت تعمل على السيرفر الثاني
    res.redirect('http://147.135.213.72:20277/dashboard');
  } else {
    // السيرفر الأول (الافتراضي)
    res.redirect('https://faresbot.duckdns.org:20119/dashboard');
  }
});

// مسار لفحص حالة السيرفر ومعرفة أيهما يعمل حالياً
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    activeServer: serverName,
    port: PORT,
    message: `النظام يعمل بنجاح على ${serverName}`
  });
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
  console.log(`🚀 السيرفر يعمل الآن ويمثل (${serverName}) على المنفذ: ${PORT}`);
});
