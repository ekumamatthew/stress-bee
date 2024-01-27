require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/participants', require('./routes/participants'));
app.all('*', (req, res) => {
    res.status(404).json({
        error: `Can't find ${req.originalUrl} on this server!`,
    });
});

const PORT = process.env.PORT || 5550;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
