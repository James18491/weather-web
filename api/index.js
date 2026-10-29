const express = require('express');
const weatherRoutes = require('../backend/src/routes/weatherRoutes');

const app = express();
app.use('/api/weather', weatherRoutes);

module.exports = app;