//if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
//}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');

const User = require('./models/User');
const connectDB = require('./config/db');
const { configureSecurity, globalLimiter } = require('./middleware/security');
const ExpressError = require('./utils/ExpressError');

// Route Imports
const destinationRoutes = require('./routes/destinationRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Connect MongoDB Database
connectDB();

// View Engine Configuration
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parsers & Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Security Configuration (Helmet CSP & Mongo Sanitize)
configureSecurity(app);
app.use(globalLimiter);

// Session Store Setup
const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelatlas';
const secret = process.env.SESSION_SECRET || 'travelatlas_super_secret_session_key_2026';

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600 // 24 hours
});

store.on('error', function (e) {
  console.error('[Session Store Error]', e);
});

const sessionConfig = {
  store,
  name: 'ta_session',
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true, // Uncomment in production with HTTPS
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 Days
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

app.use(session(sessionConfig));
app.use(flash());

// Passport Authentication Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Local Variables Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  next();
});

// Mount Routes
app.use('/', destinationRoutes);
app.use('/', authRoutes);
app.use('/destinations/:id/reviews', reviewRoutes);

// Catch 404 Routes
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err, title: `Error ${statusCode} - TravelAtlas` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 [TravelAtlas Server] Running on http://localhost:${PORT}`);
});
