require('dotenv').config();
const express = require('express');
const path = require('path');
const prisma = require('./config/prisma');
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const circuitRoutes = require('./routes/circuitRoutes');
const clientRoutes = require('./routes/clientRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

let swaggerUi, swaggerSpec;
let swaggerEnabled = false;

try {
  swaggerUi = require('swagger-ui-express');
  swaggerSpec = require('./swagger/swagger.json');
  swaggerEnabled = true;
  console.log('Swagger UI activé');
} catch (e) {
  console.log('Swagger non activé - Node.js >= 16 requis');
}

const app = express();

app.use(express.json());

if (swaggerEnabled && swaggerUi && swaggerSpec) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} else {
  app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger/swagger.json'));
  });
}

const errorHandler = require('./middlewares/errorHandler');

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/circuits', circuitRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/reservations', reservationRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
