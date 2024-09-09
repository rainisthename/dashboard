require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const connectDB = require('./config/dbConnect');

mongoose.set('strictQuery', false); 


const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/ticketRoute'));
app.use('/api/ticket', require('./routes/ticketRoute'));

// 404 Error Handling
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 NOT FOUND' });
    } else {
        res.type('txt').send('404 NOT FOUND');
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Database Connection
connectDB();

// Graceful Shutdown
const server = app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});
