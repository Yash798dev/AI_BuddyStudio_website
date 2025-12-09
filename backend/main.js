require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'AI_Buddy_Studio';
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
const BACKEND_URL = process.env.BACKEND_URL || '';

const User = require('./db/users');

const app = express();

// ✅ Render gives PORT dynamically (default: 10000)
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors({
  origin: FRONTEND_URL,
  methods: 'GET, POST, PUT, DELETE,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'sessionsecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Health check route (important for Render)
app.get('/health', (req, res) => {
  res.send('OK');
});

// Root route
app.get('/', (req, res) => {
  res.send('Server Running');
});

app.get('/health', (req, res) => {
    res.send('OK');
});

// Mongo connection
async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: MONGO_DBNAME });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
connectDb();

// ✅ Bind to 0.0.0.0 so Render can reach it
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
