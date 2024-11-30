// server.js

require('dotenv').config(); // Load environment variables first

const express = require('express');
const app = require('./app');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
