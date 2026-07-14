const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const dotenv = require('dotenv');
const session = require('express-session'); // ✅ NEW

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Set view engine and templating
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadDir));

// ✅ Add session middleware before routes
app.use(session({
  secret: 'your-admin-session-secret', // Use a strong secret (store in .env in production)
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // Optional: 1 hour
}));

// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // ✅ This includes login + dashboard
const dashboardRoutes = require('./routes/dashboard');
const caseRoutes = require('./routes/caseRoutes');
const adminReports = require("./routes/adminReports");
const wokingRoutes = require('./routes/woking');
const guideRoutes = require('./routes/guide');
const aboutRoutes = require('./routes/about');

app.use('/', homeRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(dashboardRoutes);
app.use(caseRoutes);
app.use("/admin", adminReports);
app.use('/woking', wokingRoutes);
app.use('/guide', guideRoutes);
app.use('/about', aboutRoutes);
