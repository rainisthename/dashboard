const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://caletinamarklester:R7tKYzcJ0K1d46PA@cluster0.3p8k4.mongodb.net/dashboard?retryWrites=true&w=majority");
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

module.exports = connectDB;
