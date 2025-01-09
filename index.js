
/**
 * This is the entry of the backend code. Check readme.md file to see how to run db connection is automatic and will display a console message when connection configuration is properly done from the env
 */
//Test Comment


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
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

//error middleware
app.use((err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.log(err.message);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found!`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose Duplicate Key
    if (err.code === 11000) {
        // Constructed the Duplicate message
        const duplicates = Object.entries(err.keyValue).map(([id, value]) => ({ id, value }));
        let message = "Resource with ";
        duplicates.forEach(duplicate => {
            message += `${duplicate.id}: ${duplicate.value}, `;
        })
        message += `already exists. `;
        error = new ErrorResponse(message, 409);
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = (err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res
        .status(error.statusCode || 500)
        .send({ success: false, error: error.message || "Server Error" });
}
)

//error handler
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


const PORT = process.env.PORT || 5550;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
