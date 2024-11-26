require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGODB_URL_LOCAL, {
        useNewUrlParser: true, // Use the new MongoDB connection string parser
        useUnifiedTopology: true, // Opt in to using the MongoDB driver's new connection management engine
        // useCreateIndex: true, // Ensure indexes are created automatically
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}

module.exports = connectDB;
