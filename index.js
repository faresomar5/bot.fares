import express from 'express';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 20119;

// توجيه أي زائر لرابط Railway مباشرة إلى واجهة موقعك الأساسية في Katabump
app.get(['/', '/dashboard'], (req, res) => {
  res.redirect('http://51.75.118.151:20119/dashboard'); // ضع الرابط الفعلي لواجهتك هنا
});

// مسار لفحص حالة السيرفر
app.get('/status', (req, res) => {
  res.json({ status: 'online', message: 'Railway server is running and linked to Katabump!' });
});

const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 السيرفر يعمل على Railway في المنفذ: ${PORT}`);
});
