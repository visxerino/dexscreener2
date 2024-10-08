const express = require('express');
const cors = require('cors');
const coinRoutes = require('./routes/coinRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the coin routes
app.use('/api', coinRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});