import express from 'express';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 8080;

// توجيه أي زائر لرابط Railway مباشرة إلى واجهة موقعك الأساسية في Katabump
app.get(['/', '/dashboard'], (req, res) => {
  res.redirect('https://control.katabump.com/dashboard'); // ضع الرابط الفعلي لواجهتك هنا
});

// مسار لفحص حالة السيرفر
app.get('/status', (req, res) => {
  res.json({ status: 'online', message: 'Railway server is running and linked to Katabump!' });
});

const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر يعمل على Railway في المنفذ: ${PORT}`);
});
