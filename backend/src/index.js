const express = require('express');
const cors = require('cors');
const path = require('path');
const weatherRoutes = require('./routes/weatherRoutes')

const app = express();

app.use(cors());
app.use('/api/weather', weatherRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

module.exports = app;