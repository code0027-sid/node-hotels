const mongoose = require('mongoose');

const dburl = "mongodb://localhost:27017";

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('connected', () => {
    console.log("✅ MongoDB connection established successfully.");
});

db.on('error', (err) => {
    console.error("❌ MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("⚠️ MongoDB disconnected.");
});
