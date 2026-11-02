import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// توجيه جميع الطلبات الواردة إلى سيرفر بوتك الأساسي بـ HTTP الداخلي
app.use('/', createProxyMiddleware({
    target: 'http://51.75.118.151:20119', //
    changeOrigin: true,
    ws: true, // لدعم الاتصالات الحية مثل WebSockets إن وجدت
    logLevel: 'debug'
}));

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
