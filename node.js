const express = require('express');
const passport = require('passport');
require('./auth/auth'); // sets up strategy
const personRoutes = require('./router/personrouter');
const menuRoutes = require('./router/menurouter');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Test route
app.get('/man', (req, res) => {
  res.send("This is man's world");
});

// Use routers
app.use('/', personRoutes);
app.use('/', menuRoutes);

// Start server
app.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
});
