const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Middleware para agregar los encabezados CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Endpoint de prueba
app.get('/test', (req, res) => {
    res.send('Test endpoint working');
});

// Configuración del proxy
app.use('/api', createProxyMiddleware({
    target: 'https://superheroapi.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Elimina '/api' del inicio de la URL
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    }
}));

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});
