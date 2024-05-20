const express = require('express');
const app = express();
const productRouter = require('./src/router/product.router');

// Middleware para parsear JSON
app.use(express.json());

// Usa el router de productos
app.use('/api/v1', productRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
