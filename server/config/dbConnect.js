const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

module.exports = connectDB;
