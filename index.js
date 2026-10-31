import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import http from 'http';

const app = express();
app.use(express.json());

// قراءة اسم السيرفر والمنفذ من متغيرات البيئة
const serverName = process.env.LOCAL_SERVER_NAME || 'server1';
const PORT = process.env.PORT || 20119;

// مسار تجريبي لعرض حالة السيرفر الآمن
app.get('/', (req, res) => {
  res.send(`مرحباً بك! السيرفر الآمن يعمل بنجاح على العميل: ${serverName}`);
});

// حماية السيرفر من الانهيار عند حدوث أي خطأ غير معالج
process.on('uncaughtException', (err) => {
  console.error('⚠️ خطأ غير معالج (تم الاحتواء):', err?.message || err);
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ رفض غير معالج (تم الاحتواء):', err?.message || err);
});

// تشغيل السيرفر (يدعم الـ HTTP العادي، ويمكنك ربطه بشهادات SSL إذا توفرت لديك ملفات الشهادة)
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر (${serverName}) يعمل الآن على المنفذ: ${PORT}`);
});

// حماية بوت التليجرام من التوقف
if (typeof bot !== 'undefined' && bot.catch) {
  bot.catch((err) => {
    console.error('⚠️ خطأ في بوت التليجرام (تم احتواءه):', err?.message || err);
  });
}
